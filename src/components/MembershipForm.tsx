'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ChapterEnquiry } from '@/lib/backendStore';
import { submitEnquiryToBackend } from '@/lib/clientBackendCache';

interface MembershipFormProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function MembershipForm({
  selectedCategory = 'Individual',
  onCategoryChange,
}: MembershipFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(selectedCategory);
  const [organization, setOrganization] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedEnquiry, setConfirmedEnquiry] = useState<ChapterEnquiry | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

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

    setSubmitting(true);
    setError(null);

    try {
      const saved = await submitEnquiryToBackend({
        source: 'Membership Enquiry',
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        category: `${category} Membership`,
        organization: organization.trim(),
        message:
          notes.trim() ||
          `Membership application & chapter affiliation enquiry for ${category} Membership.`,
      });

      setConfirmedEnquiry(saved);
      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setNotes('');
    } catch {
      setError('Unable to save your membership enquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card" id="membershipEnquiry">
      <div className="text-center" style={{ marginBottom: '1.75rem' }}>
        <span className="section-tag tag-red">Chapter Assistance &amp; Enquiry</span>
        <h2 className="section-title">ISTD Trichur Chapter Membership Enquiry</h2>
        <p className="section-subtitle">
          You can register directly online at{' '}
          <a
            href="https://www.istd.co.in/register/member"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--brand-blue)', fontWeight: 700, textDecoration: 'underline' }}
          >
            istd.co.in/register/member
          </a>{' '}
          or submit this enquiry form if you would like assistance from the ISTD Trichur Chapter
          office bearers with your application and chapter affiliation.
        </p>
      </div>

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
            ✓ Membership Enquiry Recorded in Backend System
          </div>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: '#047857' }}>
            Thank you, <strong>{confirmedEnquiry.fullName}</strong>. Your membership enquiry has
            been saved directly to the ISTD Trichur Chapter backend system.
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
              {confirmedEnquiry.category}
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

      <form id="membershipForm" onSubmit={handleSubmit} noValidate>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="memName">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="memName"
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
            <label className="form-label" htmlFor="memEmail">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="memEmail"
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
            <label className="form-label" htmlFor="memPhone">
              Phone / Mobile Number <span aria-hidden="true">*</span>
            </label>
            <input
              type="tel"
              id="memPhone"
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
            <label className="form-label" htmlFor="memCategory">
              Membership Category <span aria-hidden="true">*</span>
            </label>
            <select
              id="memCategory"
              name="category"
              className="form-control"
              value={category}
              onChange={(e) => handleCategorySelect(e.target.value)}
              required
            >
              <option value="Individual (Life)">
                Individual — Life Membership (₹9,204 incl. GST)
              </option>
              <option value="Individual (Annual)">
                Individual — Annual Membership (₹1,534 incl. GST)
              </option>
              <option value="Associate (Student)">
                Associate Member — For Students / Entry-Level (₹826 incl. GST)
              </option>
              <option value="Institutional">
                Institutional Membership — Annual (₹15,340) / Life (₹92,040)
              </option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="memOrg">
            Organisation / Institution &amp; Designation
          </label>
          <input
            type="text"
            id="memOrg"
            name="organization"
            className="form-control"
            placeholder="Your organisation or academic institution and role"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            autoComplete="organization"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="memNotes">
            Professional Background or Questions
          </label>
          <textarea
            id="memNotes"
            name="notes"
            className="form-control"
            placeholder="Share your area of work in training/HRD or any questions about membership..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
          <strong>Privacy Notice:</strong> The contact details you enter are used solely by the
          ISTD Trichur Chapter office bearers to respond to your membership enquiry and are not
          shared with third-party marketers. Read our{' '}
          <Link href="/privacy" style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          className="btn btn-red btn-lg"
          style={{ width: '100%' }}
          disabled={submitting}
        >
          <span>{submitting ? 'Saving Enquiry to Backend...' : 'Submit Enquiry'}</span>
        </button>
      </form>
    </div>
  );
}
