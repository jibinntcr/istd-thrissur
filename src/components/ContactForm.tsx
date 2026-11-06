'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ALL_CHAPTER_EVENTS } from '@/data/siteData';
import type { ChapterEnquiry } from '@/lib/backendStore';
import { submitEnquiryToBackend } from '@/lib/clientBackendCache';

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
  const [confirmedEnquiry, setConfirmedEnquiry] = useState<ChapterEnquiry | null>(null);

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

    try {
      const saved = await submitEnquiryToBackend({
        source: 'Contact Enquiry',
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        category,
        eventTitle: category === 'Events & Programmes Enquiry' ? eventTitle : '',
        message: trimmedMessage,
      });

      setConfirmedEnquiry(saved);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setError('Unable to save your enquiry right now. Please try again.');
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

      {confirmedEnquiry && (
        <div
          className="form-success-alert"
          role="status"
          style={{
            marginBottom: '1.75rem',
            padding: '1.35rem 1.45rem',
            borderRadius: '14px',
            background: '#ECFDF5',
            border: '1.5px solid #6EE7B7',
          }}
        >
          <div
            className="form-success-title"
            style={{
              fontSize: '1.08rem',
              fontWeight: 800,
              color: '#065F46',
              marginBottom: '0.35rem',
            }}
          >
            ✓ Enquiry Recorded in ISTD Trichur Backend System
          </div>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: '#047857' }}>
            Thank you, <strong>{confirmedEnquiry.fullName}</strong>. Your enquiry has been saved
            directly to the ISTD Trichur Chapter backend database for review by the chapter office
            bearers.
          </p>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px dashed #34D399',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '0.85rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748B',
                }}
              >
                Enquiry Reference ID
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  fontFamily: 'monospace',
                }}
              >
                {confirmedEnquiry.enquiryCode}
              </div>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700 }}>
              Category: {confirmedEnquiry.category}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-navy btn-sm"
            onClick={() => setConfirmedEnquiry(null)}
          >
            Submit Another Enquiry
          </button>
        </div>
      )}

      {error && (
        <div className="form-error-alert" role="alert" style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, fontWeight: 600 }}>{error}</p>
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
          <span>{submitting ? 'Saving Enquiry to Backend...' : 'Submit Enquiry'}</span>
        </button>
      </form>
    </div>
  );
}
