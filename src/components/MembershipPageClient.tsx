'use client';

import React, { useState, useEffect } from 'react';
import { MembershipForm } from '@/components/MembershipForm';
import { OFFICIAL_LINKS } from '@/data/siteData';

export function MembershipPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Individual (Life)');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat === 'Individual' || cat === 'Individual (Life)') {
      setSelectedCategory('Individual (Life)');
    } else if (cat === 'Individual (Annual)' || cat === 'Annual') {
      setSelectedCategory('Individual (Annual)');
    } else if (
      cat === 'Student' ||
      cat === 'Associate' ||
      cat === 'Associate (Student)'
    ) {
      setSelectedCategory('Associate (Student)');
    } else if (cat === 'Institutional') {
      setSelectedCategory('Institutional');
    }
  }, []);

  const handleSelectAndScroll = (category: string) => {
    setSelectedCategory(category);
    const formEl = document.getElementById('membershipEnquiry');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Quick Section Jump Links + Direct Official Registration CTA */}
      <div
        style={{
          background: 'var(--color-surface-soft)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.9rem 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red btn-sm"
          >
            Register Online on ISTD Portal ↗
          </a>
          <a href="#membershipCategories" className="btn btn-outline-navy btn-sm">
            Member Categories
          </a>
          <a href="#membershipFees" className="btn btn-outline-navy btn-sm">
            Official Fee Schedule (New &amp; Renewal)
          </a>
          <a href="#eligibilitySection" className="btn btn-outline-navy btn-sm">
            Eligibility Norms
          </a>
          <a href="#membershipBenefits" className="btn btn-outline-navy btn-sm">
            Membership Benefits
          </a>
          <a href="#membershipEnquiry" className="btn btn-outline-blue btn-sm">
            Trichur Chapter Enquiry
          </a>
        </div>
      </div>

      {/* Direct Official Registration Callout Banner */}
      <section
        className="section-padding-sm bg-white"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container">
          <div
            style={{
              background:
                'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
              borderRadius: '18px',
              padding: '2rem 2.25rem',
              color: '#ffffff',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.25)',
            }}
          >
            <div style={{ flex: '1 1 520px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.28rem 0.78rem',
                  borderRadius: '999px',
                  background: 'rgba(254, 240, 138, 0.16)',
                  border: '1px solid rgba(254, 240, 138, 0.45)',
                  color: '#fde047',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  marginBottom: '0.65rem',
                }}
              >
                Official ISTD National Portal • Verified Guidelines
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.35rem, 2.3vw, 1.75rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 0.55rem 0',
                  lineHeight: 1.25,
                }}
              >
                Apply Directly on the Official ISTD Registration Portal
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  color: 'rgba(241, 245, 249, 0.92)',
                  textAlign: 'justify',
                }}
              >
                All membership categories, eligibility norms, benefits, and fee
                schedules below are reproduced directly from the official{' '}
                <strong style={{ color: '#ffffff' }}>
                  Indian Society for Training &amp; Development (ISTD, New
                  Delhi)
                </strong>{' '}
                website (
                <a
                  href={OFFICIAL_LINKS.istdNationalMembership}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#93c5fd', textDecoration: 'underline' }}
                >
                  istd.in/member-categories
                </a>
                ). Prospective members can complete their online registration
                directly at{' '}
                <strong style={{ color: '#fde047' }}>
                  istd.co.in/register/member
                </strong>{' '}
                or contact the ISTD Trichur Chapter office bearers for local
                onboarding assistance.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                minWidth: '250px',
              }}
            >
              <a
                href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red"
                style={{ justifyContent: 'center', textAlign: 'center' }}
              >
                Apply Online at istd.co.in ↗
              </a>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href={OFFICIAL_LINKS.istdMemberLoginPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Member Login ↗
                </a>
                <a
                  href={OFFICIAL_LINKS.istdFeeNewMembers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Official Tariff ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Official Membership Categories */}
      <section className="section-padding bg-white" id="membershipCategories">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">
              01 • Official ISTD Categories
            </span>
            <h2 className="section-title">Categories of Membership</h2>
            <p className="section-subtitle">
              As per the ISTD National Council (
              <a
                href={OFFICIAL_LINKS.istdNationalMembership}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                istd.in/member-categories
              </a>
              ), ISTD awards <strong>4 types of membership</strong>: Individual
              Membership (divided into <em>Life Member</em>,{' '}
              <em>Annual Member</em>, and{' '}
              <em>Associate Member – for students</em>), Institutional
              Membership, Honorary Membership / Presidents Emeritus, and Fellow
              Members.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {/* Card 1: Individual — Life Member */}
            <div
              className={`program-card ${
                selectedCategory === 'Individual (Life)' ? 'featured' : ''
              }`}
              id="catIndividualLife"
              style={{
                padding: '1.75rem 1.5rem',
                borderTop:
                  selectedCategory === 'Individual (Life)'
                    ? '4px solid var(--accent-red)'
                    : '4px solid var(--accent-blue)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.55rem',
                  }}
                >
                  <span className="program-duration" style={{ marginBottom: 0 }}>
                    Individual • Type 1
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: '#EFF6FF',
                      color: '#1E3A8A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      border: '1px solid #BFDBFE',
                    }}
                  >
                    ₹9,204/- (Incl. GST)
                  </span>
                </div>
                <h3 className="program-title" style={{ fontSize: '1.25rem' }}>
                  Individual — Life Member
                </h3>
                <p
                  className="program-description"
                  style={{ textAlign: 'justify' }}
                >
                  For individuals engaged or interested in Training &amp;
                  Development who are at least <strong>21 years of age</strong>{' '}
                  and hold a <strong>graduate degree</strong> from a recognised
                  university or its equivalent. Entitles the member to a{' '}
                  <strong>Photo Identity Card as a Life Member</strong>,{' '}
                  <strong>Certificate of Life Membership</strong>, and voting /
                  contesting rights in ISTD annual elections.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-red btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Register on ISTD Portal ↗
                </a>
                <button
                  type="button"
                  className="btn btn-outline-navy btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSelectAndScroll('Individual (Life)')}
                >
                  {selectedCategory === 'Individual (Life)'
                    ? '✓ Selected for Chapter Enquiry'
                    : 'Enquire via Trichur Chapter'}
                </button>
              </div>
            </div>

            {/* Card 2: Individual — Annual Member */}
            <div
              className={`program-card ${
                selectedCategory === 'Individual (Annual)' ? 'featured' : ''
              }`}
              id="catIndividualAnnual"
              style={{
                padding: '1.75rem 1.5rem',
                borderTop:
                  selectedCategory === 'Individual (Annual)'
                    ? '4px solid var(--accent-red)'
                    : '4px solid var(--accent-blue)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.55rem',
                  }}
                >
                  <span className="program-duration" style={{ marginBottom: 0 }}>
                    Individual • Type 2
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: '#EFF6FF',
                      color: '#1E3A8A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      border: '1px solid #BFDBFE',
                    }}
                  >
                    ₹1,534/- (April–March)
                  </span>
                </div>
                <h3 className="program-title" style={{ fontSize: '1.25rem' }}>
                  Individual — Annual Member
                </h3>
                <p
                  className="program-description"
                  style={{ textAlign: 'justify' }}
                >
                  Annual membership (April–March) for individuals aged{' '}
                  <strong>at least 21 years</strong> holding a{' '}
                  <strong>degree of a recognised university</strong> or
                  equivalent and engaged or interested in Training &amp;
                  Development. Annual renewal is <strong>₹1,180/-</strong> (incl.
                  18% GST), and the annual subscription can be commuted to a
                  Life Subscription at any time.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-red btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Register on ISTD Portal ↗
                </a>
                <button
                  type="button"
                  className="btn btn-outline-navy btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSelectAndScroll('Individual (Annual)')}
                >
                  {selectedCategory === 'Individual (Annual)'
                    ? '✓ Selected for Chapter Enquiry'
                    : 'Enquire via Trichur Chapter'}
                </button>
              </div>
            </div>

            {/* Card 3: Associate Member (For Students) */}
            <div
              className={`program-card ${
                selectedCategory === 'Associate (Student)' ? 'featured' : ''
              }`}
              id="catAssociate"
              style={{
                padding: '1.75rem 1.5rem',
                borderTop:
                  selectedCategory === 'Associate (Student)'
                    ? '4px solid var(--accent-red)'
                    : '4px solid var(--accent-blue)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.55rem',
                  }}
                >
                  <span className="program-duration" style={{ marginBottom: 0 }}>
                    Individual • Type 3 (Students)
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: '#EFF6FF',
                      color: '#1E3A8A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      border: '1px solid #BFDBFE',
                    }}
                  >
                    ₹826/- (April–March)
                  </span>
                </div>
                <h3 className="program-title" style={{ fontSize: '1.25rem' }}>
                  Associate Member (For Students)
                </h3>
                <p
                  className="program-description"
                  style={{ textAlign: 'justify' }}
                >
                  Official ISTD student &amp; entry-level membership for a
                  person enrolled by the National Council who in some manner
                  falls short of the full eligibility criteria of regular
                  membership and is preparing for a career in Training &amp;
                  Development. Minimum age: <strong>18 years</strong>.{' '}
                  <em>
                    (Associate members do not hold voting/contesting rights.)
                  </em>
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-red btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Register on ISTD Portal ↗
                </a>
                <button
                  type="button"
                  className="btn btn-outline-navy btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSelectAndScroll('Associate (Student)')}
                >
                  {selectedCategory === 'Associate (Student)'
                    ? '✓ Selected for Chapter Enquiry'
                    : 'Enquire via Trichur Chapter'}
                </button>
              </div>
            </div>

            {/* Card 4: Institutional Member */}
            <div
              className={`program-card ${
                selectedCategory === 'Institutional' ? 'featured' : ''
              }`}
              id="catInstitutional"
              style={{
                padding: '1.75rem 1.5rem',
                borderTop:
                  selectedCategory === 'Institutional'
                    ? '4px solid var(--accent-red)'
                    : '4px solid var(--accent-blue)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.55rem',
                  }}
                >
                  <span className="program-duration" style={{ marginBottom: 0 }}>
                    Organisations &amp; Bodies
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: '#EFF6FF',
                      color: '#1E3A8A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      border: '1px solid #BFDBFE',
                    }}
                  >
                    ₹15,340/- Annual
                  </span>
                </div>
                <h3 className="program-title" style={{ fontSize: '1.25rem' }}>
                  Institutional Member
                </h3>
                <p
                  className="program-description"
                  style={{ textAlign: 'justify' }}
                >
                  Open to any Government agency, corporation (statutory or
                  otherwise), organisation, or Association (whether incorporated
                  or not) which subscribes to and is interested in the
                  furtherance of the objectives of ISTD. Entitles the
                  institution to nominate <strong>2 nominees</strong> for
                  membership benefits against the basic subscription.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-red btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Register on ISTD Portal ↗
                </a>
                <button
                  type="button"
                  className="btn btn-outline-navy btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSelectAndScroll('Institutional')}
                >
                  {selectedCategory === 'Institutional'
                    ? '✓ Selected for Chapter Enquiry'
                    : 'Enquire via Trichur Chapter'}
                </button>
              </div>
            </div>
          </div>

          {/* Honorary & Fellow Membership Note (Categories 3 & 4 per istd.in) */}
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1.35rem 1.6rem',
              borderRadius: '14px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #1e3a8a',
            }}
          >
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 0.4rem 0',
              }}
            >
              Honorary Membership / Presidents Emeritus &amp; Fellow Members (By
              National Council Nomination)
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#475569',
                lineHeight: 1.65,
                textAlign: 'justify',
              }}
            >
              In addition to Individual and Institutional memberships, ISTD
              awards <strong>Honorary Membership / Presidents Emeritus</strong>{' '}
              and <strong>Fellow Memberships</strong>. An Honorary Member is a
              person nominated by the National Council at the time of the Annual
              General Meeting (reporting to the AGM) who has distinguished
              himself/herself in the field of training and development after
              working in the field for a period of at least{' '}
              <strong>15 years</strong> and whose association with ISTD is
              considered invaluable. (Honorary members are not entitled to
              vote/contest in annual elections.)
            </p>
          </div>
        </div>
      </section>

      {/* 2. Official Fee Structure (New Members & Renewal) */}
      <section className="section-padding bg-pale-blue" id="membershipFees">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">
              02 • Official ISTD Fee Schedule
            </span>
            <h2 className="section-title">
              Membership Fees (New Members &amp; Renewal)
            </h2>
            <p className="section-subtitle">
              Official fee tariff published by the Indian Society for Training
              &amp; Development, New Delhi (
              <a
                href={OFFICIAL_LINKS.istdFeeNewMembers}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                New Members Tariff ↗
              </a>{' '}
              &bull;{' '}
              <a
                href={OFFICIAL_LINKS.istdFeeRenewal}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                Renewal Tariff ↗
              </a>
              ).
            </p>
          </div>

          {/* Table 1: New Members Fee Schedule */}
          <div
            className="CleanCard"
            style={{ marginBottom: '1.75rem', overflowX: 'auto' }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <span className="section-tag tag-blue">
                  New Member Registration
                </span>
                <h3
                  style={{
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                    margin: 0,
                  }}
                >
                  Fee Schedule for New Members
                </h3>
              </div>
              <a
                href={OFFICIAL_LINKS.istdFeeNewMembers}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-navy btn-sm"
              >
                Source: istd.in/membership-fees-new-members ↗
              </a>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.92rem',
                minWidth: '640px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    textAlign: 'left',
                  }}
                >
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Membership Type
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Sub-Category / Duration
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Entrance Fee (₹)
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Subscription Fee (₹)
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    GST 18% (₹)
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>
                    Total Fee (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Individual Member
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    Annual (April–March)
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>300/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>1,000/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>234/-</td>
                  <td
                    style={{
                      padding: '0.85rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    1,534/-
                  </td>
                </tr>
                <tr
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    background: '#f8fafc',
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Individual Member
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>Life Membership</td>
                  <td style={{ padding: '0.85rem 1rem' }}>300/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>7,500/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>1,404/-</td>
                  <td
                    style={{
                      padding: '0.85rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    9,204/-
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Associate Member (Students)
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    Annual (April–March)
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>300/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>400/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>126/-</td>
                  <td
                    style={{
                      padding: '0.85rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    826/-
                  </td>
                </tr>
                <tr
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    background: '#f8fafc',
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Institutional Member
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    Annual (April–March) — Includes 2 Nominees
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>3,000/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>10,000/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>2,340/-</td>
                  <td
                    style={{
                      padding: '0.85rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    15,340/-
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    Institutional Member
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    Conversion Fee from Annual Membership to Life Membership
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>3,000/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>75,000/-</td>
                  <td style={{ padding: '0.85rem 1rem' }}>14,040/-</td>
                  <td
                    style={{
                      padding: '0.85rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    92,040/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Renewal Fee Schedule */}
          <div className="CleanCard" style={{ overflowX: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <span className="section-tag tag-yellow">
                  Annual Membership Renewal
                </span>
                <h3
                  style={{
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                    margin: 0,
                  }}
                >
                  Membership Fee (Renewal)
                </h3>
              </div>
              <a
                href={OFFICIAL_LINKS.istdFeeRenewal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-navy btn-sm"
              >
                Source: istd.in/membership-fee-renewal ↗
              </a>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.92rem',
                minWidth: '540px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#1e293b',
                    color: '#ffffff',
                    textAlign: 'left',
                  }}
                >
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    Membership Type
                  </th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    Duration
                  </th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    Subscription Fee (₹)
                  </th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    GST 18% (₹)
                  </th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 800 }}>
                    Total Renewal Fee with GST (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    Individual Member
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>
                    Annual (April–March)
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>1,000/-</td>
                  <td style={{ padding: '0.8rem 1rem' }}>180/-</td>
                  <td
                    style={{
                      padding: '0.8rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    1,180/-
                  </td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 700 }}>
                    Institutional Member
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>
                    Annual (April–March)
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>10,000/-</td>
                  <td style={{ padding: '0.8rem 1rem' }}>1,800/-</td>
                  <td
                    style={{
                      padding: '0.8rem 1rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                    }}
                  >
                    11,800/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Detailed Eligibility Norms */}
      <section className="section-padding bg-white" id="eligibilitySection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">
              03 • Constitutional Criteria
            </span>
            <h2 className="section-title">Official Eligibility Criteria</h2>
            <p className="section-subtitle">
              Exact eligibility definitions as prescribed by the National
              Council of the Indian Society for Training &amp; Development (
              <a
                href={OFFICIAL_LINKS.istdNationalMembership}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                istd.in/member-categories
              </a>
              ).
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="CleanCard">
              <span className="section-tag tag-blue">
                Individual Member (Life / Annual)
              </span>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  marginBottom: '0.55rem',
                }}
              >
                Graduates Engaged in Training &amp; Development
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.68,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                A person enrolled by the National Council who is engaged or
                interested in the field of Training and Development, is{' '}
                <strong>at least 21 years of age</strong>, and is a{' '}
                <strong>graduate of a recognised university</strong> or its
                equivalent. The National Council may at its discretion reduce
                the eligibility age of membership of the Society by 1 year for
                those engaged as trainers and developers.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">Institutional Member</span>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  marginBottom: '0.55rem',
                }}
              >
                Corporate, Government &amp; Academic Bodies
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.68,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                A body enrolled by the National Council—any Government agency,
                body of corporation (statutory or otherwise), organisation, or
                Association (whether incorporated or not)—which subscribes to
                and is interested in the furtherance of the objectives of the
                Society. Each Institutional Member is entitled to nominate{' '}
                <strong>2 nominees</strong> for membership benefits against the
                basic membership subscription.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">
                Associate Member (For Students)
              </span>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  marginBottom: '0.55rem',
                }}
              >
                Students &amp; Aspiring L&amp;D Professionals
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.68,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                A person enrolled by the National Council who in some manner
                falls short of the eligibility criteria of regular membership
                and is preparing himself/herself for a career in the field of
                training and development.{' '}
                <strong>18 years is the minimum age</strong> for an Associate
                Member.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Official Membership Benefits */}
      <section className="section-padding bg-pale-blue" id="membershipBenefits">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">04 • Official Benefits</span>
            <h2 className="section-title">Membership Benefits</h2>
            <p className="section-subtitle">
              Members derive the benefit of networking with co-professionals in
              the field across India and abroad, alongside the following
              documented privileges on{' '}
              <a
                href={OFFICIAL_LINKS.istdNationalMembership}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                istd.in
              </a>
              :
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="CleanCard">
              <span className="section-tag tag-blue">
                All-India &amp; Global Exchange
              </span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                Professional Networking &amp; Idea Exchange
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Keep up-to-date with the latest developments, experiments, and
                experiences of professionals across India; participate in an
                All-India forum for exchange of ideas, views, and information;
                and secure support of experienced professionals in specific
                training &amp; development tasks.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">
                Conventions &amp; IFTDO
              </span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                National Conventions &amp; IFTDO Conferences
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Participate in ISTD National Conventions, Seminars, and Training
                Programmes at concessional fees, as well as international
                Conferences of <strong>IFTDO</strong> (International Federation
                of Training &amp; Development Organisations) at concessional
                rates.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">
                Publications &amp; Resources
              </span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                ISTD News, IJTD &amp; Library Access
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Receive <strong>ISTD News</strong> (the quarterly Newsletter on
                the Society’s activities), receive other ISTD publications
                (including <em>IJTD</em>) at special discounts, and access the
                activities, library, research, and training materials of the
                Society and its chapters.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-blue">
                Governance &amp; Life Privileges
              </span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                Voting Rights &amp; Life Member Credentials
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                <strong>Individual, Institutional, and Life Members</strong> are
                entitled to vote and contest in the annual elections of ISTD
                (subject to validity). Life Membership entitles Individual
                members to a <strong>Photo Identity Card as a Life Member</strong>{' '}
                and a <strong>Certificate of Life Membership</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How to Apply */}
      <section className="section-padding bg-white" id="howToApply">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">
              05 • Registration Process
            </span>
            <h2 className="section-title">How to Take ISTD Membership</h2>
            <p className="section-subtitle">
              Complete your membership registration directly on the official
              ISTD portal or reach out to the ISTD Trichur Chapter for guidance.
            </p>
          </div>

          <div className="grid-3">
            <div className="CleanCard">
              <span className="section-tag tag-blue">Step 1</span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                Open Official Registration Portal
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                  textAlign: 'justify',
                }}
              >
                Visit the official ISTD New User Registration page at{' '}
                <a
                  href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
                >
                  istd.co.in/register/member
                </a>{' '}
                and create your applicant account with your personal and
                contact details.
              </p>
              <a
                href={OFFICIAL_LINKS.istdMemberRegistrationPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red btn-sm"
              >
                Go to istd.co.in/register/member ↗
              </a>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">Step 2</span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                Select Category &amp; Upload Credentials
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Select your membership category (Individual Life/Annual,
                Associate/Student, or Institutional), choose{' '}
                <strong>Kerala / Trichur Chapter</strong>, upload your degree /
                qualification documents, and remit the applicable fee (incl. 18%
                GST) online.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">Step 3</span>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                Connect with ISTD Trichur Chapter
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Need assistance with your application or chapter affiliation?
                Contact the ISTD Trichur Chapter office bearers (+91 9846101034
                / +91 9496839168) or submit the chapter enquiry form below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chapter Membership Enquiry Form */}
      <section className="section-padding bg-pale-blue" id="applySection">
        <div className="container container-narrow">
          <MembershipForm
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>
    </>
  );
}
