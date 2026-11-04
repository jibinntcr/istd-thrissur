import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CAMPUS_CHAPTERS, assetUrl } from '@/data/siteData';
import { CampusChapterEoiForm } from '@/components/CampusChapterEoiForm';

export const metadata: Metadata = {
  title: 'Campus & Student Chapters | ISTD Thrissur Chapter',
  description:
    'Explore ISTD Campus and Student Chapters under the ISTD Thrissur (Trichur) Chapter, including our first Student Chapter at Christ College of Engineering (Autonomous), and submit an Expression of Interest (EOI) to establish a chapter at your institution.',
};

const CAMPUS_CHAPTER_PILLARS = [
  {
    step: '01',
    title: 'Connect Academic Learning with Professional Practice',
    description:
      'Bridge classroom theory with contemporary industry expectations, real-world case studies, organisational dynamics, and applied problem-solving.',
  },
  {
    step: '02',
    title: 'Engage Directly with Experienced Practitioners',
    description:
      'Provide students and faculty direct access to industry leaders, corporate trainers, HR heads, and senior consultants from the national ISTD network.',
  },
  {
    step: '03',
    title: 'Develop Future-Ready Professionals & Leaders',
    description:
      'Cultivate communication, leadership, teamwork, executive presence, and career readiness through student-led forums, workshops, and mentorship.',
  },
  {
    step: '04',
    title: 'Strengthen Academia–Industry Collaboration',
    description:
      'Enable joint faculty development programmes (FDPs), research dialogues, internships, and campus-to-corporate developmental pathways.',
  },
];

export default function CampusChaptersPage() {
  return (
    <>
      {/* 1. High-Contrast Executive Hero */}
      <section
        style={{
          background:
            'linear-gradient(135deg, #071226 0%, #0F2347 55%, #173469 100%)',
          color: '#FFFFFF',
          padding: '4.5rem 0 4rem',
          borderBottom: '4px solid #F59E0B',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: '#CBD5E1',
              marginBottom: '1.15rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#93C5FD', fontWeight: 600 }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>
              Campus &amp; Student Chapters
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.32rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(245, 158, 11, 0.18)',
                  border: '1px solid rgba(251, 191, 36, 0.45)',
                  color: '#FDE68A',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.9rem',
                }}
              >
                Academia–Industry Bridge • ISTD Thrissur Chapter
              </span>

              <h1
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(2rem, 3.6vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  marginBottom: '1rem',
                }}
              >
                ISTD Campus &amp; Student Chapters
              </h1>

              <p
                style={{
                  color: '#E2E8F0',
                  fontSize: '1.03rem',
                  lineHeight: 1.72,
                  marginBottom: '1.5rem',
                  maxWidth: '640px',
                }}
              >
                ISTD Campus Chapters create a structured institutional space
                where students and faculty connect academic learning with
                professional practice, engage with experienced practitioners,
                and develop as future professionals.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.85rem',
                }}
              >
                <a href="#existingCampusChapters" className="btn btn-red">
                  Explore Established Campus Chapters &rarr;
                </a>
                <a href="#submitCampusChapterEOI" className="btn btn-outline-white">
                  Submit EOI for Your Institution
                </a>
              </div>
            </div>

            {/* Milestone Highlight Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '20px',
                padding: '1.65rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.24rem 0.7rem',
                  borderRadius: '999px',
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginBottom: '0.75rem',
                }}
              >
                Inaugural Milestone
              </span>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  lineHeight: 1.35,
                }}
              >
                First Student Chapter at Christ College of Engineering
                (Autonomous)
              </h2>
              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.9rem',
                  lineHeight: 1.62,
                  marginBottom: '1.1rem',
                }}
              >
                Inaugural programme featuring an address and lighting of the
                lamp by{' '}
                <strong style={{ color: '#FFFFFF' }}>
                  Prof. (Dr.) Zakkariya
                </strong>{' '}
                (National Vice President, ISTD), alongside an address by{' '}
                <strong style={{ color: '#FFFFFF' }}>Mr. Tony Chacko</strong>{' '}
                (Chairman, ISTD Trichur Chapter).
              </p>
              <Link
                href="/campus-chapters/christ-college-of-engineering"
                className="btn btn-sm"
                style={{
                  background: '#F59E0B',
                  color: '#0F172A',
                  fontWeight: 800,
                }}
              >
                View Exclusive Chapter Page &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Campus Chapters Are Important */}
      <section className="section-padding bg-white" id="whyCampusChapters">
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '2.25rem' }}>
            <span className="section-tag tag-blue">Why Campus Chapters Matter</span>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
              Nurturing the Next Generation of Professionals
            </h2>
            <p
              style={{
                color: 'var(--color-body)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                marginBottom: 0,
              }}
            >
              An ISTD Student Chapter embeds continuous learning, practitioner
              mentorship, and leadership development directly inside higher
              education campuses—empowering students before they transition into
              industry.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.35rem',
            }}
          >
            {CAMPUS_CHAPTER_PILLARS.map((pillar) => (
              <div
                key={pillar.step}
                className="CleanCard"
                style={{
                  padding: '1.65rem',
                  borderTop: '4px solid #1E40AF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      color: '#1D4ED8',
                      background: '#EFF6FF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      marginBottom: '0.85rem',
                    }}
                  >
                    Pillar {pillar.step}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.12rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '0.55rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      color: '#475569',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      marginBottom: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Existing Campus Chapters Directory */}
      <section
        className="section-padding bg-pale-blue"
        id="existingCampusChapters"
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="section-tag tag-red">
                Established Campus Chapters
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Our Institutional Student Chapters
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '640px',
                }}
              >
                Click on any Campus Chapter card below to visit its dedicated
                page with inauguration details, dignitaries, objectives, and
                photographs.
              </p>
            </div>
            <a href="#submitCampusChapterEOI" className="btn btn-outline-navy btn-sm">
              Partner Your Institution &rarr;
            </a>
          </div>

          <div style={{ display: 'grid', gap: '1.75rem' }}>
            {CAMPUS_CHAPTERS.map((chapter) => (
              <div
                key={chapter.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1.5px solid #DBEAFE',
                  boxShadow: '0 18px 42px rgba(15, 29, 58, 0.07)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }}
              >
                {/* Left Poster Showcase */}
                <Link
                  href={`/campus-chapters/${chapter.slug}`}
                  style={{
                    background:
                      'linear-gradient(145deg, #071226 0%, #10254C 100%)',
                    padding: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <img
                    src={assetUrl(chapter.posterImage)}
                    alt={chapter.institutionName}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      maxHeight: '440px',
                      objectFit: 'contain',
                      borderRadius: '14px',
                      boxShadow: '0 14px 34px rgba(0, 0, 0, 0.38)',
                      border: '2px solid rgba(255, 255, 255, 0.18)',
                    }}
                  />
                </Link>

                {/* Right Chapter Information */}
                <div
                  style={{
                    padding: '2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.28rem 0.78rem',
                          borderRadius: '999px',
                          background: '#FEF3C7',
                          color: '#92400E',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {chapter.badge}
                      </span>
                      <span
                        style={{
                          padding: '0.28rem 0.78rem',
                          borderRadius: '999px',
                          background: '#EFF6FF',
                          color: '#1D4ED8',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        📍 {chapter.location}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)',
                        fontWeight: 900,
                        color: '#0F172A',
                        marginBottom: '0.75rem',
                        lineHeight: 1.25,
                      }}
                    >
                      <Link
                        href={`/campus-chapters/${chapter.slug}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {chapter.institutionName}
                      </Link>
                    </h3>

                    <p
                      style={{
                        color: '#334155',
                        fontSize: '0.96rem',
                        lineHeight: 1.72,
                        marginBottom: '1rem',
                      }}
                    >
                      {chapter.summary}
                    </p>

                    {/* Inaugural Dignitaries Pill Box */}
                    <div
                      style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '14px',
                        padding: '1rem 1.15rem',
                        marginBottom: '1.35rem',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.07em',
                          color: '#1E40AF',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Inaugural Programme Highlights
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '1.15rem',
                          color: '#334155',
                          fontSize: '0.88rem',
                          lineHeight: 1.65,
                        }}
                      >
                        <li>
                          <strong>Prof. (Dr.) Zakkariya</strong>, National Vice
                          President, ISTD — Inaugural Address, Official
                          Inauguration &amp; Lighting of the Lamp
                        </li>
                        <li>
                          <strong>Mr. Tony Chacko</strong>, Chairman, ISTD
                          Trichur Chapter — Special Address to the Gathering
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      alignItems: 'center',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <Link
                      href={`/campus-chapters/${chapter.slug}`}
                      className="btn btn-primary"
                    >
                      Open Exclusive Campus Chapter Page &rarr;
                    </Link>
                    <Link
                      href="/events/christ-college-student-chapter-inauguration"
                      className="btn btn-outline-navy btn-sm"
                    >
                      View Completed Event Report &amp; Chronicle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Submit EOI for a New Campus Chapter */}
      <section className="section-padding bg-white" id="submitCampusChapterEOI">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.25rem',
              alignItems: 'start',
            }}
          >
            {/* Left Guidance Column */}
            <div>
              <span className="section-tag tag-yellow">
                Start a Campus Chapter
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.65rem' }}>
                How to Establish an ISTD Student Chapter
              </h2>
              <p
                style={{
                  color: 'var(--color-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '1.35rem',
                }}
              >
                Higher education institutions in Thrissur and Central Kerala can
                partner with the ISTD Thrissur Chapter to establish an official
                Student Chapter on their campus.
              </p>

              <div
                style={{
                  display: 'grid',
                  gap: '0.9rem',
                  marginBottom: '1.5rem',
                }}
              >
                {[
                  {
                    num: 'Step 1',
                    title: 'Submit Expression of Interest (EOI)',
                    desc: 'Complete the institutional EOI form with details of your institution and nominated Faculty Coordinator.',
                  },
                  {
                    num: 'Step 2',
                    title: 'Consultation with Chapter Office Bearers',
                    desc: 'Our Managing Committee coordinates with your Principal/Director and Faculty Advisor on student chapter norms and annual calendar.',
                  },
                  {
                    num: 'Step 3',
                    title: 'Official Inauguration & Induction',
                    desc: 'Host the formal inauguration, lamp-lighting ceremony, and maiden practitioner session on your campus.',
                  },
                ].map((s) => (
                  <div
                    key={s.num}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '14px',
                      padding: '1rem 1.15rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: '#1D4ED8',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {s.num}
                    </span>
                    <h4
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0.2rem 0 0.3rem',
                      }}
                    >
                      {s.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: '#475569',
                        margin: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '14px',
                  padding: '1.1rem 1.25rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#1E40AF',
                    marginBottom: '0.35rem',
                  }}
                >
                  Direct Institutional Desk
                </div>
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#1E3A8A',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Mr. Tony Chacko</strong> (Chairman):{' '}
                  <a href="tel:+919846101034" style={{ fontWeight: 700 }}>
                    +91 9846101034
                  </a>
                  <br />
                  <strong>Mr. Jibin N</strong> (Treasurer):{' '}
                  <a href="tel:+919496839168" style={{ fontWeight: 700 }}>
                    +91 9496839168
                  </a>{' '}
                  •{' '}
                  <a
                    href="mailto:jibintcr@gmail.com"
                    style={{ fontWeight: 700 }}
                  >
                    jibintcr@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right EOI Form Column */}
            <div>
              <CampusChapterEoiForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
