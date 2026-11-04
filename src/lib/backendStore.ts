import fs from 'fs';
import path from 'path';
import { getMongoDatabase, isMongoConfigured } from './mongodb';
import {
  ALL_CHAPTER_EVENTS,
  GALLERY_PHOTOS,
  ChapterEvent,
  GalleryPhoto,
} from '@/data/siteData';

export interface EventRegistration {
  id: string;
  registrationCode: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  salutation: string;
  fullName: string;
  dob: string;
  gender?: string;
  email: string;
  phone: string;
  whatsapp: string;
  district: string;
  state: string;
  city?: string;
  participantCategory: string;
  organization: string;
  designation: string;
  experienceYears: string;
  isIstdMember: string;
  istdMembershipNo?: string;
  istdChapterName?: string;
  requireCertificate: boolean;
  expectations?: string;
  referralSource?: string;
  status: 'Confirmed' | 'Attended' | 'Certificate Issued' | 'Cancelled';
  createdAt: string;
}

export interface BackendDatabasePayload {
  events: ChapterEvent[];
  galleryPhotos: GalleryPhoto[];
  registrations: EventRegistration[];
  updatedAt: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  lastInvalidatedAt: string;
  ttlSeconds: number;
  activeKeys: string[];
  storageEngine: 'MongoDB Atlas / Server' | 'MongoDB-Compatible Local JSON Store';
  mongoConfigured: boolean;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const CACHE_TTL_MS = 60 * 1000; // 60 seconds server-side cache

class ServerCacheManager {
  private store = new Map<string, CacheEntry<unknown>>();
  public hits = 0;
  public misses = 0;
  public lastInvalidatedAt = new Date().toISOString();

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses += 1;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.misses += 1;
      return null;
    }
    this.hits += 1;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs = CACHE_TTL_MS): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  invalidateAll(): void {
    this.store.clear();
    this.lastInvalidatedAt = new Date().toISOString();
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }
}

declare global {
  // eslint-disable-next-line no-var
  var _istdServerCache: ServerCacheManager | undefined;
}

export const serverCache: ServerCacheManager =
  global._istdServerCache || new ServerCacheManager();
if (!global._istdServerCache) {
  global._istdServerCache = serverCache;
}

const LOCAL_DB_DIR = path.join(process.cwd(), 'data.nosync');
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, 'istd-mongodb-store.json');

function ensureLocalDb(): BackendDatabasePayload {
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_FILE)) {
      const initial: BackendDatabasePayload = {
        events: ALL_CHAPTER_EVENTS,
        galleryPhotos: GALLERY_PHOTOS,
        registrations: [
          {
            id: 'reg-sample-1',
            registrationCode: 'ISTD-TCR-2026-1001',
            eventId: 'event-aiot-boopathy',
            eventSlug: 'advancing-aiot-research',
            eventTitle:
              'Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications',
            eventDate: '10 November 2026',
            eventTime: '7:00 PM – 8:00 PM IST',
            eventVenue: 'Google Meet (Online Session)',
            salutation: 'Mr.',
            fullName: 'Arun Kumar Menon',
            dob: '1994-05-14',
            gender: 'Male',
            email: 'arun.menon@example.com',
            phone: '+91 9846011223',
            whatsapp: '+91 9846011223',
            district: 'Thrissur',
            state: 'Kerala',
            city: 'Thrissur',
            participantCategory: 'Corporate / Industry Professional',
            organization: 'Infopark Tech Solutions',
            designation: 'Senior Systems Engineer',
            experienceYears: '7–15 Years',
            isIstdMember: 'Interested in Joining ISTD',
            requireCertificate: true,
            expectations: 'Looking forward to industrial AIoT deployment case studies.',
            referralSource: 'LinkedIn',
            status: 'Confirmed',
            createdAt: '2026-11-04T09:30:00.000Z',
          },
        ],
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as BackendDatabasePayload;
    return {
      events: parsed.events?.length ? parsed.events : ALL_CHAPTER_EVENTS,
      galleryPhotos: parsed.galleryPhotos?.length ? parsed.galleryPhotos : GALLERY_PHOTOS,
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Local DB Read Error]:', err);
    return {
      events: ALL_CHAPTER_EVENTS,
      galleryPhotos: GALLERY_PHOTOS,
      registrations: [],
      updatedAt: new Date().toISOString(),
    };
  }
}

function saveLocalDb(data: BackendDatabasePayload): void {
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[Local DB Write Error]:', err);
  }
}

export async function getBackendData(bypassCache = false): Promise<{
  data: BackendDatabasePayload;
  cacheStats: CacheStats;
}> {
  if (!bypassCache) {
    const cachedData = serverCache.get<BackendDatabasePayload>('istd_full_payload');
    if (cachedData) {
      return {
        data: cachedData,
        cacheStats: getCacheStats(),
      };
    }
  }

  const db = await getMongoDatabase();
  if (db) {
    try {
      const eventsCol = db.collection<ChapterEvent>('events');
      const photosCol = db.collection<GalleryPhoto>('gallery_photos');
      const regsCol = db.collection<EventRegistration>('registrations');

      let events = (await eventsCol
        .find({}, { projection: { _id: 0 } })
        .toArray()) as unknown as ChapterEvent[];
      let galleryPhotos = (await photosCol
        .find({}, { projection: { _id: 0 } })
        .toArray()) as unknown as GalleryPhoto[];
      const registrations = (await regsCol
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray()) as unknown as EventRegistration[];

      if (events.length === 0) {
        await eventsCol.insertMany(ALL_CHAPTER_EVENTS.map((e) => ({ ...e })));
        events = ALL_CHAPTER_EVENTS;
      }
      if (galleryPhotos.length === 0) {
        await photosCol.insertMany(GALLERY_PHOTOS.map((p) => ({ ...p })));
        galleryPhotos = GALLERY_PHOTOS;
      }

      const payload: BackendDatabasePayload = {
        events,
        galleryPhotos,
        registrations,
        updatedAt: new Date().toISOString(),
      };
      serverCache.set('istd_full_payload', payload);
      return { data: payload, cacheStats: getCacheStats() };
    } catch (err) {
      console.error('[MongoDB Query Error]:', err);
    }
  }

  const localPayload = ensureLocalDb();
  serverCache.set('istd_full_payload', localPayload);
  return {
    data: localPayload,
    cacheStats: getCacheStats(),
  };
}

export function getCacheStats(): CacheStats {
  return {
    hits: serverCache.hits,
    misses: serverCache.misses,
    lastInvalidatedAt: serverCache.lastInvalidatedAt,
    ttlSeconds: CACHE_TTL_MS / 1000,
    activeKeys: serverCache.keys(),
    storageEngine: isMongoConfigured()
      ? 'MongoDB Atlas / Server'
      : 'MongoDB-Compatible Local JSON Store',
    mongoConfigured: isMongoConfigured(),
  };
}

export async function createEventRegistration(
  input: Omit<EventRegistration, 'id' | 'registrationCode' | 'status' | 'createdAt'>
): Promise<EventRegistration> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newReg: EventRegistration = {
    ...input,
    id: `reg-${Date.now()}-${randomSuffix}`,
    registrationCode: `ISTD-TCR-2026-${randomSuffix}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  const db = await getMongoDatabase();
  if (db) {
    await db.collection('registrations').insertOne({ ...newReg });
  }

  const local = ensureLocalDb();
  local.registrations = [newReg, ...local.registrations];
  saveLocalDb(local);
  serverCache.invalidateAll();

  return newReg;
}

export async function upsertChapterEvent(event: ChapterEvent): Promise<ChapterEvent> {
  const db = await getMongoDatabase();
  if (db) {
    await db
      .collection('events')
      .updateOne({ slug: event.slug }, { $set: { ...event } }, { upsert: true });
  }

  const local = ensureLocalDb();
  const idx = local.events.findIndex((e) => e.slug === event.slug || e.id === event.id);
  if (idx >= 0) {
    local.events[idx] = event;
  } else {
    local.events = [event, ...local.events];
  }
  saveLocalDb(local);
  serverCache.invalidateAll();

  return event;
}

export async function deleteChapterEvent(slug: string): Promise<void> {
  const db = await getMongoDatabase();
  if (db) {
    await db.collection('events').deleteOne({ slug });
  }

  const local = ensureLocalDb();
  local.events = local.events.filter((e) => e.slug !== slug);
  saveLocalDb(local);
  serverCache.invalidateAll();
}

export async function addGalleryOrEventPhoto(
  photo: GalleryPhoto,
  eventSlug?: string
): Promise<GalleryPhoto> {
  const db = await getMongoDatabase();
  if (db) {
    await db
      .collection('gallery_photos')
      .updateOne({ id: photo.id }, { $set: { ...photo } }, { upsert: true });
    if (eventSlug) {
      await db.collection('events').updateOne(
        { slug: eventSlug },
        {
          $push: {
            eventPhotos: {
              src: photo.src,
              title: photo.title,
              caption: photo.caption,
              category: photo.categoryLabel || 'Event Photograph',
            },
          } as never,
        }
      );
    }
  }

  const local = ensureLocalDb();
  local.galleryPhotos = [photo, ...local.galleryPhotos.filter((p) => p.id !== photo.id)];
  if (eventSlug) {
    const ev = local.events.find((e) => e.slug === eventSlug);
    if (ev) {
      ev.eventPhotos = [
        ...(ev.eventPhotos || []),
        {
          src: photo.src,
          title: photo.title,
          caption: photo.caption,
          category: photo.categoryLabel || 'Event Photograph',
        },
      ];
    }
  }
  saveLocalDb(local);
  serverCache.invalidateAll();

  return photo;
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  const db = await getMongoDatabase();
  if (db) {
    await db.collection('gallery_photos').deleteOne({ id });
  }

  const local = ensureLocalDb();
  local.galleryPhotos = local.galleryPhotos.filter((p) => p.id !== id);
  saveLocalDb(local);
  serverCache.invalidateAll();
}

export async function updateRegistrationStatus(
  id: string,
  status: EventRegistration['status']
): Promise<void> {
  const db = await getMongoDatabase();
  if (db) {
    await db.collection('registrations').updateOne({ id }, { $set: { status } });
  }

  const local = ensureLocalDb();
  const reg = local.registrations.find((r) => r.id === id);
  if (reg) {
    reg.status = status;
    saveLocalDb(local);
  }
  serverCache.invalidateAll();
}
