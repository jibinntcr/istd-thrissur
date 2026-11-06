'use client';

import React, { useState, useEffect } from 'react';
import { ChapterEvent } from '@/data/siteData';
import { EventRegistration } from '@/lib/backendStore';
import {
  submitParticipantRegistration,
  lookupParticipantProfile,
  getSavedBrowserParticipantProfile,
} from '@/lib/clientBackendCache';
import { CaptchaChallenge } from './CaptchaChallenge';

const KERALA_DISTRICTS = [
  'Trichur',
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
  // Returning Participant Auto-Fill State
  const [lookupInput, setLookupInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupBanner, setLookupBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [savedBrowserProfile, setSavedBrowserProfile] =
    useState<EventRegistration | null>(null);
  const [activeParticipantCode, setActiveParticipantCode] = useState<string>('');
  const [copiedId, setCopiedId] = useState(false);

  // Registration Form Fields
  const [salutation, setSalutation] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [district, setDistrict] = useState('Trichur');
  const [customDistrict, setCustomDistrict] = useState('');
  const [stateName, setStateName] = useState('Kerala');
  const [city, setCity] = useState('Trichur');
  const [participantCategory, setParticipantCategory] = useState(
    'Corporate / Industry Professional'
  );
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [experienceYears, setExperienceYears] = useState('3–7 Years');
  const [isIstdMember, setIsIstdMember] = useState('No');
  const [istdMembershipNo, setIstdMembershipNo] = useState('');
  const [istdChapterName, setIstdChapterName] = useState('Trichur');
  const [requireCertificate, setRequireCertificate] = useState(true);
  const [expectations, setExpectations] = useState('');
  const [referralSource, setReferralSource] = useState('LinkedIn');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedReg, setConfirmedReg] = useState<EventRegistration | null>(null);

  useEffect(() => {
    const saved = getSavedBrowserParticipantProfile();
    if (saved) {
      setSavedBrowserProfile(saved);
    }
  }, []);

  useEffect(() => {
    if (confirmedReg) {
      const el = document.getElementById('registrationConfirmationCard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [confirmedReg]);

  const applyParticipantProfile = (profile: EventRegistration) => {
    setSalutation(profile.salutation || 'Mr.');
    setFullName(profile.fullName || '');
    setDob(profile.dob || '');
    setGender(profile.gender || 'Prefer not to say');
    setEmail(profile.email || '');
    setPhone(profile.phone || '');
    const waMatches = !profile.whatsapp || profile.whatsapp === profile.phone;
    setSameWhatsapp(waMatches);
    setWhatsapp(profile.whatsapp || profile.phone || '');

    if (KERALA_DISTRICTS.includes(profile.district)) {
      setDistrict(profile.district);
      setCustomDistrict('');
    } else {
      setDistrict('Outside Kerala / Other');
      setCustomDistrict(profile.district || '');
    }

    setCity(profile.city || profile.district || 'Trichur');
    setStateName(profile.state || 'Kerala');
    setParticipantCategory(
      profile.participantCategory || 'Corporate / Industry Professional'
    );
    setOrganization(profile.organization || '');
    setDesignation(profile.designation || '');
    setExperienceYears(profile.experienceYears || '3–7 Years');
    setIsIstdMember(profile.isIstdMember || 'No');
    setIstdMembershipNo(profile.istdMembershipNo || '');
    setIstdChapterName(profile.istdChapterName || 'Trichur');
    setRequireCertificate(profile.requireCertificate ?? true);
    setReferralSource(profile.referralSource || 'LinkedIn');

    const pid = profile.participantCode || 'ISTD-PID-2026-1001';
    setActiveParticipantCode(pid);
    setLookupInput(pid);
    setLookupBanner({
      type: 'success',
      message: `✓ Auto-filled details for ${profile.salutation} ${profile.fullName} (Unique ID: ${pid}). Please verify the security code at the bottom and click Complete Registration.`,
    });
  };

  const handleLookupAutoFill = async (queryOverride?: string) => {
    const q = (queryOverride ?? lookupInput).trim();
    if (!q) {
      setLookupBanner({
        type: 'error',
        message:
          'Please enter your Unique Participant ID (e.g. ISTD-PID-2026-1001), Registered Mobile Number, or Email.',
      });
      return;
    }

    setLookupLoading(true);
    setLookupBanner(null);
    try {
      const found = await lookupParticipantProfile(q);
      if (!found) {
        setLookupBanner({
          type: 'error',
          message: `No existing registration found for "${q}". Please fill in the form below — you will receive your permanent Unique Participant ID upon registering!`,
        });
        return;
      }
      applyParticipantProfile(found);
    } finally {
      setLookupLoading(false);
    }
  };

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
      setErrorMsg(
        'Please enter the 6-character security CAPTCHA code before completing your registration.'
      );
      return;
    }

    const finalDistrict =
      district === 'Outside Kerala / Other'
        ? customDistrict.trim() || 'Outside Kerala'
        : district;

    const finalWhatsapp = sameWhatsapp ? phone.trim() : whatsapp.trim();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !finalWhatsapp) {
      setErrorMsg(
        'Please fill in all required personal and contact details (Full Name, Email, Mobile, and WhatsApp).'
      );
      return;
    }

    setSubmitting(true);
    try {
      const created = await submitParticipantRegistration({
        participantCode: activeParticipantCode || undefined,
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
      setSavedBrowserProfile(created);
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
    setActiveParticipantCode('');
    setLookupInput('');
    setLookupBanner(null);
    setConfirmedReg(null);
    setCaptchaVerified(false);
    setCaptchaReset((c) => c + 1);
  };

  // ============================================================================
  // VIEW 1: REGISTRATION CONFIRMED PASS + PERMANENT UNIQUE PARTICIPANT ID CARD
  // ============================================================================
  if (confirmedReg) {
    const permanentId =
      confirmedReg.participantCode || confirmedReg.registrationCode.replace('TCR', 'PID');

    const whatsappShareText = encodeURIComponent(
      `Hello ISTD Trichur Chapter,\n\nI have registered for "${confirmedReg.eventTitle}" (${confirmedReg.eventDate}, ${confirmedReg.eventTime}).\n\n• Unique Participant ID: ${permanentId}\n• Event Registration Pass: ${confirmedReg.registrationCode}\n• Name: ${confirmedReg.salutation} ${confirmedReg.fullName}\n• Email: ${confirmedReg.email}\n• WhatsApp: ${confirmedReg.whatsapp}\n• District: ${confirmedReg.district}\n• Organisation: ${confirmedReg.organization} (${confirmedReg.designation})`
    );

    const handleCopyUniqueId = () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(permanentId);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 3000);
      }
    };

    return (
      <div
        id="registrationConfirmationCard"
        style={{
          background: '#FFFFFF',
          border: '2px solid #10B981',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
        }}
      >
        {/* Top Confirmation Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
            color: '#FFFFFF',
            padding: 'clamp(1.25rem, 3.5vw, 2rem) clamp(1.15rem, 3.5vw, 2.25rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                color: '#ECFDF5',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.28rem 0.85rem',
                borderRadius: '999px',
                marginBottom: '0.5rem',
              }}
            >
              ✓ Official Registration Confirmed
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Welcome, {confirmedReg.salutation} {confirmedReg.fullName}!
            </h3>
            <p style={{ fontSize: '0.94rem', color: '#D1FAE5', margin: '0.3rem 0 0' }}>
              Your seat for this session is confirmed. Save your Unique Participant ID below for
              1-click registration in all future ISTD Trichur events.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: '#A7F3D0',
              }}
            >
              Event Pass No.
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' }}>
              {confirmedReg.registrationCode}
            </div>
          </div>
        </div>

        <div style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem) clamp(1.15rem, 3.5vw, 2.25rem)' }}>
          {/* Highlighted Permanent Unique Participant ID Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0B2239 0%, #163E66 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.5rem 1.75rem',
              marginBottom: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              border: '1.5px solid #2563EB',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#FACC15',
                  marginBottom: '0.35rem',
                }}
              >
                <span>★ Your Permanent ISTD Participant ID (For Future Events)</span>
              </div>
              <div
                style={{
                  fontSize: '1.55rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  fontFamily: 'monospace',
                }}
              >
                {permanentId}
              </div>
              <p
                style={{
                  fontSize: '0.84rem',
                  color: '#CBD5E1',
                  margin: '0.35rem 0 0',
                  maxWidth: '560px',
                }}
              >
                Use this Unique ID (or your registered mobile number{' '}
                <strong>{confirmedReg.phone}</strong>) to auto-fill all your details in one click
                whenever you register for future ISTD Trichur Chapter programmes!
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyUniqueId}
              style={{
                background: copiedId ? '#10B981' : '#FACC15',
                color: copiedId ? '#FFFFFF' : '#0B2239',
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.86rem',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {copiedId ? '✓ Unique ID Copied!' : '📋 Copy Unique ID'}
            </button>
          </div>

          {/* Session Summary Card */}
          <div
            style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: '#1D4ED8',
                marginBottom: '0.25rem',
              }}
            >
              Registered Programme
            </div>
            <h4
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '0.35rem',
              }}
            >
              {confirmedReg.eventTitle}
            </h4>
            <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
              📅 {confirmedReg.eventDate} &nbsp;•&nbsp; 🕖 {confirmedReg.eventTime} &nbsp;•&nbsp; 💻{' '}
              {confirmedReg.eventVenue}
            </div>
          </div>

          {/* Participant Details Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              fontSize: '0.86rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                PARTICIPANT NAME
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {confirmedReg.salutation} {confirmedReg.fullName}
              </span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                DATE OF BIRTH
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>{confirmedReg.dob}</span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                EMAIL ADDRESS
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>{confirmedReg.email}</span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                PHONE / WHATSAPP
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {confirmedReg.phone} / {confirmedReg.whatsapp}
              </span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                DISTRICT &amp; STATE
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {confirmedReg.district}, {confirmedReg.state}
              </span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                ORGANISATION &amp; ROLE
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {confirmedReg.organization} ({confirmedReg.designation})
              </span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                CATEGORY &amp; EXPERIENCE
              </strong>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {confirmedReg.participantCategory} ({confirmedReg.experienceYears})
              </span>
            </div>
            <div>
              <strong style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
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
              color: '#334155',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '10px',
              padding: '0.9rem 1.15rem',
              marginBottom: '1.5rem',
            }}
          >
            <strong>Session Joining Link:</strong> The Google Meet link and reminder will be sent to
            your registered email (<strong>{confirmedReg.email}</strong>) and WhatsApp number (
            <strong>{confirmedReg.whatsapp}</strong>) ahead of the session.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-primary btn-sm"
            >
              🖨️ Print / Save Confirmation Pass (PDF)
            </button>
            <a
              href={`https://wa.me/919846101034?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-navy btn-sm"
            >
              💬 Share Pass on WhatsApp
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

  // ============================================================================
  // VIEW 2: USER-FRIENDLY PROFESSIONAL REGISTRATION FORM WITH 1-CLICK AUTO-FILL
  // ============================================================================
  return (
    <div
      id="eventRegistrationFormBox"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Top Executive Form Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B2239 0%, #163E66 100%)',
          color: '#FFFFFF',
          padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.15rem, 3.5vw, 2.25rem)',
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
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.24rem 0.75rem',
              borderRadius: '999px',
              background: 'rgba(250, 204, 21, 0.2)',
              color: '#FACC15',
              marginBottom: '0.45rem',
            }}
          >
            Online Participant Registration • Free Entry
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Register for {event.title}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#CBD5E1', margin: '0.3rem 0 0' }}>
            📅 {event.date} &nbsp;•&nbsp; 🕖 {event.timeIST} &nbsp;•&nbsp; 💻 {event.venue}
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '0.65rem 1rem',
            fontSize: '0.78rem',
            color: '#E2E8F0',
            lineHeight: 1.45,
          }}
        >
          <div style={{ fontWeight: 800, color: '#FACC15' }}>✓ Instant E-Pass &amp; Unique ID</div>
          <div>Receive your permanent ISTD Participant ID upon registration</div>
        </div>
      </div>

      <div style={{ padding: 'clamp(1.15rem, 3.5vw, 2rem) clamp(1rem, 3.5vw, 2.25rem)' }}>
        {/* ===================================================================
            RETURNING PARTICIPANT 1-CLICK AUTO-FILL BAR
           =================================================================== */}
        <div
          style={{
            background: '#EFF6FF',
            border: '1.5px solid #BFDBFE',
            borderRadius: '14px',
            padding: '1.25rem 1.35rem',
            marginBottom: '1.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  color: '#1E3A8A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>⚡ Returning Participant? Auto-Fill Your Details in 1 Click</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0.15rem 0 0' }}>
                Enter your <strong>Unique Participant ID</strong> (e.g.,{' '}
                <code>ISTD-PID-2026-1001</code>), <strong>Mobile Number</strong>, or{' '}
                <strong>Email</strong> from a previous registration:
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {savedBrowserProfile && (
                <button
                  type="button"
                  onClick={() => applyParticipantProfile(savedBrowserProfile)}
                  style={{
                    background: '#047857',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.32rem 0.8rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ✨ Auto-Fill as {savedBrowserProfile.fullName} (
                  {savedBrowserProfile.participantCode || 'Saved ID'})
                </button>
              )}
              <button
                type="button"
                onClick={() => handleLookupAutoFill('ISTD-PID-2026-1001')}
                style={{
                  background: '#FFFFFF',
                  color: '#1D4ED8',
                  border: '1px solid #93C5FD',
                  borderRadius: '999px',
                  padding: '0.32rem 0.75rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Try Sample ID: ISTD-PID-2026-1001
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.65rem',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Unique ID (ISTD-PID-2026-XXXX), Mobile Number, or Email..."
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLookupAutoFill();
                }
              }}
              style={{
                flex: 1,
                minWidth: 'min(100%, 240px)',
                background: '#FFFFFF',
                borderColor: '#93C5FD',
                fontSize: '0.88rem',
              }}
            />
            <button
              type="button"
              onClick={() => handleLookupAutoFill()}
              disabled={lookupLoading}
              className="btn btn-primary btn-sm"
              style={{ padding: '0.65rem 1.25rem', fontWeight: 700 }}
            >
              {lookupLoading ? 'Searching...' : '⚡ Auto-Fill Details'}
            </button>
          </div>

          {lookupBanner && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: lookupBanner.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                border: `1px solid ${
                  lookupBanner.type === 'success' ? '#6EE7B7' : '#FECACA'
                }`,
                color: lookupBanner.type === 'success' ? '#065F46' : '#B91C1C',
              }}
            >
              {lookupBanner.message}
            </div>
          )}
        </div>

        {errorMsg && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              padding: '0.9rem 1.15rem',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* =================================================================
              STEP 1: PERSONAL & CONTACT DETAILS
             ================================================================= */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '1.35rem 1.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#1D4ED8',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                1
              </span>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Personal &amp; Contact Information
              </h4>
            </div>

            <div
              style={{
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
                <label className="form-label">Full Name (For Certificate) *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Date of Birth (Optional)</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
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
                <label className="form-label">Mobile / Phone Number *</label>
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
                      color: '#1D4ED8',
                      fontWeight: 700,
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
                    Same as Mobile
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
          </div>

          {/* =================================================================
              STEP 2: PROFESSIONAL / ACADEMIC & LOCATION PROFILE
             ================================================================= */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '1.35rem 1.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#1D4ED8',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                2
              </span>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Professional / Academic &amp; Location Details
              </h4>
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
                  <option value="Entrepreneur / Business Leader">
                    Entrepreneur / Business Leader
                  </option>
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
                  placeholder="e.g., CTO / HR Manager / Faculty / B.Tech"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
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
                  placeholder="e.g., Trichur"
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

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
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
                <label className="form-label">ISTD Membership Status</label>
                <select
                  className="form-control"
                  value={isIstdMember}
                  onChange={(e) => setIsIstdMember(e.target.value)}
                >
                  <option value="No">Non-Member</option>
                  <option value="Yes">Existing ISTD Member</option>
                  <option value="Interested in Joining ISTD">
                    Interested in Joining ISTD
                  </option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">How did you hear about this session?</label>
                <select
                  className="form-control"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="WhatsApp Group">WhatsApp Group / Status</option>
                  <option value="ISTD Member Referral">ISTD Chapter Member Referral</option>
                  <option value="ISTD Website">ISTD Trichur Website</option>
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
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #E2E8F0',
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
                    placeholder="e.g., Trichur / Kochi / Trivandrum"
                    value={istdChapterName}
                    onChange={(e) => setIstdChapterName(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* =================================================================
              STEP 3: PREFERENCES & SECURITY VERIFICATION
             ================================================================= */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '1.35rem 1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#1D4ED8',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </span>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Questions for Speaker, E-Certificate &amp; Verification
              </h4>
            </div>

            <div className="form-group" style={{ marginBottom: '0.9rem' }}>
              <label className="form-label">
                Questions or Topics for the Speaker (Optional)
              </label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Any specific question or area you would like addressed during the session?"
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
                style={{ minHeight: '72px' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0F172A',
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

            <CaptchaChallenge
              onVerifyChange={setCaptchaVerified}
              resetSignal={captchaReset}
              label="Security Verification Code *"
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              style={{
                background: '#FEF2F2',
                border: '1.5px solid #EF4444',
                color: '#B91C1C',
                padding: '0.9rem 1.15rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          <div
            style={{
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
              style={{
                minWidth: 'min(100%, 280px)',
                padding: '0.95rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 800,
              }}
            >
              {submitting ? 'Completing Registration...' : 'Complete Event Registration →'}
            </button>
            <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>
              🔒 Instant confirmation pass + Permanent Unique Participant ID generated on submit.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
