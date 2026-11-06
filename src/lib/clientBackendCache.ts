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
  ChapterEnquiry,
  EventRegistration,
} from './backendStore';

const STORAGE_KEY = 'istd_tcr_backend_db_v6';
const CACHE_META_KEY = 'istd_tcr_cache_meta_v1';
const AUTH_SESSION_KEY = 'istd_tcr_admin_session_v1';
const SAVED_PARTICIPANT_KEY = 'istd_tcr_saved_participant_v1';
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
    enquiries: [],
    updatedAt: new Date().toISOString(),
  };
}

export class DuplicateEventRegistrationError extends Error {
  existingRegistration: EventRegistration;

  constructor(message: string, existingRegistration: EventRegistration) {
    super(message);
    this.name = 'DuplicateEventRegistrationError';
    this.existingRegistration = existingRegistration;
  }
}

function deduplicateClientRegistrations(
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
    // Always use canonical siteData events & galleryPhotos first, then append any custom admin-created entries
    const canonicalSlugs = new Set(ALL_CHAPTER_EVENTS.map((e) => e.slug));
    const customEvents = (parsed.events || []).filter(
      (e) => !canonicalSlugs.has(e.slug)
    );
    const mergedEvents = [...ALL_CHAPTER_EVENTS, ...customEvents];

    const canonicalPhotoIds = new Set(GALLERY_PHOTOS.map((p) => p.id));
    const customPhotos = (parsed.galleryPhotos || []).filter(
      (p) => !canonicalPhotoIds.has(p.id)
    );
    const mergedPhotos = [...GALLERY_PHOTOS, ...customPhotos];

    const rawRegs = Array.isArray(parsed.registrations) ? parsed.registrations : [];
    const dedupedRegs = deduplicateClientRegistrations(rawRegs);
    if (dedupedRegs.length !== rawRegs.length) {
      try {
        parsed.registrations = dedupedRegs;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch {
        // ignore storage quota errors
      }
    }

    return {
      events: mergedEvents,
      galleryPhotos: mergedPhotos,
      registrations: dedupedRegs,
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
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

export function saveBrowserParticipantProfile(reg: EventRegistration): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SAVED_PARTICIPANT_KEY, JSON.stringify(reg));
  } catch {
    // ignore storage errors
  }
}

export function getSavedBrowserParticipantProfile(): EventRegistration | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SAVED_PARTICIPANT_KEY);
    return raw ? (JSON.parse(raw) as EventRegistration) : null;
  } catch {
    return null;
  }
}

export async function lookupParticipantProfile(
  query: string
): Promise<EventRegistration | null> {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const digits = q.replace(/[^0-9]/g, '');

  // 1. Try Server API first
  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'lookup_participant',
        payload: { query: query.trim() },
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.ok && json?.participant) {
        return json.participant as EventRegistration;
      }
    }
  } catch {
    // Static hosting fallback
  }

  // 2. Search local synced registrations + saved browser profile
  const local = getLocalSyncedPayload();
  const saved = getSavedBrowserParticipantProfile();
  const pool = saved ? [saved, ...local.registrations] : local.registrations;

  const found = pool.find((r) => {
    const pid = (r.participantCode || `ISTD-PID-2026-1001`).toLowerCase();
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

export function findExistingRegistrationForEvent(
  eventSlug: string,
  query: { email?: string; phone?: string; participantCode?: string }
): EventRegistration | null {
  const targetSlug = (eventSlug || '').trim().toLowerCase();
  if (!targetSlug) return null;

  const normEmail = (query.email || '').trim().toLowerCase();
  const normPhone = (query.phone || '').replace(/[^0-9]/g, '').slice(-10);
  const normPid = (query.participantCode || '').trim().toUpperCase();

  if (!normEmail && normPhone.length < 10 && !normPid) {
    return null;
  }

  const local = getLocalSyncedPayload();
  const saved = getSavedBrowserParticipantProfile();
  const pool =
    saved && !local.registrations.some((r) => r.id === saved.id)
      ? [saved, ...local.registrations]
      : local.registrations;

  const found = pool.find((r) => {
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

export async function submitParticipantRegistration(
  input: Omit<EventRegistration, 'id' | 'registrationCode' | 'status' | 'createdAt'>
): Promise<EventRegistration> {
  // 1. Check client-synced registrations first to block duplicate registration for the same event
  const localDuplicate = findExistingRegistrationForEvent(input.eventSlug, {
    email: input.email,
    phone: input.phone,
    participantCode: input.participantCode,
  });
  if (localDuplicate) {
    throw new DuplicateEventRegistrationError(
      `Only 1 registration per Email ID / Participant ID is allowed for each event. You are already registered for "${input.eventTitle}" (Event Pass: ${localDuplicate.registrationCode}).`,
      localDuplicate
    );
  }

  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register_participant',
        payload: input,
      }),
    });
    if (res.status === 409) {
      const json = await res.json();
      if (json?.existingRegistration) {
        throw new DuplicateEventRegistrationError(
          json.error ||
            `Only 1 registration per Email ID / Participant ID is allowed for each event.`,
          json.existingRegistration as EventRegistration
        );
      }
    }
    if (res.ok) {
      const json = await res.json();
      if (json?.registration) {
        const local = getLocalSyncedPayload();
        local.registrations = [
          json.registration,
          ...local.registrations.filter((r) => r.id !== json.registration.id),
        ];
        saveLocalSyncedPayload(local);
        saveBrowserParticipantProfile(json.registration);
        return json.registration as EventRegistration;
      }
    }
  } catch (err) {
    if (err instanceof DuplicateEventRegistrationError) {
      throw err;
    }
    // Fallback when running on static hosting
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const local = getLocalSyncedPayload();
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

  local.registrations = [newReg, ...local.registrations];
  saveLocalSyncedPayload(local);
  saveBrowserParticipantProfile(newReg);
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

export async function submitEnquiryToBackend(
  input: Omit<ChapterEnquiry, 'id' | 'enquiryCode' | 'status' | 'createdAt'> & {
    enquiryCode?: string;
  }
): Promise<ChapterEnquiry> {
  try {
    const res = await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submit_enquiry',
        payload: input,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.enquiry) {
        const local = getLocalSyncedPayload();
        local.enquiries = [
          json.enquiry,
          ...(local.enquiries || []).filter((e) => e.id !== json.enquiry.id),
        ];
        saveLocalSyncedPayload(local);
        return json.enquiry as ChapterEnquiry;
      }
    }
  } catch {
    // Fallback to client-synced backend store when running on static hosting
  }

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

  const local = getLocalSyncedPayload();
  local.enquiries = [newEnq, ...(local.enquiries || [])];
  saveLocalSyncedPayload(local);
  return newEnq;
}

export async function updateEnquiryStatusInBackend(
  id: string,
  status: ChapterEnquiry['status']
): Promise<void> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_enquiry_status',
        payload: { id, status },
      }),
    });
  } catch {
    // Fallback
  }
  const local = getLocalSyncedPayload();
  const enq = (local.enquiries || []).find((e) => e.id === id);
  if (enq) {
    enq.status = status;
    saveLocalSyncedPayload(local);
  }
}

export async function removeEnquiryFromBackend(id: string): Promise<void> {
  try {
    await fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete_enquiry',
        payload: { id },
      }),
    });
  } catch {
    // Fallback
  }
  const local = getLocalSyncedPayload();
  local.enquiries = (local.enquiries || []).filter((e) => e.id !== id);
  saveLocalSyncedPayload(local);
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
