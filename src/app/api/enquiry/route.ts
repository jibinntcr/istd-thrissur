import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, category, organization, eventTitle, message } = body ?? {};

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

    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        {
          ok: false,
          unconfigured: true,
          error:
            'Automated form submission is not yet connected to a backend mail server. Your entered information is preserved below—please use the "Send via Email Client" button to send your pre-filled enquiry directly to the ISTD Thrissur Chapter (tonychacko67@gmail.com, jibintcr@gmail.com).',
        },
        { status: 503 }
      );
    }

    const upstreamRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: type || 'general',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        category: category || 'General',
        organization: organization || '',
        eventTitle: eventTitle || '',
        message: message || '',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'The enquiry service could not process your request at this moment. Your entered details remain in the form—please try again or use the direct email option below.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        type === 'membership'
          ? 'Thank you. Your membership enquiry has been sent to the ISTD Thrissur Chapter.'
          : 'Thank you. Your enquiry has been sent to the ISTD Thrissur Chapter.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload. Please check your details and try again.' },
      { status: 400 }
    );
  }
}
