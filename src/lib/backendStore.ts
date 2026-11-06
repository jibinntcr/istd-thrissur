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
  participantCode?: string;
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

export interface ChapterEnquiry {
  id: string;
  enquiryCode: string;
  source: 'Contact Enquiry' | 'Membership Enquiry' | 'Campus Chapter EOI';
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  category: string;
  eventTitle?: string;
  organization?: string;
  designation?: string;
  district?: string;
  cityLocation?: string;
  headOfInstitution?: string;
  affiliationStatus?: string;
  estimatedStudentCount?: string;
  proposedStreams?: string;
  message: string;
  status: 'New' | 'In Review' | 'Responded' | 'Closed';
  createdAt: string;
}

export interface BackendDatabasePayload {
  events: ChapterEvent[];
  galleryPhotos: GalleryPhoto[];
  registrations: EventRegistration[];
  enquiries?: ChapterEnquiry[];
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
            participantCode: 'ISTD-PID-2026-1001',
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
    const rawRegs = Array.isArray(parsed.registrations) ? parsed.registrations : [];
    const dedupedRegs = deduplicateRegistrations(rawRegs);
    if (dedupedRegs.length !== rawRegs.length) {
      parsed.registrations = dedupedRegs;
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(parsed, null, 2), 'utf8');
    }
    return {
      events: parsed.events?.length ? parsed.events : ALL_CHAPTER_EVENTS,
      galleryPhotos: parsed.galleryPhotos?.length ? parsed.galleryPhotos : GALLERY_PHOTOS,
      registrations: dedupedRegs,
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Local DB Read Error]:', err);
    return {
      events: ALL_CHAPTER_EVENTS,
      galleryPhotos: GALLERY_PHOTOS,
      registrations: [],
      enquiries: [],
      updatedAt: new Date().toISOString(),
    };
  }
}

export function deduplicateRegistrations(
  regs: EventRegistration[]
): EventRegistration[] {
  const seenKeys = new Set<string>();
  // Process oldest to newest so we keep the original registration pass per event
  const chronological = [...regs].reverse();
  const keptChronological: EventRegistration[] = [];

  for (const r of chronological) {
    if (r.status === 'Cancelled') {
      keptChronological.push(r);
      continue;
    }
    const slug = (r.eventSlug || '').trim().toLowerCase();
    const emailKey = `${slug}::email::${(r.email || '').trim().toLowerCase()}`;
    const phoneDigits = (r.phone || '').replace(/[^0-9]/g, '').slice(-10);
    const phoneKey = phoneDigits.length >= 10 ? `${slug}::phone::${phoneDigits}` : '';
    const pid = (r.participantCode || '').trim().toUpperCase();
    const pidKey = pid ? `${slug}::pid::${pid}` : '';

    if (
      seenKeys.has(emailKey) ||
      (phoneKey && seenKeys.has(phoneKey)) ||
      (pidKey && seenKeys.has(pidKey))
    ) {
      continue;
    }

    seenKeys.add(emailKey);
    if (phoneKey) seenKeys.add(phoneKey);
    if (pidKey) seenKeys.add(pidKey);
    keptChronological.push(r);
  }

  return keptChronological.reverse();
}

export function findExistingEventRegistration(
  regs: EventRegistration[],
  eventSlug: string,
  email?: string,
  phone?: string,
  participantCode?: string
): EventRegistration | null {
  const targetSlug = (eventSlug || '').trim().toLowerCase();
  if (!targetSlug) return null;

  const normEmail = (email || '').trim().toLowerCase();
  const normPhone = (phone || '').replace(/[^0-9]/g, '').slice(-10);
  const normPid = (participantCode || '').trim().toUpperCase();

  const found = regs.find((r) => {
    if ((r.eventSlug || '').trim().toLowerCase() !== targetSlug) return false;
    if (r.status === 'Cancelled') return false;

    if (normPid && (r.participantCode || '').trim().toUpperCase() === normPid) {
      return true;
    }
    if (normEmail && (r.email || '').trim().toLowerCase() === normEmail) {
      return true;
    }
    if (normPhone.length >= 10) {
      const rPhone = (r.phone || '').replace(/[^0-9]/g, '').slice(-10);
      const rWa = (r.whatsapp || '').replace(/[^0-9]/g, '').slice(-10);
      if (rPhone === normPhone || rWa === normPhone) {
        return true;
      }
    }
    return false;
  });

  return found || null;
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
      const enqsCol = db.collection<ChapterEnquiry>('enquiries');

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
      const enquiries = (await enqsCol
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray()) as unknown as ChapterEnquiry[];

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
        enquiries,
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
  const local = ensureLocalDb();

  // Enforce 1 registration per event per Email / Mobile / Unique Participant ID
  const duplicateForThisEvent = findExistingEventRegistration(
    local.registrations,
    input.eventSlug,
    input.email,
    input.phone,
    input.participantCode
  );
  if (duplicateForThisEvent) {
    const dupErr = new Error(
      `Only 1 registration per Email / Participant ID is allowed per event. You are already registered for "${input.eventTitle}" (Event Pass: ${duplicateForThisEvent.registrationCode}).`
    ) as Error & { isDuplicate?: boolean; existingRegistration?: EventRegistration };
    dupErr.isDuplicate = true;
    dupErr.existingRegistration = duplicateForThisEvent;
    throw dupErr;
  }

  // Check if this participant already has a permanent Unique Participant ID (by email, phone, whatsapp, or passed participantCode)
  const normEmail = input.email.trim().toLowerCase();
  const normPhone = input.phone.replace(/[^0-9]/g, '').slice(-10);
  const existingProfile = local.registrations.find(
    (r) =>
      (input.participantCode &&
        r.participantCode?.toUpperCase() === input.participantCode.trim().toUpperCase()) ||
      r.email.trim().toLowerCase() === normEmail ||
      (normPhone.length >= 10 &&
        (r.phone.replace(/[^0-9]/g, '').slice(-10) === normPhone ||
          r.whatsapp.replace(/[^0-9]/g, '').slice(-10) === normPhone))
  );

  const permanentParticipantCode =
    existingProfile?.participantCode ||
    input.participantCode?.trim().toUpperCase() ||
    `ISTD-PID-2026-${randomSuffix}`;

  const newReg: EventRegistration = {
    ...input,
    id: `reg-${Date.now()}-${randomSuffix}`,
    registrationCode: `ISTD-TCR-2026-${randomSuffix}`,
    participantCode: permanentParticipantCode,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  const db = await getMongoDatabase();
  if (db) {
    await db.collection('registrations').insertOne({ ...newReg });
  }

  local.registrations = [newReg, ...local.registrations];
  saveLocalDb(local);
  serverCache.invalidateAll();

  return newReg;
}

export async function lookupParticipantByQuery(
  query: string
): Promise<EventRegistration | null> {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const digits = q.replace(/[^0-9]/g, '');

  const { data } = await getBackendData(false);
  const found = data.registrations.find((r) => {
    const pid = (r.participantCode || '').toLowerCase();
    const rcode = (r.registrationCode || '').toLowerCase();
    const mail = (r.email || '').toLowerCase();
    const phDigits = (r.phone || '').replace(/[^0-9]/g, '');
    const waDigits = (r.whatsapp || '').replace(/[^0-9]/g, '');

    if (pid === q || rcode === q || mail === q) return true;
    if (q.length >= 4 && (pid.endsWith(q) || rcode.endsWith(q))) return true;
    if (digits.length >= 10) {
      const last10 = digits.slice(-10);
      if (phDigits.slice(-10) === last10 || waDigits.slice(-10) === last10) return true;
    }
    return false;
  });

  return found || null;
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

export async function createChapterEnquiry(
  input: Omit<ChapterEnquiry, 'id' | 'enquiryCode' | 'status' | 'createdAt'> & {
    enquiryCode?: string;
  }
): Promise<ChapterEnquiry> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const prefix =
    input.source === 'Membership Enquiry'
      ? 'ISTD-MEM'
      : input.source === 'Campus Chapter EOI'
      ? 'ISTD-EOI'
      : 'ISTD-ENQ';

  const newEnq: ChapterEnquiry = {
    ...input,
    id: `enq-${Date.now()}-${randomSuffix}`,
    enquiryCode: input.enquiryCode || `${prefix}-2026-${randomSuffix}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  const db = await getMongoDatabase();
  if (db) {
    await db.collection('enquiries').insertOne({ ...newEnq });
  }

  const local = ensureLocalDb();
  local.enquiries = [newEnq, ...(local.enquiries || [])];
  saveLocalDb(local);
  serverCache.invalidateAll();

  return newEnq;
}

export async function updateEnquiryStatus(
  id: string,
  status: ChapterEnquiry['status']
): Promise<void> {
  const db = await getMongoDatabase();
  if (db) {
    await db.collection('enquiries').updateOne({ id }, { $set: { status } });
  }

  const local = ensureLocalDb();
  const enq = (local.enquiries || []).find((item) => item.id === id);
  if (enq) {
    enq.status = status;
    saveLocalDb(local);
  }
  serverCache.invalidateAll();
}

export async function deleteChapterEnquiry(id: string): Promise<void> {
  const db = await getMongoDatabase();
  if (db) {
    await db.collection('enquiries').deleteOne({ id });
  }

  const local = ensureLocalDb();
  local.enquiries = (local.enquiries || []).filter((item) => item.id !== id);
  saveLocalDb(local);
  serverCache.invalidateAll();
}
