'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `ISTD Trichur Chapter Membership Enquiry - ${category} Membership (${name || 'Prospective Member'})`
    );
    const body = encodeURIComponent(
      [
        `ISTD Trichur Chapter — Membership Enquiry`,
        `-------------------------------------------`,
        `Full Name: ${name}`,
        `Email Address: ${email}`,
        `Phone / Mobile: ${phone}`,
        `Membership Category: ${category} Membership`,
        `Organisation & Designation: ${organization || 'Not specified'}`,
        ``,
        `Professional Background / Questions:`,
        `${notes || 'Please share membership application guidance for the ISTD Trichur Chapter.'}`,
      ].join('\n')
    );
    return `mailto:tonychacko67@gmail.com,jibintcr@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyDetails = async () => {
    const text = [
      `ISTD Trichur Chapter — Membership Enquiry`,
      `Full Name: ${name}`,
      `Email Address: ${email}`,
      `Phone / Mobile: ${phone}`,
      `Membership Category: ${category} Membership`,
      `Organisation & Designation: ${organization || 'Not specified'}`,
      `Notes: ${notes || 'N/A'}`,
    ].join('\n');
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
    setResultMessage(null);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'membership',
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          category,
          organization: organization.trim(),
          message: notes.trim(),
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
        setOrganization('');
        setNotes('');
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
    <div className="form-card" id="membershipEnquiry">
      <div className="text-center" style={{ marginBottom: '1.75rem' }}>
        <span className="section-tag tag-red">Expression of Interest</span>
        <h2 className="section-title">Membership Enquiry</h2>
        <p className="section-subtitle">
          This form collects expressions of interest for the ISTD Trichur Chapter. Formal ISTD
          membership registration and fee remittance are completed through the ISTD National
          Office, New Delhi.
        </p>
      </div>

      {resultMessage && (
        <div className="form-success-alert" role="status">
          <div className="form-success-title">Enquiry Submitted</div>
          <p>{resultMessage}</p>
          <button
            type="button"
            className="btn btn-outline-navy btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => setResultMessage(null)}
          >
            Submit Another Enquiry
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
              <option value="Individual">Individual Membership</option>
              <option value="Institutional">Institutional Membership</option>
              <option value="Student">Student Membership</option>
              <option value="Associate">Associate Membership</option>
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
          <span>{submitting ? 'Checking Enquiry Service...' : 'Submit Enquiry'}</span>
        </button>
      </form>
    </div>
  );
}
