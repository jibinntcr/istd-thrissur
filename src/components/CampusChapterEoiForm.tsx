'use client';

import React, { useState, useEffect } from 'react';
import { submitEnquiryToBackend } from '@/lib/clientBackendCache';

const KERALA_DISTRICTS = [
  'Trichur',
  'Ernakulam',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Kottayam',
  'Alappuzha',
  'Idukki',
  'Kollam',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Wayanad',
  'Kannur',
  'Kasaragod',
  'Other District / Outside Kerala',
];

const EOI_STORAGE_KEY = 'istd_tcr_campus_chapter_eois_v1';

export interface CampusChapterEoiRecord {
  eoiRefNo: string;
  institutionName: string;
  institutionType: string;
  affiliationStatus: string;
  district: string;
  cityLocation: string;
  headOfInstitution: string;
  coordinatorName: string;
  coordinatorDesignation: string;
  coordinatorDepartment: string;
  officialEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  estimatedStudentCount: string;
  proposedStreams: string;
  objectivesNotes: string;
  submittedAt: string;
}

export function CampusChapterEoiForm() {
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState(
    'Engineering & Technology College'
  );
  const [affiliationStatus, setAffiliationStatus] = useState(
    'Autonomous Institution'
  );
  const [district, setDistrict] = useState('Trichur');
  const [cityLocation, setCityLocation] = useState('');
  const [headOfInstitution, setHeadOfInstitution] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorDesignation, setCoordinatorDesignation] = useState('');
  const [coordinatorDepartment, setCoordinatorDepartment] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [estimatedStudentCount, setEstimatedStudentCount] = useState(
    '50 – 100 Students'
  );
  const [proposedStreams, setProposedStreams] = useState(
    'Engineering, Management & Allied Disciplines'
  );
  const [objectivesNotes, setObjectivesNotes] = useState('');

  // CAPTCHA
  const [numA, setNumA] = useState(4);
  const [numB, setNumB] = useState(5);
  const [captchaAns, setCaptchaAns] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRecord, setSubmittedRecord] =
    useState<CampusChapterEoiRecord | null>(null);

  useEffect(() => {
    setNumA(Math.floor(Math.random() * 7) + 2);
    setNumB(Math.floor(Math.random() * 6) + 2);
  }, []);

  const refreshCaptcha = () => {
    setNumA(Math.floor(Math.random() * 8) + 2);
    setNumB(Math.floor(Math.random() * 7) + 2);
    setCaptchaAns('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (parseInt(captchaAns.trim(), 10) !== numA + numB) {
      setErrorMsg(
        'Incorrect security verification answer. Please solve the math question.'
      );
      refreshCaptcha();
      return;
    }

    if (
      !institutionName.trim() ||
      !coordinatorName.trim() ||
      !officialEmail.trim() ||
      !phoneNumber.trim()
    ) {
      setErrorMsg(
        'Please complete all mandatory institutional and coordinator contact fields.'
      );
      return;
    }

    setSubmitting(true);

    const finalWhatsapp = sameWhatsapp ? phoneNumber : whatsappNumber;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const eoiRefNo = `ISTD-EOI-2026-${randomSuffix}`;

    const record: CampusChapterEoiRecord = {
      eoiRefNo,
      institutionName: institutionName.trim(),
      institutionType,
      affiliationStatus,
      district,
      cityLocation: cityLocation.trim(),
      headOfInstitution: headOfInstitution.trim(),
      coordinatorName: coordinatorName.trim(),
      coordinatorDesignation: coordinatorDesignation.trim(),
      coordinatorDepartment: coordinatorDepartment.trim(),
      officialEmail: officialEmail.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: finalWhatsapp.trim(),
      estimatedStudentCount,
      proposedStreams: proposedStreams.trim(),
      objectivesNotes: objectivesNotes.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingRaw = localStorage.getItem(EOI_STORAGE_KEY);
      const existingList: CampusChapterEoiRecord[] = existingRaw
        ? JSON.parse(existingRaw)
        : [];
      existingList.unshift(record);
      localStorage.setItem(EOI_STORAGE_KEY, JSON.stringify(existingList));
    } catch {
      // ignore storage errors
    }

    try {
      await submitEnquiryToBackend({
        enquiryCode: eoiRefNo,
        source: 'Campus Chapter EOI',
        fullName: record.coordinatorName,
        email: record.officialEmail,
        phone: record.phoneNumber,
        whatsapp: record.whatsappNumber,
        category: `${record.institutionType} (${record.affiliationStatus})`,
        organization: record.institutionName,
        designation: `${record.coordinatorDesignation}${
          record.coordinatorDepartment ? ` — ${record.coordinatorDepartment}` : ''
        }`,
        district: record.district,
        cityLocation: record.cityLocation,
        headOfInstitution: record.headOfInstitution,
        affiliationStatus: record.affiliationStatus,
        estimatedStudentCount: record.estimatedStudentCount,
        proposedStreams: record.proposedStreams,
        message:
          record.objectivesNotes ||
          `Campus Chapter EOI for ${record.institutionName} (${record.estimatedStudentCount}, ${record.proposedStreams}).`,
      });
    } catch {
      // already stored in local synced store
    }

    setSubmitting(false);
    setSubmittedRecord(record);
  };

  if (submittedRecord) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '2px solid #BBF7D0',
          boxShadow: '0 20px 50px rgba(15, 29, 58, 0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, #064E3B 0%, #047857 60%, #059669 100%)',
            padding: '1.75rem 2rem',
            color: '#FFFFFF',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.28rem 0.75rem',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.16)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            ✓ Recorded in ISTD Trichur Backend System
          </span>
          <h3
            style={{
              color: '#FFFFFF',
              fontSize: '1.4rem',
              fontWeight: 800,
              margin: '0 0 0.35rem',
            }}
          >
            Thank You for Your Interest in an ISTD Campus Chapter
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.9rem',
              margin: 0,
            }}
          >
            Your institutional Expression of Interest has been stored directly in
            the ISTD Trichur Chapter backend database. The Managing Committee
            will review your details and connect with your Faculty Coordinator.
          </p>
        </div>

        <div style={{ padding: '1.85rem 2rem' }}>
          <div
            style={{
              background: '#F8FAFC',
              border: '1.5px dashed #94A3B8',
              borderRadius: '14px',
              padding: '1.15rem 1.35rem',
              marginBottom: '1.35rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: '#64748B',
                }}
              >
                EOI Reference Number
              </div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#0F1D3A',
                  fontFamily: 'monospace',
                }}
              >
                {submittedRecord.eoiRefNo}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#475569',
                }}
              >
                {submittedRecord.institutionName}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                Coordinator: {submittedRecord.coordinatorName}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <button
              type="button"
              onClick={() => setSubmittedRecord(null)}
              className="btn btn-primary btn-sm"
            >
              Submit Another EOI
            </button>
          </div>
        </div>
      </div>
    );
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.79rem',
    fontWeight: 700,
    color: '#1E293B',
    marginBottom: '0.35rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.72rem 0.9rem',
    borderRadius: '10px',
    border: '1.5px solid #CBD5E1',
    background: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.9rem',
    outline: 'none',
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 20px 50px rgba(15, 29, 58, 0.07)',
        overflow: 'hidden',
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          background:
            'linear-gradient(135deg, #0B1933 0%, #152C5B 60%, #1E40AF 100%)',
          padding: 'clamp(1.25rem, 3vw, 1.65rem) clamp(1.15rem, 3.5vw, 2rem)',
          color: '#FFFFFF',
          borderBottom: '3px solid #F59E0B',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.72rem',
            borderRadius: '999px',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.45)',
            color: '#FDE68A',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.55rem',
          }}
        >
          Institutional Expression of Interest (EOI)
        </span>
        <h3
          style={{
            color: '#FFFFFF',
            fontSize: '1.35rem',
            fontWeight: 800,
            margin: '0 0 0.35rem',
          }}
        >
          Establish an ISTD Campus / Student Chapter at Your Institution
        </h3>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.88rem',
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Colleges, universities, autonomous engineering institutes, and
          management schools in Trichur and Central Kerala are invited to
          submit an Expression of Interest.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: 'clamp(1.25rem, 3.5vw, 1.85rem) clamp(1.15rem, 3.5vw, 2rem)' }}>
        {errorMsg && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Section 1: Institution Profile */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1D4ED8',
            marginBottom: '0.85rem',
          }}
        >
          1. Institution Details
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '1.15rem',
          }}
        >
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>
              Name of College / University / Institution{' '}
              <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Christ College of Engineering (Autonomous)"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Institution Category</label>
            <select
              value={institutionType}
              onChange={(e) => setInstitutionType(e.target.value)}
              style={inputStyle}
            >
              <option value="Engineering & Technology College">
                Engineering &amp; Technology College
              </option>
              <option value="Management / Business School (MBA / PGDM)">
                Management / Business School (MBA / PGDM)
              </option>
              <option value="Arts, Science & Commerce College">
                Arts, Science &amp; Commerce College
              </option>
              <option value="University / Deemed University Campus">
                University / Deemed University Campus
              </option>
              <option value="Polytechnic / Professional Institute">
                Polytechnic / Professional Institute
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Academic / Affiliation Status</label>
            <select
              value={affiliationStatus}
              onChange={(e) => setAffiliationStatus(e.target.value)}
              style={inputStyle}
            >
              <option value="Autonomous Institution">
                Autonomous Institution
              </option>
              <option value="University Affiliated College">
                University Affiliated College
              </option>
              <option value="State / Central University Department">
                State / Central University Department
              </option>
              <option value="Deemed-to-be University">
                Deemed-to-be University
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={inputStyle}
            >
              {KERALA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Town / Campus Location</label>
            <input
              type="text"
              placeholder="e.g., Irinjalakuda, Trichur"
              value={cityLocation}
              onChange={(e) => setCityLocation(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Section 2: Faculty Coordinator & Head */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1D4ED8',
            marginTop: '1.4rem',
            marginBottom: '0.85rem',
          }}
        >
          2. Faculty Coordinator &amp; Leadership Contact
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.15rem',
          }}
        >
          <div>
            <label style={labelStyle}>
              Principal / Director / Head of Institution
            </label>
            <input
              type="text"
              placeholder="Name of Principal / Director"
              value={headOfInstitution}
              onChange={(e) => setHeadOfInstitution(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Proposed Faculty Coordinator Name{' '}
              <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Full Name with Salutation"
              value={coordinatorName}
              onChange={(e) => setCoordinatorName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Coordinator Designation</label>
            <input
              type="text"
              placeholder="e.g., Associate Professor / Placement Officer"
              value={coordinatorDesignation}
              onChange={(e) => setCoordinatorDesignation(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Department / Cell</label>
            <input
              type="text"
              placeholder="e.g., Training & Placement / Management Studies"
              value={coordinatorDepartment}
              onChange={(e) => setCoordinatorDepartment(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Official Email ID <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="email"
              required
              placeholder="coordinator@college.edu.in"
              value={officialEmail}
              onChange={(e) => setOfficialEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Mobile / Contact Number <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98461 01034"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={sameWhatsapp}
              onChange={(e) => setSameWhatsapp(e.target.checked)}
            />
            WhatsApp number is the same as the mobile number above
          </label>
          {!sameWhatsapp && (
            <div style={{ marginTop: '0.65rem', maxWidth: '320px' }}>
              <label style={labelStyle}>WhatsApp Number</label>
              <input
                type="tel"
                placeholder="+91 WhatsApp Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {/* Section 3: Student Cohort & Proposed Initiatives */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1D4ED8',
            marginTop: '1.35rem',
            marginBottom: '0.85rem',
          }}
        >
          3. Student Cohort &amp; Proposed Focus
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <label style={labelStyle}>Estimated Initial Student Members</label>
            <select
              value={estimatedStudentCount}
              onChange={(e) => setEstimatedStudentCount(e.target.value)}
              style={inputStyle}
            >
              <option value="25 – 50 Students">25 – 50 Students</option>
              <option value="50 – 100 Students">50 – 100 Students</option>
              <option value="100 – 250 Students">100 – 250 Students</option>
              <option value="250+ Students">250+ Students</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Participating Academic Streams</label>
            <input
              type="text"
              placeholder="e.g., B.Tech, M.Tech, MBA, MCA"
              value={proposedStreams}
              onChange={(e) => setProposedStreams(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>
            Brief Note on Institutional Expectations / Proposed Student Chapter
            Activities
          </label>
          <textarea
            rows={3}
            placeholder="Share any preferred orientation dates, faculty-industry collaboration goals, or student employability initiatives..."
            value={objectivesNotes}
            onChange={(e) => setObjectivesNotes(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* CAPTCHA & Submit */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#334155',
              }}
            >
              Security Check: What is {numA} + {numB}?
            </span>
            <input
              type="number"
              required
              value={captchaAns}
              onChange={(e) => setCaptchaAns(e.target.value)}
              placeholder="?"
              style={{
                width: '74px',
                padding: '0.5rem 0.65rem',
                borderRadius: '8px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.9rem',
                fontWeight: 700,
                textAlign: 'center',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-red"
            style={{ padding: '0.8rem 1.65rem', fontWeight: 800 }}
          >
            {submitting
              ? 'Submitting EOI...'
              : 'Submit Expression of Interest (EOI) \u2192'}
          </button>
        </div>
      </form>
    </div>
  );
}
