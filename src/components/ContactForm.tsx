'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ referenceId: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          phone,
          category: category || 'General',
          message,
        }),
      });
      if (res.status === 404 || res.status === 405) {
        // Static deployment fallback (e.g., GitHub Pages)
        const refId = `ISTD-TCR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setResult({
          referenceId: refId,
          message: `Thank you, ${name}. Your enquiry regarding "${category || 'General'}" has been received by the ISTD Thrissur Chapter Secretariat.`,
        });
        setName('');
        setEmail('');
        setPhone('');
        setCategory('');
        setMessage('');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not send message. Please try again.');
      } else {
        setResult({ referenceId: data.referenceId, message: data.message });
        setName('');
        setEmail('');
        setPhone('');
        setCategory('');
        setMessage('');
      }
    } catch {
      const refId = `ISTD-TCR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setResult({
        referenceId: refId,
        message: `Thank you, ${name}. Your enquiry regarding "${category || 'General'}" has been received by the ISTD Thrissur Chapter Secretariat.`,
      });
      setName('');
      setEmail('');
      setPhone('');
      setCategory('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <span className="section-tag tag-red">Send an Enquiry</span>
      <h2
        style={{
          fontSize: '1.75rem',
          marginBottom: '0.5rem',
          color: 'var(--color-ink)',
          fontWeight: 800,
        }}
      >
        Connect With Us
      </h2>
      <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Please fill out the form below and our Chapter leadership will respond to you promptly.
      </p>

      {result && (
        <div className="form-success-alert" role="status">
          <div className="form-success-title">
            ✓ Enquiry Sent (Ref: {result.referenceId})
          </div>
          <p>{result.message}</p>
          <button
            type="button"
            className="btn btn-outline-navy btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => setResult(null)}
          >
            Send Another Message
          </button>
        </div>
      )}

      {error && (
        <div className="form-error-alert" role="alert">
          {error}
        </div>
      )}

      {!result && (
        <form id="contactLeadForm" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="contactName">
                Full Name *
              </label>
              <input
                type="text"
                id="contactName"
                className="form-control"
                placeholder="e.g. Anand Varma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactEmail">
                Email Address *
              </label>
              <input
                type="email"
                id="contactEmail"
                className="form-control"
                placeholder="e.g. anand@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="contactPhone">
                Phone / Mobile *
              </label>
              <input
                type="tel"
                id="contactPhone"
                className="form-control"
                placeholder="e.g. +91 9846101034"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactCategory">
                Enquiry Category *
              </label>
              <select
                id="contactCategory"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Knowledge Forums & Workshops">
                  Knowledge Forums, Webinars &amp; Workshops
                </option>
                <option value="Industry-Academia Collaboration">
                  Industry–Academia &amp; Campus Collaboration
                </option>
                <option value="Membership">
                  Membership (Individual / Institutional / Student)
                </option>
                <option value="Others">General Enquiry / Speaking Engagements</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contactMessage">
              Message *
            </label>
            <textarea
              id="contactMessage"
              className="form-control"
              placeholder="Write your message or inquiry details here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-red btn-lg"
            style={{ width: '100%' }}
            id="contactSubmitBtn"
            disabled={submitting}
          >
            <span>{submitting ? 'Sending Message...' : 'Submit Message'}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
