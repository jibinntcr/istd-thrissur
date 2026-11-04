'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChapterEvent, GalleryPhoto, assetUrl } from '@/data/siteData';
import type { CacheStats, EventRegistration } from '@/lib/backendStore';
import {
  fetchBackendStore,
  saveEventToBackend,
  removeEventFromBackend,
  savePhotoToBackend,
  removePhotoFromBackend,
  updateParticipantStatusInBackend,
  clearBackendCache,
  getAdminSession,
  setAdminSession,
  AdminSession,
} from '@/lib/clientBackendCache';
import { CaptchaChallenge } from './CaptchaChallenge';

type AdminTab = 'registrations' | 'events' | 'photos' | 'system';

export function AdminPortalClient() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginCaptchaValid, setLoginCaptchaValid] = useState(false);
  const [loginCaptchaReset, setLoginCaptchaReset] = useState(0);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Portal Data State
  const [activeTab, setActiveTab] = useState<AdminTab>('registrations');
  const [events, setEvents] = useState<ChapterEvent[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [statusBanner, setStatusBanner] = useState<string>('');

  // Registration Filters
  const [regEventFilter, setRegEventFilter] = useState<string>('all');
  const [regSearch, setRegSearch] = useState<string>('');

  // Event Form State
  const [editingEventSlug, setEditingEventSlug] = useState<string | null>(null);
  const [evTitle, setEvTitle] = useState('');
  const [evSlug, setEvSlug] = useState('');
  const [evSubtitle, setEvSubtitle] = useState('');
  const [evType, setEvType] = useState<ChapterEvent['programmeType']>('Webinar');
  const [evStatus, setEvStatus] = useState<'upcoming' | 'past'>('upcoming');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('7:00 PM – 8:00 PM IST');
  const [evVenue, setEvVenue] = useState('Google Meet (Online Session)');
  const [evSpeaker, setEvSpeaker] = useState('');
  const [evSpeakerDesig, setEvSpeakerDesig] = useState('');
  const [evShortDesc, setEvShortDesc] = useState('');
  const [evFullDesc, setEvFullDesc] = useState('');
  const [evImage, setEvImage] = useState('/images/event-aiot-boopathy.jpg');
  const [evImageCaption, setEvImageCaption] = useState('');
  const [evIsPoster, setEvIsPoster] = useState(true);
  const [evRegOpen, setEvRegOpen] = useState(true);

  // Photo Upload State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCategory, setPhotoCategory] =
    useState<GalleryPhoto['category']>('ceremony');
  const [photoMetaTag, setPhotoMetaTag] = useState('2026 • Thrissur');
  const [photoSrc, setPhotoSrc] = useState('');
  const [photoEventSlug, setPhotoEventSlug] = useState('');

  useEffect(() => {
    const existing = getAdminSession();
    setSession(existing);
    setAuthChecked(true);
    if (existing) {
      loadPortalData(false);
    }
  }, []);

  const loadPortalData = async (bypassCache = false) => {
    const { data, cacheStats: stats } = await fetchBackendStore(bypassCache);
    setEvents(data.events || []);
    setPhotos(data.galleryPhotos || []);
    setRegistrations(data.registrations || []);
    setCacheStats(stats);
  };

  const showToast = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => {
      setStatusBanner('');
    }, 5000);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginCaptchaValid) {
      setLoginError('Please complete the security CAPTCHA verification code.');
      return;
    }

    setLoginLoading(true);
    try {
      const normalized = loginEmail.trim().toLowerCase();
      let newSession: AdminSession | null = null;

      try {
        const res = await fetch('/api/backend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'admin_login',
            payload: { email: normalized, password: loginPassword },
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.ok && json?.session) {
            newSession = json.session;
          }
        }
      } catch {
        // Fallback client check when running on static hosting
      }

      if (!newSession) {
        const allowed =
          normalized === 'admin@istdthrissur.org' ||
          normalized === 'jibintcr@gmail.com' ||
          normalized === 'tonychacko67@gmail.com' ||
          normalized === 'admin';

        if (allowed && loginPassword === 'ISTD@Thrissur2026') {
          newSession = {
            email: normalized,
            name:
              normalized === 'tonychacko67@gmail.com'
                ? 'Shri. Tony Chacko (Chairman)'
                : normalized === 'jibintcr@gmail.com'
                ? 'Mr. Jibin N (Treasurer)'
                : 'ISTD Thrissur Chapter Admin',
            role: 'Chapter Administrator',
            loggedInAt: new Date().toISOString(),
          };
        }
      }

      if (!newSession) {
        setLoginError(
          'Invalid credentials. Use admin@istdthrissur.org (or jibintcr@gmail.com) and password ISTD@Thrissur2026.'
        );
        setLoginCaptchaReset((c) => c + 1);
        setLoginLoading(false);
        return;
      }

      setAdminSession(newSession);
      setSession(newSession);
      await loadPortalData(false);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminSession(null);
    setSession(null);
    setLoginPassword('');
    setLoginCaptchaReset((c) => c + 1);
  };

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim()) return;
    const computedSlug =
      evSlug.trim() ||
      evTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const paragraphs = evFullDesc
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const existing = events.find((item) => item.slug === computedSlug);

    const newEvent: ChapterEvent = {
      id: existing?.id || `event-${Date.now()}`,
      slug: computedSlug,
      status: evStatus,
      title: evTitle.trim(),
      subtitleQuestion: evSubtitle.trim() || undefined,
      programmeType: evType,
      date: evDate.trim(),
      timeIST: evTime.trim(),
      venue: evVenue.trim(),
      speaker: evSpeaker.trim() || undefined,
      speakerDesignation: evSpeakerDesig.trim() || undefined,
      shortDescription: evShortDesc.trim(),
      fullDescription: paragraphs.length ? paragraphs : [evShortDesc.trim()],
      image: evImage.trim() || '/images/event-aiot-boopathy.jpg',
      imageCaption: evImageCaption.trim() || `${evTitle.trim()} (${evDate.trim()})`,
      isPosterImage: evIsPoster,
      registrationAvailable: evStatus === 'upcoming' ? evRegOpen : false,
      hasPhotoGallery: existing?.hasPhotoGallery || false,
      eventPhotos: existing?.eventPhotos || [
        {
          src: evImage.trim() || '/images/event-aiot-boopathy.jpg',
          title: evTitle.trim(),
          caption: evImageCaption.trim() || `${evTitle.trim()} (${evDate.trim()})`,
          category: evIsPoster ? 'Event Poster' : 'Event Photograph',
        },
      ],
    };

    await saveEventToBackend(newEvent);
    await loadPortalData(true);
    resetEventForm();
    showToast(
      `✓ Saved "${newEvent.title}" (${
        newEvent.status === 'upcoming' ? 'Upcoming Event' : 'Past Event Report'
      }) and invalidated backend cache.`
    );
  };

  const resetEventForm = () => {
    setEditingEventSlug(null);
    setEvTitle('');
    setEvSlug('');
    setEvSubtitle('');
    setEvType('Webinar');
    setEvStatus('upcoming');
    setEvDate('');
    setEvTime('7:00 PM – 8:00 PM IST');
    setEvVenue('Google Meet (Online Session)');
    setEvSpeaker('');
    setEvSpeakerDesig('');
    setEvShortDesc('');
    setEvFullDesc('');
    setEvImage('/images/event-aiot-boopathy.jpg');
    setEvImageCaption('');
    setEvIsPoster(true);
    setEvRegOpen(true);
  };

  const startEditEvent = (ev: ChapterEvent) => {
    setEditingEventSlug(ev.slug);
    setEvTitle(ev.title);
    setEvSlug(ev.slug);
    setEvSubtitle(ev.subtitleQuestion || '');
    setEvType(ev.programmeType);
    setEvStatus(ev.status);
    setEvDate(ev.date);
    setEvTime(ev.timeIST);
    setEvVenue(ev.venue);
    setEvSpeaker(ev.speaker || '');
    setEvSpeakerDesig(ev.speakerDesignation || '');
    setEvShortDesc(ev.shortDescription);
    setEvFullDesc((ev.fullDescription || []).join('\n\n'));
    setEvImage(ev.image);
    setEvImageCaption(ev.imageCaption);
    setEvIsPoster(Boolean(ev.isPosterImage));
    setEvRegOpen(Boolean(ev.registrationAvailable));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleToggleEventStatus = async (ev: ChapterEvent) => {
    const updated: ChapterEvent = {
      ...ev,
      status: ev.status === 'upcoming' ? 'past' : 'upcoming',
      registrationAvailable: ev.status === 'upcoming' ? false : true,
    };
    await saveEventToBackend(updated);
    await loadPortalData(true);
    showToast(
      `✓ Moved "${ev.title}" to ${
        updated.status === 'upcoming' ? 'Upcoming Events' : 'Completed Past Event Reports'
      }.`
    );
  };

  const handleDeleteEvent = async (slug: string, title: string) => {
    await removeEventFromBackend(slug);
    await loadPortalData(true);
    showToast(`✓ Removed event "${title}" and refreshed cache.`);
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim() || !photoSrc.trim()) return;

    const categoryLabels: Record<GalleryPhoto['category'], string> = {
      ceremony: 'Inaugural Ceremony',
      addresses: 'Addresses & Dais',
      oath: 'Oath of Office',
      felicitations: 'Felicitations',
      portraits: 'Group Photographs',
    };

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      src: photoSrc.trim(),
      title: photoTitle.trim(),
      shortDesc: photoCaption.trim() || photoTitle.trim(),
      caption: photoCaption.trim() || photoTitle.trim(),
      category: photoCategory,
      categoryLabel: categoryLabels[photoCategory] || 'Event Photograph',
      metaTag: photoMetaTag.trim() || '2026 • Thrissur',
      keywords: `${photoTitle} ${photoCaption} ${photoMetaTag}`.toLowerCase(),
    };

    await savePhotoToBackend(newPhoto, photoEventSlug || undefined);
    await loadPortalData(true);
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoSrc('');
    showToast(
      `✓ Added photograph "${newPhoto.title}" ${
        photoEventSlug ? `to event "${photoEventSlug}" and ` : ''
      }to the Chapter Gallery.`
    );
  };

  const handleDeletePhoto = async (id: string, title: string) => {
    await removePhotoFromBackend(id);
    await loadPortalData(true);
    showToast(`✓ Removed photograph "${title}".`);
  };

  const handleExportRegistrationsCsv = () => {
    const headers = [
      'Registration ID',
      'Status',
      'Event Title',
      'Event Date',
      'Salutation',
      'Full Name',
      'DOB',
      'Gender',
      'Email',
      'Phone',
      'WhatsApp',
      'District',
      'City',
      'State',
      'Category',
      'Organisation',
      'Designation',
      'Experience',
      'ISTD Member',
      'ISTD Membership No',
      'Certificate Requested',
      'Expectations',
      'Referral Source',
      'Registered At',
    ];

    const rows = filteredRegistrations.map((r) => [
      r.registrationCode,
      r.status,
      r.eventTitle,
      r.eventDate,
      r.salutation,
      r.fullName,
      r.dob,
      r.gender || '',
      r.email,
      r.phone,
      r.whatsapp,
      r.district,
      r.city || '',
      r.state,
      r.participantCategory,
      r.organization,
      r.designation,
      r.experienceYears,
      r.isIstdMember,
      r.istdMembershipNo || '',
      r.requireCertificate ? 'Yes' : 'No',
      r.expectations || '',
      r.referralSource || '',
      r.createdAt,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISTD-Thrissur-Registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportDatabaseJson = () => {
    const payload = {
      events,
      galleryPhotos: photos,
      registrations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `istd-thrissur-mongodb-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredRegistrations = registrations.filter((r) => {
    if (regEventFilter !== 'all' && r.eventSlug !== regEventFilter) return false;
    if (!regSearch.trim()) return true;
    const q = regSearch.toLowerCase();
    return `${r.registrationCode} ${r.fullName} ${r.email} ${r.phone} ${r.whatsapp} ${r.district} ${r.organization}`
      .toLowerCase()
      .includes(q);
  });

  if (!authChecked) {
    return null;
  }

  // ============================================================================
  // VIEW 1: ADMIN LOGIN WITH CAPTCHA CHALLENGE
  // ============================================================================
  if (!session) {
    return (
      <section className="section-padding bg-pale-blue">
        <div className="container" style={{ maxWidth: '540px' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-border)',
              borderTop: '5px solid var(--brand-navy)',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 0.85rem',
                  borderRadius: '50%',
                  border: '2px solid var(--color-border)',
                  padding: '4px',
                  background: '#FFFFFF',
                }}
              >
                <img
                  src={assetUrl('/images/logo-circle.png')}
                  alt="ISTD Seal"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="section-tag tag-blue">Chapter Administration</span>
              <h1
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.35rem',
                }}
              >
                ISTD Thrissur Backend Portal
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: 0 }}>
                Sign in to manage Upcoming Events, Completed Event Reports, Event Photographs,
                Participant Registrations, and MongoDB Cache.
              </p>
            </div>

            {loginError && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  marginBottom: '1.15rem',
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Administrator Email / ID *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="admin@istdthrissur.org or jibintcr@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              {/* Security CAPTCHA Verification */}
              <CaptchaChallenge
                onVerifyChange={setLoginCaptchaValid}
                resetSignal={loginCaptchaReset}
                label="Admin Login CAPTCHA Verification *"
              />

              <button
                type="submit"
                disabled={loginLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
              >
                {loginLoading ? 'Verifying Credentials...' : 'Sign In to Backend Portal →'}
              </button>
            </form>

            {/* Quick Fill Helper for Chapter Office Bearers */}
            <div
              style={{
                marginTop: '1.35rem',
                paddingTop: '1.15rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap',
                fontSize: '0.8rem',
                color: 'var(--color-muted)',
              }}
            >
              <span>
                Default Admin: <strong>admin@istdthrissur.org</strong> /{' '}
                <code>ISTD@Thrissur2026</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('jibintcr@gmail.com');
                  setLoginPassword('ISTD@Thrissur2026');
                }}
                className="btn btn-outline-navy btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              >
                Auto-Fill Credentials
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // VIEW 2: AUTHENTICATED ADMIN BACKEND DASHBOARD
  // ============================================================================
  const upcomingCount = events.filter((e) => e.status === 'upcoming').length;
  const pastCount = events.filter((e) => e.status === 'past').length;

  return (
    <section className="section-padding-sm bg-pale-blue" style={{ minHeight: '82vh' }}>
      <div className="container">
        {/* Top Admin Status Bar */}
        <div
          style={{
            background: 'var(--brand-navy)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '1.35rem 1.75rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                }}
              >
                ● Backend Online
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  color: '#FACC15',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                }}
              >
                ⚡ Cache TTL: {cacheStats?.ttlSeconds || 60}s (Hits: {cacheStats?.hits || 0})
              </span>
              <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
                Signed in as <strong>{session.name}</strong>
              </span>
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: '0.35rem 0 0' }}>
              ISTD Thrissur Chapter — Content &amp; Registration Backend
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={async () => {
                const stats = await clearBackendCache();
                setCacheStats(stats);
                await loadPortalData(true);
                showToast('✓ Backend & client cache cleared and reloaded from database.');
              }}
              className="btn btn-outline-white btn-sm"
            >
              ⚡ Flush Cache &amp; Sync
            </button>
            <Link href="/events" className="btn btn-outline-white btn-sm">
              View Live Events ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-red btn-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        {statusBanner && (
          <div
            style={{
              background: '#ECFDF5',
              border: '1.5px solid #10B981',
              color: '#065F46',
              padding: '0.9rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '1.25rem',
            }}
          >
            {statusBanner}
          </div>
        )}

        {/* KPI Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="CleanCard" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              Participant Registrations
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-blue)' }}>
              {registrations.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Stored in MongoDB / Backend Store
            </div>
          </div>

          <div className="CleanCard" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              Upcoming Events
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#047857' }}>
              {upcomingCount}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Active registration enabled
            </div>
          </div>

          <div className="CleanCard" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              Past Event Reports
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-navy)' }}>
              {pastCount}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Published reports &amp; archives
            </div>
          </div>

          <div className="CleanCard" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              Event &amp; Gallery Photos
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-red)' }}>
              {photos.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Indexed with factual captions
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
            background: '#FFFFFF',
            padding: '0.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`btn btn-sm ${
              activeTab === 'registrations' ? 'btn-primary' : 'btn-outline-navy'
            }`}
          >
            📋 Participant Registrations ({registrations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`btn btn-sm ${
              activeTab === 'events' ? 'btn-primary' : 'btn-outline-navy'
            }`}
          >
            📅 Upcoming Events &amp; Past Reports ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`btn btn-sm ${
              activeTab === 'photos' ? 'btn-primary' : 'btn-outline-navy'
            }`}
          >
            🖼️ Add Event Photos &amp; Gallery ({photos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`btn btn-sm ${
              activeTab === 'system' ? 'btn-primary' : 'btn-outline-navy'
            }`}
          >
            🗄️ MongoDB &amp; Cache Settings
          </button>
        </div>

        {/* ===================================================================
            TAB 1: PARTICIPANT REGISTRATIONS
           =================================================================== */}
        {activeTab === 'registrations' && (
          <div className="CleanCard">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                  Event Participant Registrations
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginBottom: 0 }}>
                  View and export participant details (Name, DOB, Phone, WhatsApp, Email, District,
                  Organisation, ISTD Membership, and Certificate Status).
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportRegistrationsCsv}
                className="btn btn-primary btn-sm"
              >
                ⬇ Export Registrations to CSV / Excel
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.25rem',
                padding: '1rem',
                background: 'var(--color-surface-soft)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div>
                <label className="form-label">Filter by Event</label>
                <select
                  className="form-control"
                  value={regEventFilter}
                  onChange={(e) => setRegEventFilter(e.target.value)}
                >
                  <option value="all">All Events ({registrations.length})</option>
                  {events.map((ev) => (
                    <option key={ev.slug} value={ev.slug}>
                      {ev.title} ({ev.date})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">
                  Search by Name, Phone, WhatsApp, Email, District or ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search participants..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredRegistrations.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  color: 'var(--color-muted)',
                }}
              >
                No participant registrations match the current filter.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.85rem',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: 'var(--bg-pale-blue)',
                        textAlign: 'left',
                        borderBottom: '2px solid var(--color-border)',
                      }}
                    >
                      <th style={{ padding: '0.75rem' }}>Reg. ID &amp; Date</th>
                      <th style={{ padding: '0.75rem' }}>Participant &amp; DOB</th>
                      <th style={{ padding: '0.75rem' }}>Contact &amp; WhatsApp</th>
                      <th style={{ padding: '0.75rem' }}>District &amp; Location</th>
                      <th style={{ padding: '0.75rem' }}>Organisation &amp; Category</th>
                      <th style={{ padding: '0.75rem' }}>Event</th>
                      <th style={{ padding: '0.75rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr
                        key={reg.id}
                        style={{ borderBottom: '1px solid var(--color-border)' }}
                      >
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <strong style={{ color: 'var(--brand-navy)', display: 'block' }}>
                            {reg.registrationCode}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                            {new Date(reg.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <strong style={{ color: 'var(--color-ink)', display: 'block' }}>
                            {reg.salutation} {reg.fullName}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                            DOB: {reg.dob} {reg.gender ? `• ${reg.gender}` : ''}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <div>📧 {reg.email}</div>
                          <div>📞 {reg.phone}</div>
                          <div style={{ color: '#047857', fontWeight: 600 }}>
                            💬 WA: {reg.whatsapp}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <strong>{reg.district}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                            {reg.city ? `${reg.city}, ` : ''}
                            {reg.state}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <strong>{reg.organization}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-body)' }}>
                            {reg.designation} ({reg.experienceYears})
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--brand-blue)' }}>
                            {reg.participantCategory} • ISTD: {reg.isIstdMember}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <strong style={{ fontSize: '0.82rem' }}>{reg.eventTitle}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                            {reg.eventDate} • Cert: {reg.requireCertificate ? 'Yes' : 'No'}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                          <select
                            className="form-control"
                            style={{ padding: '0.35rem 0.5rem', fontSize: '0.78rem', minWidth: '135px' }}
                            value={reg.status}
                            onChange={async (e) => {
                              const nextStatus = e.target.value as EventRegistration['status'];
                              await updateParticipantStatusInBackend(reg.id, nextStatus);
                              await loadPortalData(true);
                              showToast(
                                `✓ Updated status for ${reg.fullName} to "${nextStatus}".`
                              );
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Attended">Attended</option>
                            <option value="Certificate Issued">Certificate Issued</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 2: MANAGE UPCOMING EVENTS & PAST EVENT REPORTS
           =================================================================== */}
        {activeTab === 'events' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>
            {/* Form to Add / Edit Event or Report */}
            <div className="CleanCard">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <span className="section-tag tag-blue">
                    {editingEventSlug ? 'Edit Event / Report' : 'Create Event or Report'}
                  </span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 0 }}>
                    {editingEventSlug
                      ? `Editing: ${evTitle}`
                      : 'Add New Upcoming Event or Completed Event Report'}
                  </h2>
                </div>
                {editingEventSlug && (
                  <button
                    type="button"
                    onClick={resetEventForm}
                    className="btn btn-outline-navy btn-sm"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveEvent}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Event Status *</label>
                    <select
                      className="form-control"
                      value={evStatus}
                      onChange={(e) => setEvStatus(e.target.value as 'upcoming' | 'past')}
                    >
                      <option value="upcoming">Upcoming Event (Registration Open)</option>
                      <option value="past">Past Event &amp; Completed Report</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Programme Type *</label>
                    <select
                      className="form-control"
                      value={evType}
                      onChange={(e) =>
                        setEvType(e.target.value as ChapterEvent['programmeType'])
                      }
                    >
                      <option value="Webinar">Webinar</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Special Session">Special Session</option>
                      <option value="57th Foundation Day Session">
                        57th Foundation Day Session
                      </option>
                      <option value="Conference">Conference</option>
                      <option value="Chapter Milestone">Chapter Milestone</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Event Date *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., 10 November 2026"
                      value={evDate}
                      onChange={(e) => setEvDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Time (IST) *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., 7:00 PM – 8:00 PM IST"
                      value={evTime}
                      onChange={(e) => setEvTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Event / Session Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full event title"
                      value={evTitle}
                      onChange={(e) => setEvTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">URL Slug (Auto-generated if blank)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., advancing-aiot-research"
                      value={evSlug}
                      onChange={(e) => setEvSlug(e.target.value)}
                    />
                  </div>
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
                    <label className="form-label">Resource Person / Speaker Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Boopathy / Dr. Ashik Kareem"
                      value={evSpeaker}
                      onChange={(e) => setEvSpeaker(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Speaker Designation &amp; Organisation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., CTO, Monzha Research Labs Pvt. Ltd."
                      value={evSpeakerDesig}
                      onChange={(e) => setEvSpeakerDesig(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Venue / Online Platform *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Google Meet (Online Session)"
                      value={evVenue}
                      onChange={(e) => setEvVenue(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Opening Subtitle Question (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., How can intelligent algorithms translate into real-world applications?"
                    value={evSubtitle}
                    onChange={(e) => setEvSubtitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Card Summary *</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Brief 1–2 sentence overview shown on event cards"
                    value={evShortDesc}
                    onChange={(e) => setEvShortDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Full Event Details / Completed Event Report Paragraphs *
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Enter full event description or post-event report proceedings (separate paragraphs with a new line)"
                    value={evFullDesc}
                    onChange={(e) => setEvFullDesc(e.target.value)}
                    required
                  />
                </div>

                {/* Poster / Image Upload or Path */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: 'var(--color-surface-soft)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <label className="form-label">Upload Event Poster / Cover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) => setEvImage(dataUrl))
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label">Or Image Path / URL *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="/images/event-aiot-boopathy.jpg"
                      value={evImage}
                      onChange={(e) => setEvImage(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Image Caption</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Official poster / photo caption"
                      value={evImageCaption}
                      onChange={(e) => setEvImageCaption(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.25rem',
                  }}
                >
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={evIsPoster}
                      onChange={(e) => setEvIsPoster(e.target.checked)}
                    />
                    Display as Full Uncropped Event Poster
                  </label>
                  {evStatus === 'upcoming' && (
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.88rem' }}>
                      <input
                        type="checkbox"
                        checked={evRegOpen}
                        onChange={(e) => setEvRegOpen(e.target.checked)}
                      />
                      Enable Participant Registration Form
                    </label>
                  )}
                </div>

                <button type="submit" className="btn btn-red">
                  {editingEventSlug ? 'Update Event / Report →' : '+ Publish Event / Report →'}
                </button>
              </form>
            </div>

            {/* Existing Events List */}
            <div className="CleanCard">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
                Published Events &amp; Reports ({events.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {events.map((ev) => (
                  <div
                    key={ev.slug}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'var(--color-surface-soft)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1', minWidth: '260px' }}>
                      <img
                        src={assetUrl(ev.image)}
                        alt={ev.title}
                        style={{
                          width: '68px',
                          height: '68px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-sm)',
                          background: '#071524',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '0.15rem 0.55rem',
                              borderRadius: '999px',
                              background: ev.status === 'upcoming' ? '#ECFDF5' : '#EFF6FF',
                              color: ev.status === 'upcoming' ? '#047857' : '#1D4ED8',
                            }}
                          >
                            {ev.status === 'upcoming' ? '● Upcoming Event' : '✓ Past Report'}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                            {ev.date} • {ev.timeIST}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.02rem', fontWeight: 800, margin: 0 }}>
                          {ev.title}
                        </h4>
                        {ev.speaker && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 600 }}>
                            🎙️ {ev.speaker} {ev.speakerDesignation ? `— ${ev.speakerDesignation}` : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Link
                        href={`/events/${ev.slug}`}
                        className="btn btn-outline-navy btn-sm"
                      >
                        View Page ↗
                      </Link>
                      <button
                        type="button"
                        onClick={() => startEditEvent(ev)}
                        className="btn btn-outline-blue btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleEventStatus(ev)}
                        className="btn btn-primary btn-sm"
                      >
                        {ev.status === 'upcoming'
                          ? 'Move to Past Report'
                          : 'Move to Upcoming'}
                      </button>
                      {ev.slug !== 'inauguration' && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.slug, ev.title)}
                          className="btn btn-outline-navy btn-sm"
                          style={{ color: '#B91C1C', borderColor: '#FECACA' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: EVENT PHOTOS & GALLERY MANAGER
           =================================================================== */}
        {activeTab === 'photos' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>
            <div className="CleanCard">
              <span className="section-tag tag-blue">Upload Photographs</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Add Event Photograph to Event Page &amp; Chapter Gallery
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                Upload photographs from your computer or paste an image path/URL, assign it to an
                event report, and publish it to the gallery.
              </p>

              <form onSubmit={handleAddPhoto}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Photo Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Interactive Q&A Session During AIoT Webinar"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Gallery Category *</label>
                    <select
                      className="form-control"
                      value={photoCategory}
                      onChange={(e) =>
                        setPhotoCategory(e.target.value as GalleryPhoto['category'])
                      }
                    >
                      <option value="ceremony">Inaugural Ceremony</option>
                      <option value="addresses">Addresses &amp; Sessions</option>
                      <option value="oath">Oath of Office</option>
                      <option value="felicitations">Felicitations</option>
                      <option value="portraits">Group Photographs</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Attach to Specific Event (Optional)</label>
                    <select
                      className="form-control"
                      value={photoEventSlug}
                      onChange={(e) => setPhotoEventSlug(e.target.value)}
                    >
                      <option value="">Main Gallery Only</option>
                      {events.map((ev) => (
                        <option key={ev.slug} value={ev.slug}>
                          {ev.title} ({ev.date})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Date &amp; Venue Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., 10 November 2026 • Online"
                      value={photoMetaTag}
                      onChange={(e) => setPhotoMetaTag(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Factual Caption (Occasion &amp; People) *</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Describe the occasion and identify the speakers/participants in the photograph"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    required
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                    padding: '1rem',
                    background: 'var(--color-surface-soft)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <label className="form-label">Upload Image File from Computer</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) => setPhotoSrc(dataUrl))
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label">Or Image Path / URL *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="/photos/istd-22.jpeg or https://..."
                      value={photoSrc}
                      onChange={(e) => setPhotoSrc(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-red">
                  + Upload &amp; Publish Photograph →
                </button>
              </form>
            </div>

            <div className="CleanCard">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
                Current Gallery Photographs ({photos.length})
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1rem',
                }}
              >
                {photos.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <img
                        src={assetUrl(p.src)}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div style={{ padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
                          {p.categoryLabel}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-ink)', marginTop: '0.15rem' }}>
                          {p.title}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '0.5rem 0.75rem', borderTop: '1px solid var(--color-border)' }}>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(p.id, p.title)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#B91C1C',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: MONGODB & CACHE SETTINGS
           =================================================================== */}
        {activeTab === 'system' && (
          <div className="CleanCard">
            <span className="section-tag tag-blue">Database &amp; Caching Architecture</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              MongoDB Collections &amp; Server Cache Controls
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', marginBottom: '1.5rem' }}>
              The backend uses the official <code>mongodb</code> driver (`src/lib/mongodb.ts`) with
              connection pooling and an automatic 60-second TTL cache (`src/lib/backendStore.ts`)
              that invalidates immediately whenever events, photos, or participant registrations are
              updated.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--color-surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  🗄️ MongoDB Storage Status
                </h4>
                <div style={{ fontSize: '0.86rem', lineHeight: 1.7 }}>
                  <div>
                    <strong>Active Engine:</strong>{' '}
                    {cacheStats?.storageEngine || 'MongoDB-Compatible Store'}
                  </div>
                  <div>
                    <strong>Database Name:</strong> <code>istd_thrissur</code>
                  </div>
                  <div>
                    <strong>Collections:</strong> <code>events</code> ({events.length}),{' '}
                    <code>registrations</code> ({registrations.length}),{' '}
                    <code>gallery_photos</code> ({photos.length})
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--color-surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  ⚡ Cache Layer Performance
                </h4>
                <div style={{ fontSize: '0.86rem', lineHeight: 1.7 }}>
                  <div>
                    <strong>Cache Hits / Misses:</strong> {cacheStats?.hits || 0} hits /{' '}
                    {cacheStats?.misses || 0} misses
                  </div>
                  <div>
                    <strong>Cache TTL:</strong> {cacheStats?.ttlSeconds || 60} seconds
                  </div>
                  <div>
                    <strong>Last Invalidated:</strong>{' '}
                    {cacheStats?.lastInvalidatedAt
                      ? new Date(cacheStats.lastInvalidatedAt).toLocaleTimeString()
                      : 'Just now'}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '1.25rem',
                background: '#0B2239',
                color: '#F8FAFC',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ color: '#FACC15', fontWeight: 800, marginBottom: '0.35rem' }}>
                MongoDB Atlas Environment Configuration (`.env.local`):
              </div>
              <code style={{ display: 'block', whiteSpace: 'pre-wrap', color: '#E2E8F0' }}>
                {`MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/istd_thrissur?retryWrites=true&w=majority"\nMONGODB_DB="istd_thrissur"\nADMIN_EMAIL="admin@istdthrissur.org"\nADMIN_PASSWORD="ISTD@Thrissur2026"`}
              </code>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleExportDatabaseJson}
                className="btn btn-primary btn-sm"
              >
                ⬇ Download Full MongoDB JSON Backup
              </button>
              <button
                type="button"
                onClick={async () => {
                  const stats = await clearBackendCache();
                  setCacheStats(stats);
                  await loadPortalData(true);
                  showToast('✓ Cache flushed and reloaded.');
                }}
                className="btn btn-outline-navy btn-sm"
              >
                ⚡ Flush Server &amp; Client Cache
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
