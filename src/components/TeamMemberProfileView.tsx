import React from 'react';
import Link from 'next/link';
import { CommitteeMember, OFFICE_BEARERS, assetUrl } from '@/data/siteData';
import { PhotoCard } from '@/components/PhotoCard';
import { getTeamMemberJsonLd } from '@/lib/seoConfig';
import styles from './TeamMemberProfileView.module.css';

interface TeamMemberProfileViewProps {
  member: CommitteeMember;
}

export function TeamMemberProfileView({ member }: TeamMemberProfileViewProps) {
  const jsonLd = getTeamMemberJsonLd(member);
  const portraitAlt =
    member.avatarAlt ||
    `${member.name}, ${member.role} of ISTD Thrissur Chapter`;
  const isTallPortrait =
    member.avatarWidth &&
    member.avatarHeight &&
    member.avatarHeight > member.avatarWidth * 1.15;

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Back Navigation */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
              </li>
              <li className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </li>
              <li>
                <Link href="/committee" className={styles.breadcrumbLink}>
                  Managing Committee
                </Link>
              </li>
              <li className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </li>
              <li className={styles.breadcrumbCurrent} aria-current="page">
                {member.name}
              </li>
            </ol>
          </nav>

          <Link href="/committee" className={styles.backLink}>
            <span aria-hidden="true">&larr;</span>
            <span>Back to Managing Committee</span>
          </Link>
        </div>
      </div>

      {/* Institutional Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroCard}>
            {/* Portrait Column */}
            <div className={styles.portraitColumn}>
              <div className={styles.portraitFrame}>
                <img
                  src={assetUrl(member.avatar || '/images/logo-circle.png')}
                  alt={portraitAlt}
                  width={member.avatarWidth || 400}
                  height={member.avatarHeight || 400}
                  className={`${styles.portraitImage} ${
                    isTallPortrait ? styles.portraitImageTall : ''
                  }`}
                />
              </div>
              <div className={styles.portraitCaption}>
                <strong>{member.name}</strong>
                <span>
                  {member.role}, {member.organisation || 'ISTD Thrissur Chapter'}
                </span>
              </div>
            </div>

            {/* Identity & Summary Column */}
            <div className={styles.identityColumn}>
              <div className={styles.badgeRow}>
                <span className={styles.roleBadge}>
                  {member.role} &bull;{' '}
                  {member.organisation || 'ISTD Thrissur Chapter'}
                </span>
                <span className={styles.chapterBadge}>
                  Indian Society for Training &amp; Development
                </span>
              </div>

              <h1 className={styles.profileName}>{member.name}</h1>

              <p className={styles.profileDesignation}>
                {member.role}, {member.organisation || 'ISTD Thrissur Chapter'}
              </p>

              {member.title && (
                <p className={styles.profileSubTitle}>{member.title}</p>
              )}

              {member.shortBio && (
                <p className={styles.profileIntro}>{member.shortBio}</p>
              )}

              <div className={styles.actionRow}>
                <Link href="/contact" className={styles.primaryBtn}>
                  Contact Chapter
                </Link>
                {member.confirmedProfiles &&
                  member.confirmedProfiles.length > 0 && (
                    <a
                      href="#confirmed-profiles"
                      className={styles.secondaryBtn}
                    >
                      Confirmed Profiles
                    </a>
                  )}
                <Link href="/committee" className={styles.secondaryBtn}>
                  Managing Committee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Professional Biography */}
      {member.biography && member.biography.length > 0 && (
        <section
          className={styles.sectionBlock}
          aria-labelledby="biography-heading"
        >
          <div className="container">
            <div className={styles.contentCard}>
              <span className={styles.sectionEyebrow}>
                Professional Biography
              </span>
              <h2 id="biography-heading" className={styles.sectionHeading}>
                Biography
              </h2>
              <div className={styles.proseBlock}>
                {member.biography.map((paragraph, index) => (
                  <p key={index} className={styles.proseParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Chapter Role */}
      {member.chapterRoleSection && (
        <section
          className={styles.sectionBlock}
          aria-labelledby="chapter-role-heading"
        >
          <div className="container">
            <div className={styles.contentCard}>
              <span className={styles.sectionEyebrow}>Chapter Role</span>
              <h2 id="chapter-role-heading" className={styles.sectionHeading}>
                Role at ISTD Thrissur Chapter
              </h2>
              <div className={styles.roleHighlightBox}>
                <p className={styles.roleHighlightText}>
                  {member.chapterRoleSection}
                </p>
              </div>

              {member.istdRoles && member.istdRoles.length > 0 && (
                <ul className={styles.roleList}>
                  {member.istdRoles.map((roleItem) => (
                    <li key={roleItem}>{roleItem}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. Professional Background */}
      {member.professionalBackground &&
        member.professionalBackground.length > 0 && (
          <section
            className={styles.sectionBlock}
            aria-labelledby="professional-background-heading"
          >
            <div className="container">
              <div className={styles.contentCard}>
                <span className={styles.sectionEyebrow}>
                  Professional Background
                </span>
                <h2
                  id="professional-background-heading"
                  className={styles.sectionHeading}
                >
                  Organisations &amp; Professional Activities
                </h2>

                <div className={styles.backgroundGrid}>
                  {member.professionalBackground.map((item) => (
                    <div
                      key={`${item.organisation}-${item.role}`}
                      className={styles.backgroundItemCard}
                    >
                      <span className={styles.backgroundCategory}>
                        {item.category}
                      </span>
                      <h3 className={styles.backgroundOrg}>
                        {item.organisation}
                      </h3>
                      <p className={styles.backgroundRole}>{item.role}</p>
                      <p className={styles.backgroundDesc}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* Optional Academic Credentials & Secondary Portrait (e.g., Prof. Zakkariya's second portrait used in a separate lower section, never side-by-side) */}
      {((member.educationAndCredentials &&
        member.educationAndCredentials.length > 0) ||
        (member.careerHighlights && member.careerHighlights.length > 0) ||
        member.secondaryAvatar) && (
        <section
          className={styles.sectionBlock}
          aria-labelledby="credentials-heading"
        >
          <div className="container">
            <div className={styles.contentCard}>
              <span className={styles.sectionEyebrow}>
                Academic &amp; Institutional Record
              </span>
              <h2 id="credentials-heading" className={styles.sectionHeading}>
                Qualifications &amp; Institutional Milestones
              </h2>

              <div className={styles.credentialsGrid}>
                <div>
                  {member.educationAndCredentials &&
                    member.educationAndCredentials.length > 0 && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.65rem',
                          }}
                        >
                          Academic Qualifications &amp; Fellowships
                        </h3>
                        <ul className={styles.roleList} style={{ marginTop: 0 }}>
                          {member.educationAndCredentials.map((cred) => (
                            <li key={cred}>{cred}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {member.careerHighlights &&
                    member.careerHighlights.length > 0 && (
                      <div>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.65rem',
                          }}
                        >
                          Key Institutional &amp; Leadership Highlights
                        </h3>
                        <ul className={styles.roleList} style={{ marginTop: 0 }}>
                          {member.careerHighlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                {member.secondaryAvatar && (
                  <div className={styles.secondaryPortraitBox}>
                    <img
                      src={assetUrl(member.secondaryAvatar)}
                      alt={`${member.name} — Academic & Leadership Portrait`}
                      width={member.avatarWidth || 682}
                      height={member.avatarHeight || 1024}
                      loading="lazy"
                      className={styles.secondaryPortraitImg}
                    />
                    {member.secondaryAvatarCaption && (
                      <p className={styles.secondaryPortraitCaption}>
                        {member.secondaryAvatarCaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Optional Chapter Photographs */}
      {member.featuredPhotos && member.featuredPhotos.length > 0 && (
        <section
          className={styles.sectionBlock}
          aria-labelledby="chapter-photos-heading"
        >
          <div className="container">
            <div className={styles.contentCard}>
              <span className={styles.sectionEyebrow}>Chapter Archive</span>
              <h2
                id="chapter-photos-heading"
                className={styles.sectionHeading}
              >
                Chapter Milestones &amp; Moments
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '1.25rem',
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
          </div>
        </section>
      )}

      {/* 4. Confirmed External Profile Links */}
      {member.confirmedProfiles && member.confirmedProfiles.length > 0 && (
        <section
          id="confirmed-profiles"
          className={styles.sectionBlock}
          aria-labelledby="confirmed-profiles-heading"
        >
          <div className="container">
            <div className={styles.contentCard}>
              <span className={styles.sectionEyebrow}>
                Confirmed External Profiles
              </span>
              <h2
                id="confirmed-profiles-heading"
                className={styles.sectionHeading}
              >
                Official &amp; Professional Profiles
              </h2>

              <div className={styles.externalProfilesGrid}>
                {member.confirmedProfiles.map((profile) => (
                  <a
                    key={profile.url}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalProfileLink}
                  >
                    <div>
                      <span className={styles.externalProfileLabel}>
                        {profile.label}
                      </span>
                      {profile.context && (
                        <span className={styles.externalProfileContext}>
                          {profile.context}
                        </span>
                      )}
                    </div>
                    <span
                      className={styles.externalProfileArrow}
                      aria-hidden="true"
                    >
                      &#8599;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Managing Committee Directory Links */}
      <section
        className={styles.sectionBlock}
        aria-labelledby="committee-directory-heading"
      >
        <div className="container">
          <div className={styles.contentCard}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <span className={styles.sectionEyebrow}>
                  Chapter Leadership
                </span>
                <h2
                  id="committee-directory-heading"
                  className={styles.sectionHeading}
                  style={{ marginBottom: 0 }}
                >
                  ISTD Thrissur Chapter Office Bearers
                </h2>
              </div>
              <Link href="/committee" className={styles.backLink}>
                <span>View Managing Committee Overview</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className={styles.peerGrid}>
              {OFFICE_BEARERS.map((peer) => {
                const isCurrent = peer.slug === member.slug;
                return (
                  <Link
                    key={peer.slug}
                    href={`/team/${peer.slug}`}
                    className={`${styles.peerCard} ${
                      isCurrent ? styles.peerCardActive : ''
                    }`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    <div>
                      <span className={styles.peerRole}>{peer.role}</span>
                      <h3 className={styles.peerName}>{peer.name}</h3>
                      <p className={styles.peerTitle}>
                        {peer.organisation || 'ISTD Thrissur Chapter'}
                      </p>
                    </div>
                    <span className={styles.peerAction}>
                      {isCurrent ? 'Current Profile' : 'View Profile →'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chapter Contact CTA */}
      <section
        className={styles.sectionBlock}
        aria-labelledby="chapter-contact-heading"
      >
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaTextWrap}>
              <span className={styles.sectionEyebrow}>
                Chapter Enquiries &amp; Collaboration
              </span>
              <h2 id="chapter-contact-heading" className={styles.ctaHeading}>
                Connect with ISTD Thrissur Chapter
              </h2>
              <p className={styles.ctaDescription}>
                For enquiries regarding chapter activities, professional
                learning programmes, campus collaborations, or membership,
                please reach out through the official ISTD Thrissur Chapter
                contact channel.
              </p>
            </div>
            <div className={styles.actionRow}>
              <Link href="/contact" className={styles.primaryBtn}>
                Contact Chapter
              </Link>
              <Link href="/committee" className={styles.secondaryBtn}>
                Back to Managing Committee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
