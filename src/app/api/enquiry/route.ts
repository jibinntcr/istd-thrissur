import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, category, organization, message } = body ?? {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid contact phone number.' },
        { status: 400 }
      );
    }

    const referenceId = `ISTD-TCR-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      ok: true,
      referenceId,
      type: type || 'general',
      submittedAt: new Date().toISOString(),
      summary: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        category: category || 'General',
        organization: organization || '',
        message: message || '',
      },
      message:
        type === 'membership'
          ? 'Thank you! Your ISTD Thrissur Chapter membership application has been registered. Our Secretariat will contact you shortly with the onboarding kit.'
          : 'Thank you for reaching out! Your enquiry has been received by the ISTD Thrissur Chapter Secretariat.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload. Please check your details and try again.' },
      { status: 400 }
    );
  }
}
