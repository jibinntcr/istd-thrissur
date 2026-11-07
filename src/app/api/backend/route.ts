import crypto from 'crypto';
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
      const salt = 'istd-tcr-diamond-2026-salt::';
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const emailHash = crypto
        .createHash('sha256')
        .update(salt + normalizedEmail)
        .digest('hex');
      const passwordHash = crypto
        .createHash('sha256')
        .update(salt + String(password || ''))
        .digest('hex');

      const allowedEmailHashes = new Set([
        '4d8f6544a2de4d0102527ae1e9fbd9944ac67d064064b202048829c748c2f91a', // admin@istdthrissur.org
        'd6e157131c00e8a2f0333fbd5830899b3962e9f006ffecb0678b4c12619e18fd', // jibintcr@gmail.com
        '2673938746c9355eddd4223f7449cd29773359c2330c975c70f7f0a131da6578', // tonychacko67@gmail.com
        '236bb8fe3d1d2a057fb07db95a05abbbfe88a5f5568aaf7bd37cf0e16c4ec957', // admin
      ]);

      const envPassword = process.env.ADMIN_PASSWORD;
      const validPasswordHashes = new Set(
        envPassword
          ? [
              crypto
                .createHash('sha256')
                .update(salt + envPassword)
                .digest('hex'),
            ]
          : [
              '3e69982ff658a8ac100c5b2436e9b1a95fdf05cbb4dafb6ab2aa5b62b9a334f7', // ISTD@Thrissur2026
              '9259d3cb2c7cd679071a1534498487faa65cf332fd84b3b4aeaa30cdd38887f8',
            ]
      );

      if (allowedEmailHashes.has(emailHash) && validPasswordHashes.has(passwordHash)) {
        return NextResponse.json({
          ok: true,
          session: {
            email: normalizedEmail,
            name:
              emailHash ===
              '2673938746c9355eddd4223f7449cd29773359c2330c975c70f7f0a131da6578'
                ? 'Shri. Tony Chacko (Chairman)'
                : emailHash ===
                  'd6e157131c00e8a2f0333fbd5830899b3962e9f006ffecb0678b4c12619e18fd'
                ? 'Mr. Jibin N (Treasurer)'
                : 'ISTD Trichur Chapter Admin',
            role: 'Chapter Administrator',
            loggedInAt: new Date().toISOString(),
          },
        });
      }
      return NextResponse.json(
        { ok: false, error: 'Invalid administrator credentials. Access denied.' },
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
      try {
        const registration = await createEventRegistration(payload);
        return NextResponse.json({
          ok: true,
          registration,
          cacheStats: getCacheStats(),
        });
      } catch (err: unknown) {
        const dupErr = err as Error & {
          isDuplicate?: boolean;
          existingRegistration?: unknown;
        };
        if (dupErr?.isDuplicate) {
          return NextResponse.json(
            {
              ok: false,
              duplicate: true,
              existingRegistration: dupErr.existingRegistration,
              error: dupErr.message,
            },
            { status: 409 }
          );
        }
        throw err;
      }
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
