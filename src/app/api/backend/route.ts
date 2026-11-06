import { NextResponse } from 'next/server';
import {
  getBackendData,
  getCacheStats,
  createEventRegistration,
  upsertChapterEvent,
  deleteChapterEvent,
  addGalleryOrEventPhoto,
  deleteGalleryPhoto,
  updateRegistrationStatus,
  lookupParticipantByQuery,
  createChapterEnquiry,
  updateEnquiryStatus,
  deleteChapterEnquiry,
  serverCache,
} from '@/lib/backendStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bypassCache = searchParams.get('refresh') === '1';
    const result = await getBackendData(bypassCache);
    return NextResponse.json(
      {
        ok: true,
        ...result,
      },
      {
        headers: {
          'X-Cache-Hits': String(result.cacheStats.hits),
          'X-Storage-Engine': result.cacheStats.storageEngine,
        },
      }
    );
  } catch (err) {
    console.error('[GET /api/backend Error]:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to load backend store' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body || {};

    if (action === 'admin_login') {
      const { email, password } = payload || {};
      const validEmail =
        process.env.ADMIN_EMAIL || 'admin@istdthrissur.org';
      const validPassword =
        process.env.ADMIN_PASSWORD || 'ISTD@Thrissur2026';

      const normalizedEmail = String(email || '').trim().toLowerCase();
      const isAllowedEmail =
        normalizedEmail === validEmail.toLowerCase() ||
        normalizedEmail === 'jibintcr@gmail.com' ||
        normalizedEmail === 'tonychacko67@gmail.com' ||
        normalizedEmail === 'admin';

      if (isAllowedEmail && password === validPassword) {
        return NextResponse.json({
          ok: true,
          session: {
            email: normalizedEmail,
            name:
              normalizedEmail === 'tonychacko67@gmail.com'
                ? 'Shri. Tony Chacko (Chairman)'
                : normalizedEmail === 'jibintcr@gmail.com'
                ? 'Mr. Jibin N (Treasurer)'
                : 'ISTD Trichur Chapter Admin',
            role: 'Chapter Administrator',
            loggedInAt: new Date().toISOString(),
          },
        });
      }
      return NextResponse.json(
        { ok: false, error: 'Invalid administrator credentials.' },
        { status: 401 }
      );
    }

    if (action === 'register_participant') {
      if (!payload?.fullName || !payload?.email || !payload?.phone || !payload?.eventSlug) {
        return NextResponse.json(
          { ok: false, error: 'Missing required participant registration fields.' },
          { status: 400 }
        );
      }
      const registration = await createEventRegistration(payload);
      return NextResponse.json({
        ok: true,
        registration,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'lookup_participant') {
      const q = String(payload?.query || '').trim();
      if (!q) {
        return NextResponse.json(
          { ok: false, error: 'Please enter a Unique Participant ID, Mobile Number, or Email.' },
          { status: 400 }
        );
      }
      const participant = await lookupParticipantByQuery(q);
      return NextResponse.json({
        ok: Boolean(participant),
        participant,
      });
    }

    if (action === 'upsert_event') {
      if (!payload?.title || !payload?.slug) {
        return NextResponse.json(
          { ok: false, error: 'Event title and slug are required.' },
          { status: 400 }
        );
      }
      const event = await upsertChapterEvent(payload);
      return NextResponse.json({
        ok: true,
        event,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'delete_event') {
      if (!payload?.slug) {
        return NextResponse.json(
          { ok: false, error: 'Event slug is required.' },
          { status: 400 }
        );
      }
      await deleteChapterEvent(payload.slug);
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'add_photo') {
      if (!payload?.photo?.src || !payload?.photo?.title) {
        return NextResponse.json(
          { ok: false, error: 'Photo source and title are required.' },
          { status: 400 }
        );
      }
      const photo = await addGalleryOrEventPhoto(payload.photo, payload.eventSlug);
      return NextResponse.json({
        ok: true,
        photo,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'delete_photo') {
      if (!payload?.id) {
        return NextResponse.json(
          { ok: false, error: 'Photo ID is required.' },
          { status: 400 }
        );
      }
      await deleteGalleryPhoto(payload.id);
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'update_registration_status') {
      if (!payload?.id || !payload?.status) {
        return NextResponse.json(
          { ok: false, error: 'Registration ID and status are required.' },
          { status: 400 }
        );
      }
      await updateRegistrationStatus(payload.id, payload.status);
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'submit_enquiry') {
      if (!payload?.fullName || !payload?.email || !payload?.phone) {
        return NextResponse.json(
          { ok: false, error: 'Full name, email, and phone are required.' },
          { status: 400 }
        );
      }
      const enquiry = await createChapterEnquiry(payload);
      return NextResponse.json({
        ok: true,
        enquiry,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'update_enquiry_status') {
      if (!payload?.id || !payload?.status) {
        return NextResponse.json(
          { ok: false, error: 'Enquiry ID and status are required.' },
          { status: 400 }
        );
      }
      await updateEnquiryStatus(payload.id, payload.status);
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'delete_enquiry') {
      if (!payload?.id) {
        return NextResponse.json(
          { ok: false, error: 'Enquiry ID is required.' },
          { status: 400 }
        );
      }
      await deleteChapterEnquiry(payload.id);
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    if (action === 'clear_cache') {
      serverCache.invalidateAll();
      return NextResponse.json({
        ok: true,
        cacheStats: getCacheStats(),
      });
    }

    return NextResponse.json(
      { ok: false, error: `Unknown action: ${action}` },
      { status: 400 }
    );
  } catch (err) {
    console.error('[POST /api/backend Error]:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error processing backend request.' },
      { status: 500 }
    );
  }
}
