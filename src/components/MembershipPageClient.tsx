'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MembershipForm } from '@/components/MembershipForm';
import { OFFICIAL_LINKS } from '@/data/siteData';

export function MembershipPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Individual');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (
      cat === 'Individual' ||
      cat === 'Institutional' ||
      cat === 'Student' ||
      cat === 'Associate'
    ) {
      setSelectedCategory(cat);
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
      {/* Quick Section Jump Links */}
      <div
        style={{
          background: 'var(--color-surface-soft)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.85rem 0',
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
          <a href="#membershipCategories" className="btn btn-outline-navy btn-sm">
            Membership Categories
          </a>
          <a href="#membershipBenefits" className="btn btn-outline-navy btn-sm">
            Membership Benefits
          </a>
          <a href="#eligibilitySection" className="btn btn-outline-navy btn-sm">
            Eligibility
          </a>
          <a href="#membershipFees" className="btn btn-outline-navy btn-sm">
            Membership Fees
          </a>
          <a href="#howToApply" className="btn btn-outline-navy btn-sm">
            How to Apply
          </a>
          <a href="#membershipEnquiry" className="btn btn-red btn-sm">
            Membership Enquiry
          </a>
        </div>
      </div>

      {/* 1. Membership Categories */}
      <section className="section-padding bg-white" id="membershipCategories">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">01 • Categories</span>
            <h2 className="section-title">Membership Categories</h2>
            <p className="section-subtitle">
              ISTD membership is open to individuals and institutions engaged in training and human
              resource development. Select a category below to pre-fill the Membership Enquiry
              form.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Individual Membership */}
            <div
              className={`program-card ${
                selectedCategory === 'Individual' ? 'featured' : ''
              }`}
              id="catIndividual"
            >
              <div>
                <span className="program-duration">Practitioners &amp; Educators</span>
                <h3 className="program-title">Individual Membership</h3>
                <p className="program-description">
                  For professionals, trainers, HR managers, consultants, and faculty members
                  involved in training and development (available as Annual or Life Membership
                  under ISTD National norms).
                </p>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'Individual' ? 'btn-red' : 'btn-outline-navy'
                }`}
                style={{ width: '100%' }}
                onClick={() => handleSelectAndScroll('Individual')}
              >
                {selectedCategory === 'Individual'
                  ? 'Selected: Individual Membership ✓'
                  : 'Select Individual Membership'}
              </button>
            </div>

            {/* Institutional Membership */}
            <div
              className={`program-card ${
                selectedCategory === 'Institutional' ? 'featured' : ''
              }`}
              id="catInstitutional"
            >
              <div>
                <span className="program-duration">Organisations &amp; Institutes</span>
                <h3 className="program-title">Institutional Membership</h3>
                <p className="program-description">
                  For public and private sector organisations, corporate enterprises, universities,
                  colleges, and training institutions committed to human resource development.
                </p>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'Institutional' ? 'btn-red' : 'btn-outline-navy'
                }`}
                style={{ width: '100%' }}
                onClick={() => handleSelectAndScroll('Institutional')}
              >
                {selectedCategory === 'Institutional'
                  ? 'Selected: Institutional Membership ✓'
                  : 'Select Institutional Membership'}
              </button>
            </div>

            {/* Student Membership */}
            <div
              className={`program-card ${
                selectedCategory === 'Student' ? 'featured' : ''
              }`}
              id="catStudent"
            >
              <div>
                <span className="program-duration">Postgraduate Students</span>
                <h3 className="program-title">Student Membership</h3>
                <p className="program-description">
                  For students pursuing degrees or postgraduate programmes in Management, HRM,
                  Social Work, Psychology, or allied disciplines who wish to build a foundation in
                  L&amp;D.
                </p>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'Student' ? 'btn-red' : 'btn-outline-navy'
                }`}
                style={{ width: '100%' }}
                onClick={() => handleSelectAndScroll('Student')}
              >
                {selectedCategory === 'Student'
                  ? 'Selected: Student Membership ✓'
                  : 'Select Student Membership'}
              </button>
            </div>

            {/* Associate Membership */}
            <div
              className={`program-card ${
                selectedCategory === 'Associate' ? 'featured' : ''
              }`}
              id="catAssociate"
            >
              <div>
                <span className="program-duration">Allied Professionals</span>
                <h3 className="program-title">Associate Membership</h3>
                <p className="program-description">
                  For early-career professionals and individuals interested in the field of
                  learning, training, and human resource development as per ISTD National criteria.
                </p>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'Associate' ? 'btn-red' : 'btn-outline-navy'
                }`}
                style={{ width: '100%' }}
                onClick={() => handleSelectAndScroll('Associate')}
              >
                {selectedCategory === 'Associate'
                  ? 'Selected: Associate Membership ✓'
                  : 'Select Associate Membership'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Membership Benefits */}
      <section className="section-padding bg-pale-blue" id="membershipBenefits">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">02 • Benefits</span>
            <h2 className="section-title">Membership Benefits</h2>
            <p className="section-subtitle">
              Documented professional benefits available to members of the Indian Society for
              Training &amp; Development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="CleanCard">
              <span className="section-tag tag-blue">Conferences &amp; Workshops</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Regional &amp; National Learning Forums
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Access to regional chapter sessions, workshops, seminars, and national ISTD
                conferences and conventions across India.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">Research &amp; Publications</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Indian Journal of Training &amp; Development (IJTD)
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Subscription to ISTD’s quarterly research journal, the{' '}
                <em>Indian Journal of Training &amp; Development (IJTD)</em>, and chapter
                knowledge updates as per national membership terms.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">Professional Contribution</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Knowledge Sharing &amp; Authorship
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Opportunities to present papers, facilitate learning sessions, and contribute
                articles to chapter forums and ISTD publications.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-blue">Peer Community</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                HR &amp; L&amp;D Practitioner Network
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Connect with corporate trainers, HR professionals, academicians, and organisational
                leaders in Thrissur and across ISTD chapters nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Eligibility & 4. Membership Fees */}
      <section className="section-padding bg-white" id="eligibilitySection">
        <div className="container">
          <div className="split-grid" style={{ alignItems: 'start', gap: '2.25rem' }}>
            {/* 3. Eligibility */}
            <div className="CleanCard">
              <span className="section-tag tag-blue">03 • Eligibility</span>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.85rem',
                }}
              >
                Eligibility
              </h2>
              <p style={{ fontSize: '0.93rem', color: 'var(--color-body)', lineHeight: 1.68 }}>
                Membership eligibility is governed by the constitution and rules of the Indian
                Society for Training &amp; Development (ISTD), New Delhi:
              </p>
              <ul
                style={{
                  margin: '1rem 0 0 0',
                  paddingLeft: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  fontSize: '0.92rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Individual Membership:</strong> Open to individuals engaged in the
                  training and development of human resources in government, public or private
                  sector enterprises, educational or training institutions, and consultancy roles.
                </li>
                <li>
                  <strong>Institutional Membership:</strong> Open to corporate bodies, public and
                  private sector undertakings, academic universities/colleges, and professional
                  institutions interested in promoting training and development.
                </li>
                <li>
                  <strong>Student / Associate Membership:</strong> Open to students enrolled in
                  recognised degree or diploma programmes in management, human resource
                  development, or allied areas, and individuals meeting ISTD’s associate criteria.
                </li>
              </ul>
            </div>

            {/* 4. Membership Fees */}
            <div className="CleanCard" id="membershipFees">
              <span className="section-tag tag-red">04 • Fee Structure</span>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.85rem',
                }}
              >
                Membership Fees
              </h2>
              <p style={{ fontSize: '0.93rem', color: 'var(--color-body)', lineHeight: 1.68 }}>
                All membership entrance fees, annual/life subscription amounts, and applicable GST
                are set and revised by the <strong>ISTD National Office, New Delhi</strong> across
                Individual (Annual / Life), Institutional, Student, and Senior Citizen categories.
              </p>
              <p style={{ fontSize: '0.93rem', color: 'var(--color-body)', lineHeight: 1.68 }}>
                Because national fee schedules are administered centrally by ISTD New Delhi, please
                refer to the official ISTD National website for the current fee tariff or submit a
                Membership Enquiry below so our Thrissur Chapter Treasurer can share the latest
                verified national fee schedule and payment instructions.
              </p>
              <div className="btn-group" style={{ marginTop: '1.25rem' }}>
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-navy btn-sm"
                >
                  Check Official Tariff on istd.in ↗
                </a>
                <a href="#membershipEnquiry" className="btn btn-primary btn-sm">
                  Enquire With Thrissur Chapter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How to Apply */}
      <section className="section-padding bg-pale-blue" id="howToApply">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">05 • Application Process</span>
            <h2 className="section-title">How to Apply</h2>
            <p className="section-subtitle">
              Follow these steps to enquire about membership with the ISTD Thrissur Chapter or
              complete your formal national registration.
            </p>
          </div>

          <div className="grid-3">
            <div className="CleanCard">
              <span className="section-tag tag-blue">Step 1</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Select Your Category
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Review the Individual, Institutional, Student, or Associate membership categories
                above and choose the option matching your professional or academic profile.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">Step 2</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Submit a Chapter Enquiry
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Use the Membership Enquiry form below or contact the Thrissur Chapter office
                bearers (+91 9846101034 / +91 9496839168) for guidance on affiliating with the
                Thrissur Chapter.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">Step 3</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                National Portal Registration
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Complete the formal application, supporting document upload, and fee payment via
                the official{' '}
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
                >
                  ISTD National Portal (istd.in)
                </a>
                , selecting the Thrissur (Trichur) Chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership Enquiry */}
      <section className="section-padding bg-white" id="applySection">
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
