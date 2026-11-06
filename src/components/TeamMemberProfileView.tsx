import React from 'react';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import {
  CommitteeMember,
  OFFICE_BEARERS,
  assetUrl,
} from '@/data/siteData';
import { getTeamMemberJsonLd } from '@/lib/seoConfig';
import styles from './TeamMemberProfileView.module.css';

interface TeamMemberProfileViewProps {
  member: CommitteeMember;
}

export function TeamMemberProfileView({ member }: TeamMemberProfileViewProps) {
  const jsonLd = getTeamMemberJsonLd(member);
  const portraitSrc = assetUrl(member.avatar || '/images/logo-circle.png');
  const portraitAlt =
    member.avatarAlt ||
    `${member.name}, ${member.role} of ISTD Trichur Chapter`;
  const portraitWidth = member.avatarWidth || 400;
  const portraitHeight = member.avatarHeight || 400;

  const isZakkariya = member.slug === 'prof-dr-zakkariya-k-a';

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Executive Identity Header Section */}
      <section
        className={styles.headerSection}
        aria-labelledby="profile-main-heading"
      >
        <div className="container">
          <div className={styles.navRow}>
            <nav aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li>
                  <Link href="/" className={styles.breadcrumbLink}>
                    Home
                  </Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">
                  →
                </li>
                <li>
                  <Link href="/committee" className={styles.breadcrumbLink}>
                    Managing Committee
                  </Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">
                  →
                </li>
                <li className={styles.breadcrumbCurrent} aria-current="page">
                  {member.name}
                </li>
              </ol>
            </nav>

            <Link href="/committee" className={styles.backLink}>
              <span aria-hidden="true">←</span>
              <span>Back to Managing Committee</span>
            </Link>
          </div>

          {/* Executive Identity Card */}
          <div className={styles.identityCard}>
            <div className={styles.portraitCol}>
              <figure className={styles.portraitFrame}>
                <img
                  src={portraitSrc}
                  alt={portraitAlt}
                  width={portraitWidth}
                  height={portraitHeight}
                  fetchPriority="high"
                  decoding="async"
                  className={styles.portraitImg}
                />
              </figure>
            </div>

            <div className={styles.infoCol}>
              <div>
                <div className={styles.badgeRow}>
                  <span className={styles.roleBadge}>{member.role}</span>
                  {isZakkariya && (
                    <span className={styles.nationalBadge}>
                      National Vice President, ISTD
                    </span>
                  )}
                </div>

                <h1 id="profile-main-heading" className={styles.nameHeading}>
                  {member.name}
                </h1>

                <p className={styles.designationText}>
                  {member.role},{' '}
                  {member.organisation || 'ISTD Trichur Chapter'}
                  {isZakkariya ? ' • National Vice President, ISTD' : ''}
                </p>

                {member.supportingLine && (
                  <p className={styles.supportingText}>
                    {member.supportingLine}
                  </p>
                )}

                {member.shortBio && (
                  <p className={styles.summaryText}>{member.shortBio}</p>
                )}
              </div>

              <div className={styles.actionsBar}>
                <div className={styles.socialGroup}>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className={styles.linkedinIconOnly}
                      aria-label={`${member.name} on LinkedIn`}
                      title={`${member.name} — LinkedIn`}
                    >
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  )}

                  {member.confirmedProfiles &&
                    member.confirmedProfiles
                      .filter((p) => !p.url.includes('linkedin.com'))
                      .map((profile) => (
                        <a
                          key={profile.url}
                          href={profile.url}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className={styles.externalOrgPill}
                          title={`${member.name} — ${profile.label} Executive Profile`}
                        >
                          <span>{profile.label} Profile</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                </div>

                <div className={styles.ctaGroup}>
                  <Link href="/contact" className="btn btn-primary btn-sm">
                    Chapter Enquiry
                  </Link>
                  <Link href="/events" className="btn btn-outline-navy btn-sm">
                    Explore Programmes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Executive Profile Body Grid (7.2fr / 4.8fr) */}
      <section
        className={styles.bodySection}
        aria-label={`${member.name} Leadership Overview and Key Focus Areas`}
      >
        <div className="container">
          <div className={styles.bodyGrid}>
            {/* Main Left Column */}
            <div className={styles.mainCol}>
              {/* 1. Executive Leadership Overview */}
              {member.biography && member.biography.length > 0 && (
                <article
                  className={styles.contentCard}
                  aria-labelledby="executive-overview-heading"
                >
                  <div className={styles.cardHeader}>
                    <p className={styles.eyebrow}>EXECUTIVE PROFILE</p>
                    <h2
                      id="executive-overview-heading"
                      className={styles.cardTitle}
                    >
                      Leadership &amp; Professional Overview
                    </h2>
                  </div>
                  <div className={styles.overviewParagraphs}>
                    {member.biography.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )}

              {/* 2. Founding Vision / Leadership Mandate & Key Focus Areas */}
              {(member.responsibilities || member.chapterRoleSection) && (
                <article
                  className={styles.contentCard}
                  aria-labelledby="leadership-focus-heading"
                >
                  <div className={styles.cardHeader}>
                    <p className={styles.eyebrow}>
                      {member.slug === 'prof-dr-zakkariya-k-a'
                        ? 'VISIONARY STEWARDSHIP & MENTORSHIP'
                        : member.slug === 'tony-chacko'
                          ? 'CHAPTER GOVERNANCE & STRATEGY'
                          : 'CHAPTER STEWARDSHIP & INITIATIVES'}
                    </p>
                    <h2
                      id="leadership-focus-heading"
                      className={styles.cardTitle}
                    >
                      {member.slug === 'prof-dr-zakkariya-k-a'
                        ? 'Founding Vision & Institutional Mentorship'
                        : member.slug === 'tony-chacko'
                          ? 'Leadership Mandate & Strategic Focus Areas'
                          : 'Chapter Role & Key Focus Areas'}
                    </h2>
                  </div>

                  {member.chapterRoleSection && (
                    <div
                      className={styles.overviewParagraphs}
                      style={{
                        marginBottom: member.responsibilities
                          ? '1.35rem'
                          : '0',
                      }}
                    >
                      <p>{member.chapterRoleSection}</p>
                    </div>
                  )}

                  {member.responsibilities &&
                    member.responsibilities.length > 0 && (
                      <div className={styles.responsibilitiesList}>
                        {member.responsibilities.map((item) => (
                          <div
                            key={item.num}
                            className={styles.responsibilityRow}
                          >
                            <span className={styles.responsibilityNum}>
                              {item.num}
                            </span>
                            <div>
                              <h3 className={styles.responsibilityTitle}>
                                {item.title}
                              </h3>
                              <p className={styles.responsibilityDesc}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </article>
              )}

              {/* 3. Chapter Moments & Photo Gallery */}
              {member.featuredPhotos && member.featuredPhotos.length > 0 && (
                <article
                  className={styles.contentCard}
                  aria-labelledby="member-photos-heading"
                >
                  <div className={styles.cardHeader}>
                    <p className={styles.eyebrow}>
                      CHAPTER MOMENTS &amp; ARCHIVE
                    </p>
                    <h2
                      id="member-photos-heading"
                      className={styles.cardTitle}
                    >
                      Inauguration &amp; Chapter Activities
                    </h2>
                  </div>
                  <div className={styles.photosGrid}>
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
                        aspectRatio="16/11"
                      />
                    ))}
                  </div>
                </article>
              )}

              {/* 4. Academic / Career Milestones (if present) */}
              {member.careerHighlights && member.careerHighlights.length > 0 && (
                <article
                  className={styles.contentCard}
                  aria-labelledby="career-milestones-heading"
                >
                  <div className={styles.cardHeader}>
                    <p className={styles.eyebrow}>INSTITUTIONAL MILESTONES</p>
                    <h2
                      id="career-milestones-heading"
                      className={styles.cardTitle}
                    >
                      Key Leadership &amp; Academic Contributions
                    </h2>
                  </div>
                  <ul className={styles.bulletList}>
                    {member.careerHighlights.map((item, idx) => (
                      <li key={idx} className={styles.bulletItem}>
                        <span className={styles.bulletDot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>

            {/* Right Sidebar Column */}
            <aside className={styles.sideCol}>
              {/* 1. Professional Background: Organisations & Activities */}
              {member.professionalBackground &&
                member.professionalBackground.length > 0 && (
                  <div
                    className={styles.sideCard}
                    aria-labelledby="background-heading"
                  >
                    <div className={styles.cardHeader}>
                      <p className={styles.eyebrow}>PROFESSIONAL BACKGROUND</p>
                      <h2
                        id="background-heading"
                        className={styles.sideTitle}
                      >
                        Organisations &amp; Activities
                      </h2>
                    </div>
                    <ul className={styles.backgroundList} role="list">
                      {member.professionalBackground.map((item, idx) => (
                        <li
                          key={`${item.organisation}-${idx}`}
                          className={styles.backgroundItem}
                        >
                          <div className={styles.backgroundItemTop}>
                            <strong className={styles.backgroundItemOrg}>
                              {item.organisation}
                            </strong>
                            <span className={styles.backgroundItemBadge}>
                              {item.role}
                            </span>
                          </div>
                          <p className={styles.backgroundItemDesc}>
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* 2. Secondary Portrait (for Prof. Zakkariya's second photo at a separate location) */}
              {member.secondaryAvatar && (
                <div
                  className={styles.sideCard}
                  aria-label="Executive Portrait"
                >
                  <div className={styles.cardHeader}>
                    <p className={styles.eyebrow}>NATIONAL LEADERSHIP</p>
                    <h2 className={styles.sideTitle}>
                      National Vice President, ISTD
                    </h2>
                  </div>
                  <div className={styles.secondaryPortraitWrap}>
                    <img
                      src={assetUrl(member.secondaryAvatar)}
                      alt={
                        member.secondaryAvatarCaption ||
                        `${member.name} — National Vice President, ISTD`
                      }
                      className={styles.secondaryPortraitImg}
                      loading="lazy"
                    />
                    {member.secondaryAvatarCaption && (
                      <p className={styles.secondaryPortraitCaption}>
                        {member.secondaryAvatarCaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Academic Credentials (if present) */}
              {member.educationAndCredentials &&
                member.educationAndCredentials.length > 0 && (
                  <div
                    className={styles.sideCard}
                    aria-labelledby="credentials-heading"
                  >
                    <div className={styles.cardHeader}>
                      <p className={styles.eyebrow}>ACADEMIC CREDENTIALS</p>
                      <h2
                        id="credentials-heading"
                        className={styles.sideTitle}
                      >
                        Education &amp; Fellowships
                      </h2>
                    </div>
                    <ul className={styles.bulletList}>
                      {member.educationAndCredentials.map((cred, idx) => (
                        <li key={idx} className={styles.bulletItem}>
                          <span
                            className={styles.bulletDot}
                            aria-hidden="true"
                          />
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* 4. Areas of Focus & Expertise */}
              {member.expertiseDomains &&
                member.expertiseDomains.length > 0 && (
                  <div
                    className={styles.sideCard}
                    aria-labelledby="domains-heading"
                  >
                    <div className={styles.cardHeader}>
                      <p className={styles.eyebrow}>CORE DOMAINS</p>
                      <h2 id="domains-heading" className={styles.sideTitle}>
                        Focus Areas &amp; Expertise
                      </h2>
                    </div>
                    <div className={styles.domainsWrap}>
                      {member.expertiseDomains.map((domain) => (
                        <span key={domain} className={styles.domainChip}>
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* 5. ISTD Trichur Leadership Team Peer Directory (Strict Order: Founder -> Chairman -> Secretary -> Treasurer) */}
              <div
                className={styles.sideCard}
                aria-labelledby="team-directory-heading"
              >
                <div className={styles.cardHeader}>
                  <p className={styles.eyebrow}>EXECUTIVE LEADERSHIP</p>
                  <h2
                    id="team-directory-heading"
                    className={styles.sideTitle}
                  >
                    ISTD Trichur Leadership Team
                  </h2>
                </div>
                <ul className={styles.peerList} role="list">
                  {OFFICE_BEARERS.map((peer) => {
                    const isCurrent = peer.slug === member.slug;
                    return (
                      <li key={peer.id}>
                        <Link
                          href={`/team/${peer.slug}`}
                          className={`${styles.peerLink} ${
                            isCurrent ? styles.peerLinkCurrent : ''
                          }`}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          <img
                            src={assetUrl(
                              peer.avatar || '/images/logo-circle.png'
                            )}
                            alt={`${peer.name}, ${peer.role} of ISTD Trichur Chapter`}
                            width={46}
                            height={46}
                            className={styles.peerAvatar}
                          />
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div className={styles.peerName}>{peer.name}</div>
                            <div className={styles.peerRole}>
                              {peer.role}
                              {peer.slug === 'prof-dr-zakkariya-k-a'
                                ? ' • National VP, ISTD'
                                : ''}
                            </div>
                          </div>
                          <span className={styles.peerArrow} aria-hidden="true">
                            {isCurrent ? '●' : '→'}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>

          {/* Bottom Chapter Enquiries CTA */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <div>
                <p className={styles.ctaEyebrow}>
                  CHAPTER GOVERNANCE &amp; ENQUIRIES
                </p>
                <h2 className={styles.ctaHeading}>
                  Connect with ISTD Trichur Chapter
                </h2>
                <p className={styles.ctaText}>
                  For chapter programmes, institutional collaborations, campus
                  student chapters, or membership enquiries, connect with our
                  office bearers or return to the full Managing Committee
                  directory.
                </p>
              </div>
              <div className={styles.ctaGroup}>
                <Link href="/contact" className="btn btn-red">
                  Contact ISTD Trichur Chapter
                </Link>
                <Link href="/committee" className="btn btn-outline-white">
                  Managing Committee Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
