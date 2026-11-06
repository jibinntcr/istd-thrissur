'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ALL_CHAPTER_EVENTS } from '@/data/siteData';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Events & Programmes Enquiry');
  const [eventTitle, setEventTitle] = useState(
    'Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications'
  );
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qType = params.get('type');
    const qEvent = params.get('event');
    const qCategory = params.get('category');

    if (qEvent) {
      setCategory('Events & Programmes Enquiry');
      setEventTitle(qEvent);
    } else if (qType === 'event') {
      setCategory('Events & Programmes Enquiry');
    } else if (qCategory) {
      setCategory(qCategory);
    }
  }, []);

  const buildMailtoHref = () => {
    const subjectLine =
      category === 'Events & Programmes Enquiry' && eventTitle
        ? `ISTD Trichur Chapter Event Enquiry: ${eventTitle}`
        : `ISTD Trichur Chapter Enquiry: ${category} (${name || 'Visitor'})`;
    const subject = encodeURIComponent(subjectLine);
    const body = encodeURIComponent(
      [
        `ISTD Trichur Chapter — Contact / Event Enquiry`,
        `------------------------------------------------`,
        `Full Name: ${name}`,
        `Email Address: ${email}`,
        `Phone / Mobile: ${phone}`,
        `Enquiry Category: ${category}`,
        category === 'Events & Programmes Enquiry' ? `Selected Event: ${eventTitle}` : null,
        ``,
        `Message:`,
        `${message}`,
      ]
        .filter((line) => line !== null)
        .join('\n')
    );
    return `mailto:tonychacko67@gmail.com,jibintcr@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyDetails = async () => {
    const text = [
      `ISTD Trichur Chapter — Enquiry`,
      `Full Name: ${name}`,
      `Email Address: ${email}`,
      `Phone / Mobile: ${phone}`,
      `Enquiry Category: ${category}`,
      category === 'Events & Programmes Enquiry' ? `Selected Event: ${eventTitle}` : null,
      `Message: ${message}`,
    ]
      .filter((line) => line !== null)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedPhone.length < 7) {
      setError('Please enter a valid phone or mobile number.');
      return;
    }
    if (!trimmedMessage) {
      setError('Please enter your message or enquiry details.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setResultMessage(null);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          category,
          eventTitle: category === 'Events & Programmes Enquiry' ? eventTitle : '',
          message: trimmedMessage,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setError(
          'Automated server delivery is not configured on this static host. Your entered details have been preserved in the form—please click "Send via Email Client" below to send your pre-filled enquiry directly to the Trichur Chapter office bearers.'
        );
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            'Automated form delivery is currently unavailable. Your entered details remain in the form—please use the "Send via Email Client" button below.'
        );
      } else {
        setResultMessage(data.message);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch {
      setError(
        'Automated server delivery is not configured on this host. Your entered details have been preserved in the form—please click "Send via Email Client" below to send your pre-filled enquiry directly to the Trichur Chapter office bearers.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card" id="contactEnquiryForm">
      <span className="section-tag tag-red">Enquiry Form</span>
      <h2
        style={{
          fontSize: '1.65rem',
          marginBottom: '0.5rem',
          color: 'var(--color-ink)',
          fontWeight: 800,
        }}
      >
        Send an Enquiry to the Trichur Chapter
      </h2>
      <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', marginBottom: '1.75rem' }}>
        Use this form for event enquiries, speaker proposals, institutional collaboration, or
        chapter membership questions.
      </p>

      {resultMessage && (
        <div className="form-success-alert" role="status">
          <div className="form-success-title">Enquiry Sent</div>
          <p>{resultMessage}</p>
          <button
            type="button"
            className="btn btn-outline-navy btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => setResultMessage(null)}
          >
            Send Another Enquiry
          </button>
        </div>
      )}

      {error && (
        <div className="form-error-alert" role="alert" style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.85rem 0', fontWeight: 600 }}>{error}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            <a href={buildMailtoHref()} className="btn btn-primary btn-sm">
              Send via Email Client (Pre-filled)
            </a>
            <button
              type="button"
              className="btn btn-outline-navy btn-sm"
              onClick={handleCopyDetails}
            >
              {copied ? 'Copied to Clipboard ✓' : 'Copy Enquiry Details'}
            </button>
          </div>
        </div>
      )}

      <form id="contactLeadForm" onSubmit={handleSubmit} noValidate>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="contactName">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contactEmail">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="contactPhone">
              Phone / Mobile Number <span aria-hidden="true">*</span>
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="phone"
              className="form-control"
              placeholder="+91 9846101034"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contactCategory">
              Enquiry Category <span aria-hidden="true">*</span>
            </label>
            <select
              id="contactCategory"
              name="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Events & Programmes Enquiry">Events &amp; Programmes Enquiry</option>
              <option value="Membership Enquiry">Membership Enquiry</option>
              <option value="Academic / Institutional Collaboration">
                Academic / Institutional Collaboration
              </option>
              <option value="General Chapter Enquiry">General Chapter Enquiry</option>
            </select>
          </div>
        </div>

        {category === 'Events & Programmes Enquiry' && (
          <div className="form-group">
            <label className="form-label" htmlFor="contactEventTitle">
              Selected Event or Programme <span aria-hidden="true">*</span>
            </label>
            <select
              id="contactEventTitle"
              name="eventTitle"
              className="form-control"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            >
              {ALL_CHAPTER_EVENTS.map((ev) => (
                <option key={ev.slug} value={ev.title}>
                  {ev.title} ({ev.date})
                </option>
              ))}
              <option value="Programme Collaboration or Speaker Proposal">
                Programme Collaboration or Speaker Proposal
              </option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="contactMessage">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contactMessage"
            name="message"
            className="form-control"
            placeholder="Write your enquiry details or questions here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Privacy Notice */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
            lineHeight: 1.55,
            marginBottom: '1.25rem',
          }}
        >
          <strong>Privacy Notice:</strong> Your contact information and message are used solely by
          the ISTD Trichur Chapter office bearers to respond to your enquiry. See our{' '}
          <Link href="/privacy" style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          className="btn btn-red btn-lg"
          style={{ width: '100%' }}
          id="contactSubmitBtn"
          disabled={submitting}
        >
          <span>{submitting ? 'Checking Enquiry Service...' : 'Submit Enquiry'}</span>
        </button>
      </form>
    </div>
  );
}
