'use client';

import {
  ALL_CHAPTER_EVENTS,
  GALLERY_PHOTOS,
  ChapterEvent,
  GalleryPhoto,
} from '@/data/siteData';
import type {
  BackendDatabasePayload,
  CacheStats,
  EventRegistration,
} from './backendStore';

const STORAGE_KEY = 'istd_tcr_backend_db_v1';
const CACHE_META_KEY = 'istd_tcr_cache_meta_v1';
const AUTH_SESSION_KEY = 'istd_tcr_admin_session_v1';
const CLIENT_CACHE_TTL_MS = 60 * 1000;

let memoryCache: { data: BackendDatabasePayload; expiresAt: number } | null = null;

function getDefaultPayload(): BackendDatabasePayload {
  return {
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
}

export function getLocalSyncedPayload(): BackendDatabasePayload {
  if (typeof window === 'undefined') {
    return getDefaultPayload();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultPayload();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    const parsed = JSON.parse(raw) as BackendDatabasePayload;
    // Merge any new default events from siteData that aren't in local storage yet
    const existingSlugs = new Set((parsed.events || []).map((e) => e.slug));
    const mergedEvents = [
      ...(parsed.events || []),
      ...ALL_CHAPTER_EVENTS.filter((e) => !existingSlugs.has(e.slug)),
    ];
    return {
      events: mergedEvents.length ? mergedEvents : ALL_CHAPTER_EVENTS,
      galleryPhotos: parsed.galleryPhotos?.length ? parsed.galleryPhotos : GALLERY_PHOTOS,
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return getDefaultPayload();
  }
}

export function saveLocalSyncedPayload(payload: BackendDatabasePayload): void {
  if (typeof window === 'undefined') return;
  try {
    payload.updatedAt = new Date().toISOString();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    memoryCache = {
      data: payload,
      expiresAt: Date.now() + CLIENT_CACHE_TTL_MS,
    };
    window.dispatchEvent(new CustomEvent('istd-backend-updated'));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

function bumpClientCacheMetric(hit: boolean): CacheStats {
  const defaultStats: CacheStats = {
    hits: hit ? 1 : 0,
    misses: hit ? 0 : 1,
    lastInvalidatedAt: new Date().toISOString(),
    ttlSeconds: 60,
    activeKeys: ['istd_full_payload', 'events_list', 'gallery_photos'],
    storageEngine: 'MongoDB-Compatible Local JSON Store',
    mongoConfigured: false,
  };
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = window.localStorage.getItem(CACHE_META_KEY);
    const meta: CacheStats = raw ? JSON.parse(raw) : defaultStats;
    if (hit) meta.hits = (meta.hits || 0) + 1;
    else meta.misses = (meta.misses || 0) + 1;
    window.localStorage.setItem(CACHE_META_KEY, JSON.stringify(meta));
    return meta;
  } catch {
    return defaultStats;
  }
}

export async function fetchBackendStore(
  bypassCache = false
): Promise<{ data: BackendDatabasePayload; cacheStats: CacheStats }> {
  if (!bypassCache && memoryCache && Date.now() < memoryCache.expiresAt) {
    return {
      data: memoryCache.data,
      cacheStats: bumpClientCacheMetric(true),
    };
  }

  try {
    const res = await fetch(
      `/api/backend${bypassCache ? '?refresh=1' : ''}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        saveLocalSyncedPayload(json.data);
        return {
          data: json.data,
          cacheStats: json.cacheStats || bumpClientCacheMetric(false),
        };
      }
    }
  } catch {
    // Fallback to client-synced store when on static GitHub Pages
  }

  const localData = getLocalSyncedPayload();
  memoryCache = {
    data: localData,
    expiresAt: Date.now() + CLIENT_CACHE_TTL_MS,
  };
  return {
    data: localData,
    cacheStats: bumpClientCacheMetric(false),
  };
}

export async function submitParticipantRegistration(
  input: Omit<EventRegistration, 'id' | 'registrationCode' | 'status' | 'createdAt'>
): Promise<EventRegistration> {
  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register_participant',
        payload: input,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.registration) {
        const local = getLocalSyncedPayload();
        local.registrations = [
          json.registration,
          ...local.registrations.filter((r) => r.id !== json.registration.id),
        ];
        saveLocalSyncedPayload(local);
        return json.registration as EventRegistration;
      }
    }
  } catch {
    // Fallback when running on static hosting
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newReg: EventRegistration = {
    ...input,
    id: `reg-${Date.now()}-${randomSuffix}`,
    registrationCode: `ISTD-TCR-2026-${randomSuffix}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  const local = getLocalSyncedPayload();
  local.registrations = [newReg, ...local.registrations];
  saveLocalSyncedPayload(local);
  return newReg;
}

export async function saveEventToBackend(event: ChapterEvent): Promise<ChapterEvent> {
  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'upsert_event',
        payload: event,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.event) {
        const local = getLocalSyncedPayload();
        const idx = local.events.findIndex(
          (e) => e.slug === event.slug || e.id === event.id
        );
        if (idx >= 0) local.events[idx] = json.event;
        else local.events = [json.event, ...local.events];
        saveLocalSyncedPayload(local);
        return json.event;
      }
    }
  } catch {
    // Fallback on static hosting
  }

  const local = getLocalSyncedPayload();
  const idx = local.events.findIndex((e) => e.slug === event.slug || e.id === event.id);
  if (idx >= 0) local.events[idx] = event;
  else local.events = [event, ...local.events];
  saveLocalSyncedPayload(local);
  return event;
}

export async function removeEventFromBackend(slug: string): Promise<void> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete_event',
        payload: { slug },
      }),
    });
  } catch {
    // Fallback on static hosting
  }
  const local = getLocalSyncedPayload();
  local.events = local.events.filter((e) => e.slug !== slug);
  saveLocalSyncedPayload(local);
}

export async function savePhotoToBackend(
  photo: GalleryPhoto,
  eventSlug?: string
): Promise<GalleryPhoto> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_photo',
        payload: { photo, eventSlug },
      }),
    });
  } catch {
    // Fallback on static hosting
  }

  const local = getLocalSyncedPayload();
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
  saveLocalSyncedPayload(local);
  return photo;
}

export async function removePhotoFromBackend(id: string): Promise<void> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete_photo',
        payload: { id },
      }),
    });
  } catch {
    // Fallback
  }
  const local = getLocalSyncedPayload();
  local.galleryPhotos = local.galleryPhotos.filter((p) => p.id !== id);
  saveLocalSyncedPayload(local);
}

export async function updateParticipantStatusInBackend(
  id: string,
  status: EventRegistration['status']
): Promise<void> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_registration_status',
        payload: { id, status },
      }),
    });
  } catch {
    // Fallback
  }
  const local = getLocalSyncedPayload();
  const reg = local.registrations.find((r) => r.id === id);
  if (reg) {
    reg.status = status;
    saveLocalSyncedPayload(local);
  }
}

export async function clearBackendCache(): Promise<CacheStats> {
  memoryCache = null;
  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear_cache' }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.cacheStats) return json.cacheStats;
    }
  } catch {
    // Fallback
  }
  const resetStats: CacheStats = {
    hits: 0,
    misses: 0,
    lastInvalidatedAt: new Date().toISOString(),
    ttlSeconds: 60,
    activeKeys: [],
    storageEngine: 'MongoDB-Compatible Local JSON Store',
    mongoConfigured: false,
  };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CACHE_META_KEY, JSON.stringify(resetStats));
  }
  return resetStats;
}

export interface AdminSession {
  email: string;
  name: string;
  role: string;
  loggedInAt: string;
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession | null): void {
  if (typeof window === 'undefined') return;
  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
  } else {
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }
}
