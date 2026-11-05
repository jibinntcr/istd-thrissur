import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OFFICE_BEARERS, assetUrl } from '@/data/siteData';
import { PhotoCard } from '@/components/PhotoCard';
import { buildPageMetadata, SITE_URL } from '@/lib/seoConfig';

export function generateStaticParams() {
  return OFFICE_BEARERS.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = OFFICE_BEARERS.find((m) => m.slug === slug);

  if (!member) {
    return {
      title: 'Leadership Profile | ISTD Thrissur Chapter',
    };
  }

  return buildPageMetadata({
    title: `${member.name} — ${member.role}, ISTD Thrissur Chapter`,
    description:
      member.shortBio ||
      `${member.name} serves as ${member.role} of the ISTD Thrissur (Trichur) Chapter (${member.title}).`,
    path: `/committee/${member.slug}`,
    image: member.avatar || '/images/logo-circle.png',
    type: 'article',
    keywords: [
      member.name,
      `${member.name} ISTD`,
      `${member.name} ISTD Thrissur`,
      `${member.role} ISTD Thrissur Chapter`,
      ...(member.expertiseDomains || []),
    ],
  });
}

export default async function CommitteeMemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = OFFICE_BEARERS.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const otherMembers = OFFICE_BEARERS.filter((m) => m.slug !== member.slug);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: member.name,
      jobTitle: `${member.role}, ISTD Thrissur Chapter (${member.title || ''})`,
      description: member.shortBio,
      image: `${SITE_URL}${member.avatar}`,
      url: `${SITE_URL}/committee/${member.slug}/`,
      worksFor: {
        '@type': 'Organization',
        name: 'ISTD Thrissur Chapter (Indian Society for Training & Development)',
        url: `${SITE_URL}/`,
      },
      ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* 1. Executive Profile Hero */}
      <section
        style={{
          background:
            'linear-gradient(135deg, #071226 0%, #0E2246 55%, #16356C 100%)',
          color: '#FFFFFF',
          padding: 'clamp(2.75rem, 5vw, 4.5rem) 0 clamp(2.5rem, 4.5vw, 4rem)',
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
              fontSize: '0.84rem',
              color: '#CBD5E1',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#93C5FD', fontWeight: 600 }}>
              Home
            </Link>
            <span>/</span>
            <Link
              href="/committee"
              style={{ color: '#93C5FD', fontWeight: 600 }}
            >
              Managing Committee
            </Link>
            <span>/</span>
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>
              {member.name}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left: Portrait Card(s) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(251, 191, 36, 0.45)',
                  borderRadius: '22px',
                  padding: '0.85rem',
                  boxShadow: '0 22px 50px rgba(0, 0, 0, 0.4)',
                  maxWidth: member.secondaryAvatar ? '255px' : '320px',
                  width: '100%',
                }}
              >
                <img
                  src={assetUrl(member.avatar || '/images/logo-circle.png')}
                  alt={`${member.name} — ${member.role}, ISTD Thrissur Chapter`}
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    borderRadius: '16px',
                    display: 'block',
                    background: '#FFFFFF',
                  }}
                />
              </div>

              {member.secondaryAvatar && (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '2px solid rgba(147, 197, 253, 0.4)',
                    borderRadius: '22px',
                    padding: '0.85rem',
                    boxShadow: '0 22px 50px rgba(0, 0, 0, 0.4)',
                    maxWidth: '255px',
                    width: '100%',
                  }}
                >
                  <img
                    src={assetUrl(member.secondaryAvatar)}
                    alt={`${member.name} — Leadership Portrait`}
                    style={{
                      width: '100%',
                      aspectRatio: '3 / 4',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '16px',
                      display: 'block',
                      background: '#FFFFFF',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right: Executive Identity & Quick Actions */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.55rem',
                  marginBottom: '0.9rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.32rem 0.9rem',
                    borderRadius: '999px',
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  {member.role} • ISTD Thrissur Chapter
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.32rem 0.85rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.14)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#E2E8F0',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Diamond Chapter Leadership
                </span>
              </div>

              <h1
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(2rem, 3.6vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  marginBottom: '0.6rem',
                }}
              >
                {member.name}
              </h1>

              <p
                style={{
                  color: '#FDE68A',
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                }}
              >
                {member.headline || member.title}
              </p>

              <p
                style={{
                  color: '#E2E8F0',
                  fontSize: '0.98rem',
                  lineHeight: 1.72,
                  marginBottom: '1.5rem',
                }}
              >
                {member.shortBio}
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: '#0A66C2',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.68rem 1.2rem',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>Connect on LinkedIn ↗</span>
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="btn btn-outline-white btn-sm"
                    style={{ padding: '0.68rem 1.15rem' }}
                  >
                    ✉ {member.email}
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="btn btn-outline-white btn-sm"
                    style={{ padding: '0.68rem 1.15rem' }}
                  >
                    📞 {member.phone}
                  </a>
                )}

                <Link
                  href="/committee"
                  className="btn btn-outline-white btn-sm"
                  style={{ padding: '0.68rem 1.15rem' }}
                >
                  &larr; All Office Bearers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Biography & Areas of Expertise */}
      <section className="section-padding bg-white">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Detailed Biography */}
            <div style={{ gridColumn: 'span 1' }}>
              <span className="section-tag tag-blue">Executive Profile</span>
              <h2
                className="section-title"
                style={{ marginBottom: '1.15rem', lineHeight: 1.25 }}
              >
                About {member.name}
              </h2>

              <div
                style={{
                  background: '#F8FAFC',
                  borderLeft: '4px solid #1E40AF',
                  borderRadius: '0 16px 16px 0',
                  padding: 'clamp(1.25rem, 3vw, 1.85rem)',
                  boxShadow: '0 8px 26px rgba(15, 23, 42, 0.05)',
                }}
              >
                {(member.biography || []).map((para, idx) => (
                  <p
                    key={idx}
                    style={{
                      color: '#1E293B',
                      fontSize: '0.98rem',
                      lineHeight: 1.78,
                      marginBottom:
                        idx === (member.biography?.length || 1) - 1
                          ? 0
                          : '1.1rem',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Expertise Domains */}
              {member.expertiseDomains && member.expertiseDomains.length > 0 && (
                <div style={{ marginTop: '1.75rem' }}>
                  <h3
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#475569',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Core Domains of Expertise
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.55rem',
                    }}
                  >
                    {member.expertiseDomains.map((domain) => (
                      <span
                        key={domain}
                        style={{
                          padding: '0.4rem 0.9rem',
                          borderRadius: '999px',
                          background: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          color: '#1E3A8A',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                        }}
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: ISTD Leadership Roles & Academic Qualifications */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* ISTD Leadership Roles */}
              {member.istdRoles && member.istdRoles.length > 0 && (
                <div
                  className="CleanCard"
                  style={{
                    borderTop: '4px solid #DC2626',
                    padding: 'clamp(1.35rem, 3vw, 1.85rem)',
                  }}
                >
                  <span className="section-tag tag-red">
                    ISTD Leadership &amp; Governance
                  </span>
                  <h3
                    style={{
                      fontSize: '1.22rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '0.9rem',
                    }}
                  >
                    Roles &amp; Contributions in ISTD
                  </h3>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      display: 'grid',
                      gap: '0.65rem',
                      color: '#334155',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {member.istdRoles.map((roleItem) => (
                      <li key={roleItem}>
                        <strong>{roleItem.split('—')[0]}</strong>
                        {roleItem.includes('—')
                          ? ` — ${roleItem.split('—').slice(1).join('—')}`
                          : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Academic Qualifications & Fellowships */}
              {member.educationAndCredentials &&
                member.educationAndCredentials.length > 0 && (
                  <div
                    className="CleanCard"
                    style={{
                      borderTop: '4px solid #1E40AF',
                      padding: 'clamp(1.35rem, 3vw, 1.85rem)',
                    }}
                  >
                    <span className="section-tag tag-blue">
                      Qualifications &amp; Honours
                    </span>
                    <h3
                      style={{
                        fontSize: '1.22rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        marginBottom: '0.9rem',
                      }}
                    >
                      Academic Credentials &amp; Fellowships
                    </h3>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '1.2rem',
                        display: 'grid',
                        gap: '0.6rem',
                        color: '#334155',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {member.educationAndCredentials.map((cred) => (
                        <li key={cred}>{cred}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Career, Academic & Institution-Building Highlights */}
      {member.careerHighlights && member.careerHighlights.length > 0 && (
        <section className="section-padding bg-pale-blue">
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '2rem' }}>
              <span className="section-tag tag-blue">
                Professional &amp; Institutional Milestones
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.4rem' }}>
                Key Career &amp; Leadership Highlights
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Distinguished academic, administrative, and professional
                milestones of {member.name}.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.25rem',
              }}
            >
              {member.careerHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="CleanCard"
                  style={{
                    padding: '1.5rem',
                    borderTop: '3px solid #1D4ED8',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      fontSize: '0.73rem',
                      fontWeight: 800,
                    }}
                  >
                    Highlight 0{idx + 1}
                  </span>
                  <p
                    style={{
                      color: '#1E293B',
                      fontSize: '0.93rem',
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Featured Portraits & Chapter Milestone Photographs */}
      {member.featuredPhotos && member.featuredPhotos.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '1.85rem' }}>
              <span className="section-tag tag-red">Photo Archive</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Portraits &amp; Chapter Moments
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Click any photograph below to open in full-screen lightbox view.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '1.35rem',
              }}
            >
              {member.featuredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.src}
                  src={photo.src}
                  alt={photo.title}
                  title={photo.title}
                  caption={photo.caption}
                  category={photo.category}
                  badgeText={photo.category}
                  headingText={photo.title}
                  aspectRatio="4/3"
                  compactCaption
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Other Managing Committee Office Bearers */}
      <section className="section-padding bg-pale-blue">
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
              <span className="section-tag tag-blue">Chapter Leadership</span>
              <h2 className="section-title" style={{ marginBottom: '0.3rem' }}>
                Other Chapter Office Bearers
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Explore the profiles of the leadership team guiding the ISTD
                Thrissur Chapter.
              </p>
            </div>
            <Link href="/committee" className="btn btn-outline-navy btn-sm">
              View All on Managing Committee Page &rarr;
            </Link>
          </div>

          <div className="committee-grid">
            {otherMembers.map((other) => (
              <div
                key={other.id}
                className="committee-card officer-highlight"
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ width: '100%' }}>
                  <Link
                    href={`/committee/${other.slug}`}
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    <div className="committee-avatar-wrap" style={{ margin: '0 auto 1.15rem' }}>
                      <img
                        src={assetUrl(other.avatar || '/images/logo-circle.png')}
                        alt={`${other.name} - ${other.role}`}
                        width={130}
                        height={130}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <span
                    className={`committee-role-badge ${
                      other.isChairman ? 'badge-chairman' : ''
                    }`}
                  >
                    {other.role}
                  </span>
                  <h3 className="committee-name">
                    <Link
                      href={`/committee/${other.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {other.name}
                    </Link>
                  </h3>
                  <p className="committee-title">{other.title}</p>
                </div>

                <div style={{ width: '100%', marginTop: '0.75rem' }}>
                  <Link
                    href={`/committee/${other.slug}`}
                    className="btn btn-outline-navy btn-sm"
                    style={{ width: '100%', fontSize: '0.82rem' }}
                  >
                    View Full Profile &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
