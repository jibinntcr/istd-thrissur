import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CAMPUS_CHAPTERS, assetUrl, OFFICIAL_LINKS } from '@/data/siteData';
import { PhotoCard } from '@/components/PhotoCard';

export function generateStaticParams() {
  return CAMPUS_CHAPTERS.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = CAMPUS_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) {
    return {
      title: 'Campus Chapter | ISTD Thrissur Chapter',
    };
  }
  return {
    title: `${chapter.institutionName} — First Student Chapter | ISTD Thrissur Chapter`,
    description: chapter.summary,
  };
}

export default async function CampusChapterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = CAMPUS_CHAPTERS.find((c) => c.slug === slug);

  if (!chapter) {
    notFound();
  }

  return (
    <>
      {/* 1. High-Contrast Executive Hero */}
      <section
        style={{
          background:
            'linear-gradient(135deg, #071226 0%, #0E2246 55%, #16336B 100%)',
          color: '#FFFFFF',
          padding: '4.25rem 0 3.75rem',
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
              marginBottom: '1.2rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#93C5FD', fontWeight: 600 }}>
              Home
            </Link>
            <span>/</span>
            <Link
              href="/campus-chapters"
              style={{ color: '#93C5FD', fontWeight: 600 }}
            >
              Campus Chapters
            </Link>
            <span>/</span>
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>
              {chapter.institutionName}
            </span>
          </div>

          <div style={{ maxWidth: '860px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.55rem',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  padding: '0.32rem 0.85rem',
                  borderRadius: '999px',
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '0.73rem',
                  fontWeight: 800,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}
              >
                {chapter.badge}
              </span>
              <span
                style={{
                  padding: '0.32rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.14)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                }}
              >
                📍 {chapter.location}
              </span>
            </div>

            <h1
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.95rem, 3.6vw, 2.85rem)',
                fontWeight: 900,
                lineHeight: 1.18,
                marginBottom: '0.9rem',
              }}
            >
              ISTD Trichur First Student Chapter at {chapter.institutionName}
            </h1>

            <p
              style={{
                color: '#E2E8F0',
                fontSize: '1.03rem',
                lineHeight: 1.72,
                marginBottom: '1.5rem',
              }}
            >
              {chapter.summary}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
              }}
            >
              <a href="#inaugurationAnnouncement" className="btn btn-red">
                Read Official Announcement &rarr;
              </a>
              <Link
                href="/events/christ-college-student-chapter-inauguration"
                className="btn btn-outline-white"
              >
                Event Registration &amp; Details
              </Link>
              <Link
                href="/campus-chapters#submitCampusChapterEOI"
                className="btn btn-sm"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#FDE68A',
                  border: '1px solid rgba(253, 230, 138, 0.4)',
                }}
              >
                Establish a Campus Chapter (EOI)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Announcement & Full Poster Showcase */}
      <section
        className="section-padding bg-white"
        id="inaugurationAnnouncement"
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left: Official Poster Showcase */}
            <div
              style={{
                background:
                  'linear-gradient(145deg, #071226 0%, #10254C 100%)',
                borderRadius: '22px',
                padding: '1.5rem',
                boxShadow: '0 20px 48px rgba(15, 29, 58, 0.14)',
                border: '1px solid #DBEAFE',
              }}
            >
              <PhotoCard
                src={chapter.posterImage}
                alt={`Official Inauguration Poster — ${chapter.institutionName}`}
                title={`ISTD Trichur First Student Chapter — ${chapter.institutionName}`}
                caption={chapter.posterCaption}
                category="Campus Chapter Inauguration"
                badgeText="Official Inauguration Poster"
                headingText={chapter.institutionName}
                aspectRatio="auto"
                imgStyle={{ objectFit: 'contain' }}
              />
            </div>

            {/* Right: Official Inauguration Statement & Dignitaries */}
            <div>
              <span className="section-tag tag-blue">
                Official Chapter Announcement
              </span>
              <h2
                className="section-title"
                style={{ marginBottom: '1rem', lineHeight: 1.25 }}
              >
                Inauguration of the First Student Chapter at{' '}
                {chapter.institutionName}
              </h2>

              <div
                style={{
                  background: '#F8FAFC',
                  borderLeft: '4px solid #1E40AF',
                  borderRadius: '0 16px 16px 0',
                  padding: '1.5rem 1.65rem',
                  marginBottom: '1.75rem',
                }}
              >
                {chapter.descriptionParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    style={{
                      color: '#1E293B',
                      fontSize: '0.99rem',
                      lineHeight: 1.78,
                      marginBottom:
                        idx === chapter.descriptionParagraphs.length - 1
                          ? 0
                          : '1rem',
                      fontWeight: idx === 0 ? 600 : 400,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Inaugural Programme Dignitaries */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#B91C1C',
                    marginBottom: '0.85rem',
                  }}
                >
                  Inaugural Programme Dignitaries &amp; Addresses
                </div>

                <div
                  style={{
                    display: 'grid',
                    gap: '1rem',
                  }}
                >
                  {chapter.dignitaries.map((dignitary) => (
                    <div
                      key={dignitary.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: '#FFFFFF',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '1.1rem 1.25rem',
                        boxShadow: '0 8px 24px rgba(15, 29, 58, 0.05)',
                      }}
                    >
                      {dignitary.photo && (
                        <img
                          src={assetUrl(dignitary.photo)}
                          alt={dignitary.name}
                          style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2.5px solid #1E40AF',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: '#0F172A',
                          }}
                        >
                          {dignitary.name}
                        </div>
                        <div
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#1D4ED8',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {dignitary.role}
                        </div>
                        <div
                          style={{
                            fontSize: '0.84rem',
                            color: '#475569',
                            lineHeight: 1.5,
                          }}
                        >
                          {dignitary.highlight}
                        </div>
                        {dignitary.linkedin && (
                          <a
                            href={dignitary.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              marginTop: '0.35rem',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              color: '#0A66C2',
                            }}
                          >
                            LinkedIn Profile &#8599;
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Focus Areas of the Student Chapter */}
      <section className="section-padding bg-pale-blue" id="studentChapterFocus">
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '2rem' }}>
            <span className="section-tag tag-red">Vision &amp; Objectives</span>
            <h2 className="section-title" style={{ marginBottom: '0.45rem' }}>
              Key Focus Areas at {chapter.shortName}
            </h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
              How the ISTD Student Chapter empowers engineering students and
              faculty through structured industry-academia engagement.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {chapter.focusAreas.map((area, index) => (
              <div
                key={area.title}
                className="CleanCard"
                style={{
                  padding: '1.6rem',
                  borderTop: '4px solid #1E40AF',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                  }}
                >
                  Focus 0{index + 1}
                </span>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.5rem',
                  }}
                >
                  {area.title}
                </h3>
                <p
                  style={{
                    color: '#475569',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    marginBottom: 0,
                  }}
                >
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chapter Gallery & Media Archive */}
      <section className="section-padding bg-white" id="campusChapterGallery">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '1.85rem',
            }}
          >
            <div>
              <span className="section-tag tag-blue">
                Campus Chapter Archive
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Poster &amp; Inauguration Photographs
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Click any photograph or poster below to view in full-screen
                lightbox mode. Additional event photographs will be updated here.
              </p>
            </div>
            <Link href="/campus-chapters" className="btn btn-outline-navy btn-sm">
              &larr; Back to All Campus Chapters
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 380px))',
              gap: '1.5rem',
            }}
          >
            {chapter.galleryPhotos.map((photo) => (
              <PhotoCard
                key={photo.src}
                src={photo.src}
                alt={photo.title}
                title={photo.title}
                caption={photo.caption}
                category={photo.category}
                badgeText={photo.category}
                headingText={photo.title}
                aspectRatio="4/5"
                imgStyle={{ objectFit: 'contain' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">
                  Campus Chapter Network
                </span>
                <h2>Interested in Starting an ISTD Campus Chapter?</h2>
                <p>
                  Colleges and universities across Thrissur and Central Kerala
                  can submit an Expression of Interest (EOI) to partner with the
                  ISTD Thrissur Chapter.
                </p>
              </div>
              <div className="btn-group">
                <Link
                  href="/campus-chapters#submitCampusChapterEOI"
                  className="btn btn-red"
                >
                  Submit Institutional EOI &rarr;
                </Link>
                <a
                  href={OFFICIAL_LINKS.istdTrichurLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white"
                >
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
