'use client';

import React, { useState } from 'react';
import { ChapterEvent } from '@/data/siteData';
import { EventRegistration } from '@/lib/backendStore';
import { submitParticipantRegistration } from '@/lib/clientBackendCache';
import { CaptchaChallenge } from './CaptchaChallenge';

const KERALA_DISTRICTS = [
  'Thrissur',
  'Ernakulam',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Wayanad',
  'Kannur',
  'Kasaragod',
  'Outside Kerala / Other',
];

interface EventRegistrationFormProps {
  event: ChapterEvent;
}

export function EventRegistrationForm({ event }: EventRegistrationFormProps) {
  const [salutation, setSalutation] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [district, setDistrict] = useState('Thrissur');
  const [customDistrict, setCustomDistrict] = useState('');
  const [stateName, setStateName] = useState('Kerala');
  const [city, setCity] = useState('Thrissur');
  const [participantCategory, setParticipantCategory] = useState(
    'Corporate / Industry Professional'
  );
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [experienceYears, setExperienceYears] = useState('3–7 Years');
  const [isIstdMember, setIsIstdMember] = useState('No');
  const [istdMembershipNo, setIstdMembershipNo] = useState('');
  const [istdChapterName, setIstdChapterName] = useState('Thrissur');
  const [requireCertificate, setRequireCertificate] = useState(true);
  const [expectations, setExpectations] = useState('');
  const [referralSource, setReferralSource] = useState('LinkedIn');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedReg, setConfirmedReg] = useState<EventRegistration | null>(null);

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (sameWhatsapp) {
      setWhatsapp(val);
    }
  };

  const handleSameWhatsappToggle = (checked: boolean) => {
    setSameWhatsapp(checked);
    if (checked) {
      setWhatsapp(phone);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!captchaVerified) {
      setErrorMsg('Please complete the 6-character security CAPTCHA verification before submitting.');
      return;
    }

    const finalDistrict =
      district === 'Outside Kerala / Other'
        ? customDistrict.trim() || 'Outside Kerala'
        : district;

    const finalWhatsapp = sameWhatsapp ? phone.trim() : whatsapp.trim();

    if (!fullName.trim() || !dob || !email.trim() || !phone.trim() || !finalWhatsapp) {
      setErrorMsg('Please fill in all required personal and contact fields (Name, DOB, Email, Phone, WhatsApp).');
      return;
    }

    setSubmitting(true);
    try {
      const created = await submitParticipantRegistration({
        eventId: event.id,
        eventSlug: event.slug,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.timeIST,
        eventVenue: event.venue,
        salutation,
        fullName: fullName.trim(),
        dob,
        gender,
        email: email.trim(),
        phone: phone.trim(),
        whatsapp: finalWhatsapp,
        district: finalDistrict,
        state: stateName.trim() || 'Kerala',
        city: city.trim(),
        participantCategory,
        organization: organization.trim(),
        designation: designation.trim(),
        experienceYears,
        isIstdMember,
        istdMembershipNo: isIstdMember === 'Yes' ? istdMembershipNo.trim() : undefined,
        istdChapterName: isIstdMember === 'Yes' ? istdChapterName.trim() : undefined,
        requireCertificate,
        expectations: expectations.trim(),
        referralSource,
      });

      setConfirmedReg(created);
    } catch {
      setErrorMsg('Could not complete registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetFormForAnother = () => {
    setFullName('');
    setDob('');
    setEmail('');
    setPhone('');
    setWhatsapp('');
    setExpectations('');
    setConfirmedReg(null);
    setCaptchaVerified(false);
    setCaptchaReset((c) => c + 1);
  };

  if (confirmedReg) {
    const whatsappShareText = encodeURIComponent(
      `Hello ISTD Thrissur Chapter,\n\nI have registered for "${confirmedReg.eventTitle}" (${confirmedReg.eventDate}, ${confirmedReg.eventTime}).\n\nRegistration ID: ${confirmedReg.registrationCode}\nName: ${confirmedReg.salutation} ${confirmedReg.fullName}\nEmail: ${confirmedReg.email}\nPhone/WhatsApp: ${confirmedReg.whatsapp}\nDistrict: ${confirmedReg.district}\nOrganisation: ${confirmedReg.organization} (${confirmedReg.designation})`
    );

    return (
      <div
        id="registrationConfirmationCard"
        style={{
          background: '#FFFFFF',
          border: '2px solid #10B981',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.1)',
        }}
      >
        {/* Top Green Confirmation Banner */}
        <div
          style={{
            background: 'linear-gradient(90deg, #065F46 0%, #047857 100%)',
            color: '#FFFFFF',
            padding: '1.75rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.18)',
                color: '#A7F3D0',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                marginBottom: '0.45rem',
              }}
            >
              ✓ Registration Confirmed
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Thank You, {confirmedReg.salutation} {confirmedReg.fullName}!
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#D1FAE5', margin: '0.25rem 0 0 0' }}>
              Your participant registration has been recorded in the ISTD Thrissur Chapter database.
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              color: '#065F46',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#047857',
              }}
            >
              Registration ID
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.04em' }}>
              {confirmedReg.registrationCode}
            </div>
          </div>
        </div>

        {/* Confirmation Details Body */}
        <div style={{ padding: '2rem' }}>
          <div
            style={{
              background: 'var(--bg-pale-blue)',
              border: '1px solid var(--border-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--brand-blue)',
                marginBottom: '0.25rem',
              }}
            >
              Registered Programme
            </div>
            <h4
              style={{
                fontSize: '1.18rem',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '0.4rem',
              }}
            >
              {confirmedReg.eventTitle}
            </h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-body)', fontWeight: 600 }}>
              📅 {confirmedReg.eventDate} &nbsp;|&nbsp; 🕖 {confirmedReg.eventTime} &nbsp;|&nbsp; 💻{' '}
              {confirmedReg.eventVenue}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--color-surface-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              fontSize: '0.88rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                PARTICIPANT NAME
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                {confirmedReg.salutation} {confirmedReg.fullName}
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                DATE OF BIRTH
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{confirmedReg.dob}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                EMAIL ADDRESS
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{confirmedReg.email}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                PHONE / WHATSAPP
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                {confirmedReg.phone} / {confirmedReg.whatsapp}
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                DISTRICT &amp; STATE
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                {confirmedReg.district}, {confirmedReg.state}
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                ORGANISATION &amp; DESIGNATION
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                {confirmedReg.organization} ({confirmedReg.designation})
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                CATEGORY &amp; EXPERIENCE
              </strong>
              <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                {confirmedReg.participantCategory} ({confirmedReg.experienceYears})
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.75rem' }}>
                PARTICIPATION E-CERTIFICATE
              </strong>
              <span style={{ fontWeight: 700, color: '#047857' }}>
                {confirmedReg.requireCertificate ? 'Requested (Yes)' : 'Not Requested'}
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.88rem',
              color: 'var(--color-body)',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-sm)',
              padding: '0.9rem 1.15rem',
              marginBottom: '1.5rem',
            }}
          >
            <strong>Joining Link &amp; Updates:</strong> The Google Meet session link and reminder will
            be shared to your registered email (<strong>{confirmedReg.email}</strong>) and WhatsApp
            number (<strong>{confirmedReg.whatsapp}</strong>) prior to the session.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-primary btn-sm"
            >
              🖨️ Print / Save Confirmation Pass
            </button>
            <a
              href={`https://wa.me/919496839168?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-navy btn-sm"
            >
              💬 Share Confirmation on WhatsApp
            </a>
            <button
              type="button"
              onClick={resetFormForAnother}
              className="btn btn-outline-blue btn-sm"
            >
              + Register Another Participant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="eventRegistrationFormBox"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--color-border)',
        borderTop: '4px solid var(--brand-blue)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="section-tag tag-blue">Online Participant Registration</span>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-ink)',
            marginBottom: '0.35rem',
          }}
        >
          Register for {event.title}
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', marginBottom: 0 }}>
          Fill in your details below to register for this session ({event.date} • {event.timeIST} •{' '}
          {event.venue}). Instant confirmation will be generated upon submission.
        </p>
      </div>

      {errorMsg && (
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            padding: '0.9rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Section 1: Personal & Contact Details */}
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--brand-blue)',
            marginBottom: '0.85rem',
            paddingBottom: '0.4rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          1. Personal &amp; Contact Information
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr 180px 170px',
            gap: '1rem',
            marginBottom: '1rem',
          }}
          className="reg-grid-row"
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Title *</label>
            <select
              className="form-control"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name (for certificate)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date of Birth (DOB) *</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@organisation.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Phone / Mobile Number *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+91 98460 XXXXX"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.35rem',
              }}
            >
              <label className="form-label" style={{ marginBottom: 0 }}>
                WhatsApp Number *
              </label>
              <label
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--brand-blue)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={sameWhatsapp}
                  onChange={(e) => handleSameWhatsappToggle(e.target.checked)}
                />
                Same as Phone
              </label>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="+91 98460 XXXXX"
              value={sameWhatsapp ? phone : whatsapp}
              onChange={(e) => {
                setSameWhatsapp(false);
                setWhatsapp(e.target.value);
              }}
              required
            />
          </div>
        </div>

        {/* Section 2: Location & District */}
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--brand-blue)',
            marginBottom: '0.85rem',
            paddingBottom: '0.4rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          2. Location &amp; Regional Details
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">District *</label>
            <select
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              {KERALA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {district === 'Outside Kerala / Other' && (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Specify District / Region *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your district"
                value={customDistrict}
                onChange={(e) => setCustomDistrict(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">City / Town *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Thrissur"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Kerala"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Section 3: Professional / Academic & ISTD Details */}
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--brand-blue)',
            marginBottom: '0.85rem',
            paddingBottom: '0.4rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          3. Professional, Academic &amp; ISTD Membership Details
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Participant Category *</label>
            <select
              className="form-control"
              value={participantCategory}
              onChange={(e) => setParticipantCategory(e.target.value)}
            >
              <option value="Corporate / Industry Professional">
                Corporate / Industry Professional
              </option>
              <option value="HR / L&D Practitioner">HR / L&amp;D Practitioner</option>
              <option value="Trainer / Consultant">Trainer / Consultant</option>
              <option value="Academician / Faculty">Academician / Faculty Member</option>
              <option value="Research Scholar">Research Scholar</option>
              <option value="Student">Student (Postgraduate / Undergraduate)</option>
              <option value="Entrepreneur / Business Leader">Entrepreneur / Business Leader</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Organisation / Institution / College *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Company, University, or Institution name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Designation / Department / Course *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., HR Manager / Asst. Professor / B.Tech CSE"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Professional Experience</label>
            <select
              className="form-control"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            >
              <option value="Student / Fresher">Student / Fresher</option>
              <option value="0–3 Years">0–3 Years</option>
              <option value="3–7 Years">3–7 Years</option>
              <option value="7–15 Years">7–15 Years</option>
              <option value="15+ Years">15+ Years</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Are you an ISTD Member?</label>
            <select
              className="form-control"
              value={isIstdMember}
              onChange={(e) => setIsIstdMember(e.target.value)}
            >
              <option value="No">No (Non-Member)</option>
              <option value="Yes">Yes (Existing ISTD Member)</option>
              <option value="Interested in Joining ISTD">
                No, but interested in ISTD Membership
              </option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">How did you hear about this event?</label>
            <select
              className="form-control"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="WhatsApp Group">WhatsApp Group / Status</option>
              <option value="ISTD Member Referral">ISTD Chapter Member Referral</option>
              <option value="ISTD Website">ISTD Thrissur Website</option>
              <option value="College / Institution">College / Academic Institution</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {isIstdMember === 'Yes' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
              padding: '1rem',
              background: 'var(--bg-pale-blue)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-blue)',
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">ISTD Membership Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., L-12345"
                value={istdMembershipNo}
                onChange={(e) => setIstdMembershipNo(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">ISTD Chapter Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Thrissur / Kochi / Trivandrum"
                value={istdChapterName}
                onChange={(e) => setIstdChapterName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '0.85rem' }}>
          <label className="form-label">
            Expectations or Questions for the Speaker (Optional)
          </label>
          <textarea
            className="form-control"
            rows={2}
            placeholder="Any specific topic or question you would like addressed during the session?"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={requireCertificate}
              onChange={(e) => setRequireCertificate(e.target.checked)}
            />
            I would like to receive an E-Certificate of Participation upon attending the session.
          </label>
        </div>

        {/* Security CAPTCHA */}
        <CaptchaChallenge
          onVerifyChange={setCaptchaVerified}
          resetSignal={captchaReset}
          label="Security CAPTCHA Verification *"
        />

        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-red"
            style={{ minWidth: '240px' }}
          >
            {submitting ? 'Submitting Registration...' : 'Complete Registration →'}
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            🔒 Stored securely in ISTD Thrissur Chapter MongoDB Backend.
          </span>
        </div>
      </form>
    </div>
  );
}
