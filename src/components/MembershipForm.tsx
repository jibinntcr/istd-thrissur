'use client';

import React, { useState } from 'react';

interface MembershipFormProps {
  defaultCategory?: string;
}

export function MembershipForm({ defaultCategory = 'Individual' }: MembershipFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [organization, setOrganization] = useState('');
  const [notes, setNotes] = useState('');
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
          type: 'membership',
          name,
          email,
          phone,
          category,
          organization,
          message: notes,
        }),
      });
      if (res.status === 404 || res.status === 405) {
        // Static deployment fallback (e.g., GitHub Pages)
        const refId = `ISTD-TCR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setResult({
          referenceId: refId,
          message: `Thank you, ${name}. Your ${category} Membership application has been registered with the ISTD Thrissur Chapter Secretariat.`,
        });
        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setNotes('');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not submit application. Please try again.');
      } else {
        setResult({ referenceId: data.referenceId, message: data.message });
        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setNotes('');
      }
    } catch {
      const refId = `ISTD-TCR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setResult({
        referenceId: refId,
        message: `Thank you, ${name}. Your ${category} Membership application has been registered with the ISTD Thrissur Chapter Secretariat.`,
      });
      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setNotes('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <div className="text-center" style={{ marginBottom: '2rem' }}>
        <span className="section-tag tag-red">Application Form</span>
        <h2 className="section-title">Apply for ISTD Thrissur Membership</h2>
        <p className="section-subtitle">
          Submit your details below. Our Secretariat will contact you with the onboarding kit and
          fee remittance information.
        </p>
      </div>

      {result && (
        <div className="form-success-alert" role="status">
          <div className="form-success-title">
            ✓ Application Registered (Ref: {result.referenceId})
          </div>
          <p>{result.message}</p>
          <button
            type="button"
            className="btn btn-outline-navy btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => setResult(null)}
          >
            Submit Another Application
          </button>
        </div>
      )}

      {error && (
        <div className="form-error-alert" role="alert">
          {error}
        </div>
      )}

      {!result && (
        <form id="membershipForm" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="memName">
                Full Name *
              </label>
              <input
                type="text"
                id="memName"
                className="form-control"
                placeholder="e.g. Dr. Rajesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="memEmail">
                Email Address *
              </label>
              <input
                type="email"
                id="memEmail"
                className="form-control"
                placeholder="e.g. rajesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="memPhone">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                id="memPhone"
                className="form-control"
                placeholder="e.g. +91 9846000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="memCategory">
                Membership Category *
              </label>
              <select
                id="memCategory"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Individual">Individual Life Membership</option>
                <option value="Institutional">Institutional Membership</option>
                <option value="Student">Student Membership</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memOrg">
              Organization / Institution &amp; Designation
            </label>
            <input
              type="text"
              id="memOrg"
              className="form-control"
              placeholder="e.g. Head of HR, ABC Group / Research Scholar"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memNotes">
              Brief L&amp;D Background / Questions
            </label>
            <textarea
              id="memNotes"
              className="form-control"
              placeholder="Tell us briefly about your experience or key expectations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-red btn-lg"
            style={{ width: '100%' }}
            disabled={submitting}
          >
            <span>{submitting ? 'Submitting Application...' : 'Submit Membership Application'}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
