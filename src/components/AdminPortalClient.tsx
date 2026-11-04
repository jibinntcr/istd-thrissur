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

type AdminModule =
  | 'overview'
  | 'upcoming'
  | 'reports'
  | 'registrations'
  | 'photos'
  | 'system';

export function AdminPortalClient() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginCaptchaValid, setLoginCaptchaValid] = useState(false);
  const [loginCaptchaReset, setLoginCaptchaReset] = useState(0);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Portal Navigation & Data State
  const [activeModule, setActiveModule] = useState<AdminModule>('overview');
  const [events, setEvents] = useState<ChapterEvent[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [statusBanner, setStatusBanner] = useState<string>('');

  // Registration Filters & Selected Participant Modal
  const [regEventFilter, setRegEventFilter] = useState<string>('all');
  const [regStatusFilter, setRegStatusFilter] = useState<string>('all');
  const [regSearch, setRegSearch] = useState<string>('');
  const [selectedRegistration, setSelectedRegistration] =
    useState<EventRegistration | null>(null);

  // Event / Report Editor Panel State
  const [showEventEditor, setShowEventEditor] = useState(false);
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
  const [evHighlights, setEvHighlights] = useState('');
  const [evImage, setEvImage] = useState('/images/event-aiot-boopathy.jpg');
  const [evImageCaption, setEvImageCaption] = useState('');
  const [evIsPoster, setEvIsPoster] = useState(true);
  const [evRegOpen, setEvRegOpen] = useState(true);

  // Photo Upload & Filter State
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<string>('all');
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

  const switchModule = (mod: AdminModule) => {
    setActiveModule(mod);
    setSidebarOpen(false);
    setShowEventEditor(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // Static hosting fallback
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

  const openNewEventCreator = (targetStatus: 'upcoming' | 'past') => {
    resetEventForm(targetStatus);
    setActiveModule(targetStatus === 'upcoming' ? 'upcoming' : 'reports');
    setShowEventEditor(true);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetEventForm = (defaultStatus: 'upcoming' | 'past' = 'upcoming') => {
    setEditingEventSlug(null);
    setEvTitle('');
    setEvSlug('');
    setEvSubtitle('');
    setEvType('Webinar');
    setEvStatus(defaultStatus);
    setEvDate('');
    setEvTime('7:00 PM – 8:00 PM IST');
    setEvVenue('Google Meet (Online Session)');
    setEvSpeaker('');
    setEvSpeakerDesig('');
    setEvShortDesc('');
    setEvFullDesc('');
    setEvHighlights('');
    setEvImage('/images/event-aiot-boopathy.jpg');
    setEvImageCaption('');
    setEvIsPoster(true);
    setEvRegOpen(defaultStatus === 'upcoming');
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
    setEvHighlights((ev.highlights || []).join('\n'));
    setEvImage(ev.image);
    setEvImageCaption(ev.imageCaption);
    setEvIsPoster(Boolean(ev.isPosterImage));
    setEvRegOpen(Boolean(ev.registrationAvailable));
    setActiveModule(ev.status === 'upcoming' ? 'upcoming' : 'reports');
    setShowEventEditor(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const highlightItems = evHighlights
      .split('\n')
      .map((h) => h.trim())
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
      highlights: highlightItems.length ? highlightItems : existing?.highlights,
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
    setShowEventEditor(false);
    resetEventForm(evStatus);
    showToast(
      `✓ Saved "${newEvent.title}" (${
        newEvent.status === 'upcoming' ? 'Upcoming Event' : 'Past Event Report'
      }) and refreshed cache.`
    );
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
        updated.status === 'upcoming' ? 'Upcoming Events' : 'Past Event Reports'
      }.`
    );
  };

  const handleDeleteEvent = async (slug: string, title: string) => {
    await removeEventFromBackend(slug);
    await loadPortalData(true);
    showToast(`✓ Deleted "${title}" and invalidated cache.`);
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim() || !photoSrc.trim()) return;

    const categoryLabels: Record<GalleryPhoto['category'], string> = {
      ceremony: 'Inaugural Ceremony',
      addresses: 'Addresses & Sessions',
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
    setShowPhotoUploader(false);
    showToast(
      `✓ Uploaded "${newPhoto.title}" ${
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
      'Registration Pass ID',
      'Unique Participant ID',
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
      r.participantCode || r.registrationCode.replace('TCR', 'PID'),
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

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  const filteredRegistrations = registrations.filter((r) => {
    if (regEventFilter !== 'all' && r.eventSlug !== regEventFilter) return false;
    if (regStatusFilter !== 'all' && r.status !== regStatusFilter) return false;
    if (!regSearch.trim()) return true;
    const q = regSearch.toLowerCase();
    return `${r.registrationCode} ${r.fullName} ${r.email} ${r.phone} ${r.whatsapp} ${r.district} ${r.organization}`
      .toLowerCase()
      .includes(q);
  });

  const filteredPhotos = photos.filter((p) => {
    if (photoCategoryFilter === 'all') return true;
    return p.category === photoCategoryFilter;
  });

  if (!authChecked) {
    return null;
  }

  // ============================================================================
  // VIEW 1: STANDALONE SPLIT-SCREEN ADMIN CONSOLE LOGIN (NO PUBLIC MENUS)
  // ============================================================================
  if (!session) {
    return (
      <div className="admin-auth-shell">
        <div className="admin-auth-grid">
          {/* Left Brand & System Info Column */}
          <div className="admin-auth-brand">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    padding: '4px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.28)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={assetUrl('/images/logo-circle.png')}
                    alt="ISTD Seal"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: 'rgba(250, 204, 21, 0.18)',
                      color: '#FACC15',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Official Backend Console
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
                    ISTD Thrissur Chapter
                  </div>
                </div>
              </div>

              <h1
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  marginBottom: '0.85rem',
                }}
              >
                Chapter Content &amp; Registration Portal
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Dedicated administration environment for managing chapter programmes, participant
                registrations, event reports, and official photographs.
              </p>

              <div style={{ display: 'grid', gap: '0.85rem' }}>
                {[
                  {
                    icon: '📅',
                    title: 'Upcoming Events & Registration',
                    desc: 'Publish webinars/workshops and enable participant registration.',
                  },
                  {
                    icon: '📑',
                    title: 'Completed Event Reports',
                    desc: 'Publish post-event proceedings, speaker notes, and key highlights.',
                  },
                  {
                    icon: '👥',
                    title: 'Participant Directory & CSV Export',
                    desc: 'Track registrations, WhatsApp contacts, districts, and certificates.',
                  },
                  {
                    icon: '🖼️',
                    title: 'Event Photographs & MongoDB Cache',
                    desc: 'Upload event photos and manage MongoDB collections with TTL caching.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                    }}
                  >
                    <span style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '0.1rem' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#94A3B8',
              }}
            >
              <Link
                href="/"
                style={{
                  color: '#E2E8F0',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                ← Return to Public Website
              </Link>
              <span>v2.0 • MongoDB + TTL Cache</span>
            </div>
          </div>

          {/* Right Sign-In Form Column */}
          <div className="admin-auth-form-pane">
            <div style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: '#1D4ED8',
                  background: '#EFF6FF',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  marginBottom: '0.5rem',
                }}
              >
                Secure Administrator Access
              </span>
              <h2
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '0.25rem',
                }}
              >
                Sign In to Admin Console
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
                Enter your chapter administrator credentials and complete the security CAPTCHA below.
              </p>
            </div>

            {loginError && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  marginBottom: '1.15rem',
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
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

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem',
                  }}
                >
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1D4ED8',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <CaptchaChallenge
                onVerifyChange={setLoginCaptchaValid}
                resetSignal={loginCaptchaReset}
                label="Security CAPTCHA Verification *"
              />

              <button
                type="submit"
                disabled={loginLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  marginTop: '1.25rem',
                  justifyContent: 'center',
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.95rem',
                }}
              >
                {loginLoading ? 'Signing In...' : 'Sign In to Backend Console →'}
              </button>
            </form>

            {/* Quick Fill Demo Helper */}
            <div
              style={{
                marginTop: '1.35rem',
                padding: '0.9rem 1rem',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45 }}>
                <div>
                  <strong>Admin ID:</strong> <code>admin@istdthrissur.org</code>
                </div>
                <div>
                  <strong>Password:</strong> <code>ISTD@Thrissur2026</code>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@istdthrissur.org');
                  setLoginPassword('ISTD@Thrissur2026');
                }}
                className="btn btn-outline-navy btn-sm"
                style={{ fontSize: '0.76rem', padding: '0.4rem 0.75rem' }}
              >
                ⚡ Fill Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: STANDALONE ENTERPRISE ADMIN CONSOLE (SIDEBAR + TOPBAR + WORKSPACE)
  // ============================================================================
  const moduleMeta: Record<AdminModule, { title: string; subtitle: string }> = {
    overview: {
      title: 'Dashboard Overview',
      subtitle: 'Real-time summary of registrations, upcoming programmes, event reports, and system cache.',
    },
    upcoming: {
      title: 'Upcoming Events Manager',
      subtitle: 'Schedule upcoming webinars/sessions and manage live participant registration.',
    },
    reports: {
      title: 'Past Event Reports Manager',
      subtitle: 'Publish and edit completed event reports, speaker notes, and session proceedings.',
    },
    registrations: {
      title: 'Participant Registrations Directory',
      subtitle: 'Search, filter, update attendance/certificate status, and export participant data to CSV/Excel.',
    },
    photos: {
      title: 'Event Photographs & Gallery Manager',
      subtitle: 'Upload event photographs, link them to specific event pages, and curate the chapter gallery.',
    },
    system: {
      title: 'MongoDB Database & Cache Controls',
      subtitle: 'Inspect MongoDB collections, monitor server/client TTL cache hits, and download database backups.',
    },
  };

  return (
    <div className="admin-console-shell">
      {/* Mobile Sidebar Backdrop */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* =====================================================================
          LEFT NAVIGATION SIDEBAR (BACKEND-ONLY MENU)
         ===================================================================== */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div>
          {/* Brand Header */}
          <div className="admin-sidebar-brand">
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#FFFFFF',
                padding: '3px',
                flexShrink: 0,
              }}
            >
              <img
                src={assetUrl('/images/logo-circle.png')}
                alt="ISTD Emblem"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#FFFFFF' }}>
                  ISTD Thrissur
                </span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.1rem 0.42rem',
                    borderRadius: '999px',
                    background: '#FACC15',
                    color: '#071524',
                  }}
                >
                  ADMIN
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                Backend Management Console
              </div>
            </div>
          </div>

          {/* Core Section */}
          <div className="admin-sidebar-section-label">Core</div>
          <button
            type="button"
            onClick={() => switchModule('overview')}
            className={`admin-nav-btn ${activeModule === 'overview' ? 'active' : ''}`}
          >
            <span>📊 Dashboard Overview</span>
          </button>

          {/* Events & Programmes Section */}
          <div className="admin-sidebar-section-label">Programmes &amp; Reports</div>
          <button
            type="button"
            onClick={() => switchModule('upcoming')}
            className={`admin-nav-btn ${activeModule === 'upcoming' ? 'active' : ''}`}
          >
            <span>📅 Upcoming Events</span>
            <span className="admin-nav-badge">{upcomingEvents.length}</span>
          </button>
          <button
            type="button"
            onClick={() => switchModule('reports')}
            className={`admin-nav-btn ${activeModule === 'reports' ? 'active' : ''}`}
          >
            <span>📑 Past Event Reports</span>
            <span className="admin-nav-badge">{pastEvents.length}</span>
          </button>

          {/* Participants & Media Section */}
          <div className="admin-sidebar-section-label">Participants &amp; Media</div>
          <button
            type="button"
            onClick={() => switchModule('registrations')}
            className={`admin-nav-btn ${activeModule === 'registrations' ? 'active' : ''}`}
          >
            <span>👥 Registrations</span>
            <span className="admin-nav-badge">{registrations.length}</span>
          </button>
          <button
            type="button"
            onClick={() => switchModule('photos')}
            className={`admin-nav-btn ${activeModule === 'photos' ? 'active' : ''}`}
          >
            <span>🖼️ Event Photos &amp; Gallery</span>
            <span className="admin-nav-badge">{photos.length}</span>
          </button>

          {/* System & Database Section */}
          <div className="admin-sidebar-section-label">Infrastructure</div>
          <button
            type="button"
            onClick={() => switchModule('system')}
            className={`admin-nav-btn ${activeModule === 'system' ? 'active' : ''}`}
          >
            <span>🗄️ MongoDB &amp; Cache</span>
            <span
              className="admin-nav-badge"
              style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }}
            >
              ONLINE
            </span>
          </button>
        </div>

        {/* Sidebar Footer: Admin User Info & Quick Actions */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.09)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '0.85rem',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1D4ED8',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                flexShrink: 0,
              }}
            >
              {session.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {session.name}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#94A3B8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {session.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <Link
              href="/"
              style={{
                padding: '0.48rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              🌐 Live Site ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                padding: '0.48rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.18)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#FCA5A5',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE AREA
         ===================================================================== */}
      <div className="admin-workspace">
        {/* Sticky Top Application Header */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle Admin Navigation"
            >
              ☰
            </button>
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748B',
                }}
              >
                Admin Console / {moduleMeta[activeModule].title}
              </div>
              <h1
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                {moduleMeta[activeModule].title}
              </h1>
            </div>
          </div>

          {/* Topbar Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openNewEventCreator('upcoming')}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              + New Upcoming Event
            </button>
            <button
              type="button"
              onClick={() => openNewEventCreator('past')}
              className="btn btn-outline-navy btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              + Add Past Report
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModule('photos');
                setShowPhotoUploader(true);
              }}
              className="btn btn-outline-navy btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              + Upload Photo
            </button>
            <button
              type="button"
              onClick={async () => {
                const stats = await clearBackendCache();
                setCacheStats(stats);
                await loadPortalData(true);
                showToast('✓ Cache flushed and synchronized with backend database.');
              }}
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#047857',
                borderRadius: '999px',
                padding: '0.38rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="Click to flush server & client TTL cache"
            >
              ⚡ Cache Active ({cacheStats?.hits || 0} hits) ↻
            </button>
          </div>
        </header>

        {/* Main Workspace Body */}
        <div className="admin-main-body">
          {/* Status Toast Banner */}
          {statusBanner && (
            <div
              style={{
                background: '#ECFDF5',
                border: '1.5px solid #10B981',
                color: '#065F46',
                padding: '0.85rem 1.15rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{statusBanner}</span>
              <button
                type="button"
                onClick={() => setStatusBanner('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#065F46',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          )}

          {/* =================================================================
              SHARED EVENT / REPORT EDITOR DRAWER CARD (WHEN ACTIVE)
             ================================================================= */}
          {showEventEditor && (
            <div
              className="admin-panel-card"
              style={{
                borderTop: '4px solid #1D4ED8',
                background: '#FFFFFF',
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
                  marginBottom: '1.25rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #E2E8F0',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: evStatus === 'upcoming' ? '#ECFDF5' : '#EFF6FF',
                      color: evStatus === 'upcoming' ? '#047857' : '#1D4ED8',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {evStatus === 'upcoming'
                      ? '📅 Upcoming Event Editor'
                      : '📑 Past Event Report Editor'}
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                    {editingEventSlug
                      ? `Editing: ${evTitle}`
                      : evStatus === 'upcoming'
                      ? 'Schedule New Upcoming Event'
                      : 'Publish Completed Past Event Report'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowEventEditor(false);
                    resetEventForm(evStatus);
                  }}
                  className="btn btn-outline-navy btn-sm"
                >
                  ✕ Close Editor
                </button>
              </div>

              <form onSubmit={handleSaveEvent}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Listing Type *</label>
                    <select
                      className="form-control"
                      value={evStatus}
                      onChange={(e) => setEvStatus(e.target.value as 'upcoming' | 'past')}
                    >
                      <option value="upcoming">Upcoming Event (With Registration)</option>
                      <option value="past">Completed Past Event Report</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Programme Category *</label>
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                    <label className="form-label">URL Slug (Auto-generated if left blank)</label>
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
                    <label className="form-label">Speaker / Resource Person Name</label>
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
                    <label className="form-label">Venue / Platform *</label>
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
                  <label className="form-label">Lead Question / Subtitle (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., How can intelligent algorithms translate into real-world applications?"
                    value={evSubtitle}
                    onChange={(e) => setEvSubtitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Summary (Shown on Event Cards) *</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="1–2 sentence executive summary of the session"
                    value={evShortDesc}
                    onChange={(e) => setEvShortDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {evStatus === 'upcoming'
                      ? 'Detailed Session Overview (Separate paragraphs with a new line) *'
                      : 'Completed Event Report Proceedings (Separate paragraphs with a new line) *'}
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Write detailed paragraphs describing the session or completed event report..."
                    value={evFullDesc}
                    onChange={(e) => setEvFullDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Key Highlights / Takeaways (Optional — one bullet point per line)
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Key takeaway 1&#10;Key takeaway 2&#10;Key takeaway 3"
                    value={evHighlights}
                    onChange={(e) => setEvHighlights(e.target.value)}
                  />
                </div>

                {/* Image / Poster Upload Box */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div>
                    <label className="form-label">Upload Poster / Cover Photo from Device</label>
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
                      placeholder="Caption for poster or photograph"
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
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={evIsPoster}
                      onChange={(e) => setEvIsPoster(e.target.checked)}
                    />
                    Display as Full Uncropped Event Poster
                  </label>
                  {evStatus === 'upcoming' && (
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={evRegOpen}
                        onChange={(e) => setEvRegOpen(e.target.checked)}
                      />
                      Enable Participant Registration Form on Event Page
                    </label>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn btn-primary">
                    {editingEventSlug
                      ? '✓ Save Changes'
                      : evStatus === 'upcoming'
                      ? '+ Publish Upcoming Event'
                      : '+ Publish Completed Event Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEventEditor(false)}
                    className="btn btn-outline-navy"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =================================================================
              MODULE 1: DASHBOARD OVERVIEW
             ================================================================= */}
          {activeModule === 'overview' && (
            <>
              {/* 4 KPI Stat Cards */}
              <div className="admin-kpi-grid">
                <div
                  className="admin-kpi-card"
                  onClick={() => switchModule('registrations')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      Total Registrations
                    </span>
                    <span style={{ fontSize: '1.25rem' }}>👥</span>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#1D4ED8', margin: '0.35rem 0' }}>
                    {registrations.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1D4ED8', fontWeight: 700 }}>
                    View &amp; Export CSV →
                  </div>
                </div>

                <div
                  className="admin-kpi-card"
                  onClick={() => switchModule('upcoming')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      Upcoming Events
                    </span>
                    <span style={{ fontSize: '1.25rem' }}>📅</span>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#047857', margin: '0.35rem 0' }}>
                    {upcomingEvents.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 700 }}>
                    Manage Upcoming →
                  </div>
                </div>

                <div
                  className="admin-kpi-card"
                  onClick={() => switchModule('reports')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      Past Event Reports
                    </span>
                    <span style={{ fontSize: '1.25rem' }}>📑</span>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0F172A', margin: '0.35rem 0' }}>
                    {pastEvents.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 700 }}>
                    Manage Reports →
                  </div>
                </div>

                <div
                  className="admin-kpi-card"
                  onClick={() => switchModule('photos')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      Gallery Photographs
                    </span>
                    <span style={{ fontSize: '1.25rem' }}>🖼️</span>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#E11D48', margin: '0.35rem 0' }}>
                    {photos.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#E11D48', fontWeight: 700 }}>
                    Upload &amp; Curate →
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="admin-panel-card">
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: '#0F172A' }}>
                  Quick Administrator Actions
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '0.85rem',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openNewEventCreator('upcoming')}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #BFDBFE',
                      background: '#EFF6FF',
                      color: '#1E3A8A',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      📅 + Schedule Upcoming Event
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                      Add a new session with poster &amp; registration form
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => openNewEventCreator('past')}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      📑 + Publish Past Event Report
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                      Add proceedings &amp; highlights of a completed session
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('photos');
                      setShowPhotoUploader(true);
                    }}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      🖼️ + Upload Event Photographs
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                      Add photos to an event page and main chapter gallery
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportRegistrationsCsv}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #A7F3D0',
                      background: '#ECFDF5',
                      color: '#065F46',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      ⬇ Export Registrations (CSV)
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#047857' }}>
                      Download Excel-ready spreadsheet of participants
                    </div>
                  </button>
                </div>
              </div>

              {/* Two-Column Overview: Recent Registrations + Active Upcoming Events */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {/* Recent Participant Registrations */}
                <div className="admin-panel-card" style={{ marginBottom: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                      Recent Participant Registrations
                    </h3>
                    <button
                      type="button"
                      onClick={() => switchModule('registrations')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1D4ED8',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      View All ({registrations.length}) →
                    </button>
                  </div>

                  {registrations.slice(0, 5).map((reg) => (
                    <div
                      key={reg.id}
                      style={{
                        padding: '0.8rem 0',
                        borderBottom: '1px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>
                          {reg.salutation} {reg.fullName}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                          {reg.organization} • {reg.district} • WA: {reg.whatsapp}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedRegistration(reg)}
                        className="btn btn-outline-navy btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.28rem 0.6rem' }}
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>

                {/* Active Upcoming Events */}
                <div className="admin-panel-card" style={{ marginBottom: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                      Scheduled Upcoming Events
                    </h3>
                    <button
                      type="button"
                      onClick={() => switchModule('upcoming')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1D4ED8',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Manage Events →
                    </button>
                  </div>

                  {upcomingEvents.map((ev) => (
                    <div
                      key={ev.slug}
                      style={{
                        display: 'flex',
                        gap: '0.9rem',
                        alignItems: 'center',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <img
                        src={assetUrl(ev.image)}
                        alt={ev.title}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          background: '#071524',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857' }}>
                          ● {ev.date} • {ev.timeIST}
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            color: '#0F172A',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {ev.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                          {ev.speaker ? `🎙️ ${ev.speaker}` : ev.venue}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEditEvent(ev)}
                        className="btn btn-outline-navy btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              MODULE 2: UPCOMING EVENTS MANAGER
             ================================================================= */}
          {activeModule === 'upcoming' && (
            <div className="admin-panel-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                    Scheduled Upcoming Events ({upcomingEvents.length})
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0 }}>
                    Events listed here appear under the &ldquo;Upcoming Events&rdquo; tab on the
                    website and accept online participant registrations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openNewEventCreator('upcoming')}
                  className="btn btn-primary btn-sm"
                >
                  + Schedule New Upcoming Event
                </button>
              </div>

              {upcomingEvents.length === 0 ? (
                <div
                  style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    color: '#64748B',
                  }}
                >
                  No upcoming events scheduled right now. Click{' '}
                  <strong>+ Schedule New Upcoming Event</strong> above to add one.
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {upcomingEvents.map((ev) => {
                    const regCount = registrations.filter(
                      (r) => r.eventSlug === ev.slug
                    ).length;
                    return (
                      <div
                        key={ev.slug}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '1.15rem',
                          borderRadius: '12px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            flex: 1,
                            minWidth: '260px',
                          }}
                        >
                          <img
                            src={assetUrl(ev.image)}
                            alt={ev.title}
                            style={{
                              width: '76px',
                              height: '76px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                              background: '#071524',
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                flexWrap: 'wrap',
                                marginBottom: '0.25rem',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '0.15rem 0.55rem',
                                  borderRadius: '999px',
                                  background: '#ECFDF5',
                                  color: '#047857',
                                }}
                              >
                                ● Registration Open ({regCount} Registered)
                              </span>
                              <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
                                📅 {ev.date} • 🕖 {ev.timeIST}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.2rem' }}>
                              {ev.title}
                            </h3>
                            <div style={{ fontSize: '0.8rem', color: '#1D4ED8', fontWeight: 600 }}>
                              {ev.speaker
                                ? `🎙️ ${ev.speaker}${
                                    ev.speakerDesignation ? ` — ${ev.speakerDesignation}` : ''
                                  }`
                                : `📍 ${ev.venue}`}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <Link
                            href={`/events/${ev.slug}`}
                            className="btn btn-outline-navy btn-sm"
                          >
                            Live Page ↗
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setRegEventFilter(ev.slug);
                              switchModule('registrations');
                            }}
                            className="btn btn-outline-navy btn-sm"
                          >
                            👥 Registrations ({regCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => startEditEvent(ev)}
                            className="btn btn-primary btn-sm"
                          >
                            ✎ Edit Event
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleEventStatus(ev)}
                            className="btn btn-outline-navy btn-sm"
                          >
                            ✓ Mark Completed (Move to Reports)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(ev.slug, ev.title)}
                            className="btn btn-outline-navy btn-sm"
                            style={{ color: '#B91C1C', borderColor: '#FECACA' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              MODULE 3: PAST EVENT REPORTS MANAGER
             ================================================================= */}
          {activeModule === 'reports' && (
            <div className="admin-panel-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                    Completed Past Event Reports ({pastEvents.length})
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0 }}>
                    Manage post-event reports, executive summaries, speaker profiles, and attached
                    event photo galleries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openNewEventCreator('past')}
                  className="btn btn-primary btn-sm"
                >
                  + Publish Past Event Report
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {pastEvents.map((ev) => (
                  <div
                    key={ev.slug}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.15rem',
                      borderRadius: '12px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flex: 1,
                        minWidth: '260px',
                      }}
                    >
                      <img
                        src={assetUrl(ev.image)}
                        alt={ev.title}
                        style={{
                          width: '76px',
                          height: '76px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          background: '#071524',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                            marginBottom: '0.25rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '0.15rem 0.55rem',
                              borderRadius: '999px',
                              background: '#EFF6FF',
                              color: '#1D4ED8',
                            }}
                          >
                            ✓ Published Report ({ev.programmeType})
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
                            📅 {ev.date} • {ev.venue}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.2rem' }}>
                          {ev.title}
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                          {ev.speaker ? `🎙️ ${ev.speaker} • ` : ''}
                          {(ev.fullDescription || []).length} report paragraphs •{' '}
                          {(ev.eventPhotos || []).length} attached photos
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Link
                        href={`/events/${ev.slug}`}
                        className="btn btn-outline-navy btn-sm"
                      >
                        View Report ↗
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoEventSlug(ev.slug);
                          setActiveModule('photos');
                          setShowPhotoUploader(true);
                        }}
                        className="btn btn-outline-navy btn-sm"
                      >
                        🖼️ + Add Photos
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditEvent(ev)}
                        className="btn btn-primary btn-sm"
                      >
                        ✎ Edit Report
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleEventStatus(ev)}
                        className="btn btn-outline-navy btn-sm"
                      >
                        Move to Upcoming
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
          )}

          {/* =================================================================
              MODULE 4: PARTICIPANT REGISTRATIONS DIRECTORY
             ================================================================= */}
          {activeModule === 'registrations' && (
            <div className="admin-panel-card">
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
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                    Participant Registrations ({filteredRegistrations.length})
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0 }}>
                    Complete participant records including Personal Details, DOB, Phone, WhatsApp,
                    District, Organisation, ISTD Membership, and Certificate Status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportRegistrationsCsv}
                  className="btn btn-primary btn-sm"
                >
                  ⬇ Export CSV / Excel ({filteredRegistrations.length})
                </button>
              </div>

              {/* Status Filter Pills */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.45rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                }}
              >
                {(['all', 'Confirmed', 'Attended', 'Certificate Issued', 'Cancelled'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setRegStatusFilter(st)}
                      style={{
                        padding: '0.38rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border:
                          regStatusFilter === st
                            ? '1.5px solid #1D4ED8'
                            : '1px solid #CBD5E1',
                        background: regStatusFilter === st ? '#EFF6FF' : '#FFFFFF',
                        color: regStatusFilter === st ? '#1D4ED8' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {st === 'all' ? 'All Statuses' : st}
                    </button>
                  )
                )}
              </div>

              {/* Filter & Search Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
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
                    Search Name, Phone, WhatsApp, Email, District, or Reg ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type to search participants..."
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
                    color: '#64748B',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                  }}
                >
                  No participant registrations match the selected filters.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.84rem',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: '#F1F5F9',
                          textAlign: 'left',
                          borderBottom: '2px solid #E2E8F0',
                        }}
                      >
                        <th style={{ padding: '0.75rem' }}>Reg. ID</th>
                        <th style={{ padding: '0.75rem' }}>Participant &amp; DOB</th>
                        <th style={{ padding: '0.75rem' }}>Contact &amp; WhatsApp</th>
                        <th style={{ padding: '0.75rem' }}>District</th>
                        <th style={{ padding: '0.75rem' }}>Organisation &amp; Role</th>
                        <th style={{ padding: '0.75rem' }}>Event</th>
                        <th style={{ padding: '0.75rem' }}>Status</th>
                        <th style={{ padding: '0.75rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((reg) => (
                        <tr
                          key={reg.id}
                          style={{ borderBottom: '1px solid #E2E8F0' }}
                        >
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <strong style={{ color: '#0F172A', display: 'block' }}>
                              {reg.registrationCode}
                            </strong>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#1D4ED8',
                                background: '#EFF6FF',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '6px',
                                marginTop: '0.15rem',
                              }}
                            >
                              ID: {reg.participantCode || reg.registrationCode.replace('TCR', 'PID')}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginTop: '0.15rem' }}>
                              {new Date(reg.createdAt).toLocaleDateString('en-IN')}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <strong style={{ color: '#0F172A', display: 'block' }}>
                              {reg.salutation} {reg.fullName}
                            </strong>
                            <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                              DOB: {reg.dob}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <div>📧 {reg.email}</div>
                            <div>📞 {reg.phone}</div>
                            <div style={{ color: '#047857', fontWeight: 700 }}>
                              💬 WA: {reg.whatsapp}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <strong>{reg.district}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                              {reg.city ? `${reg.city}, ` : ''}
                              {reg.state}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <strong>{reg.organization}</strong>
                            <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                              {reg.designation} ({reg.experienceYears})
                            </div>
                            <div style={{ fontSize: '0.73rem', color: '#1D4ED8', fontWeight: 600 }}>
                              {reg.participantCategory}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <strong style={{ fontSize: '0.8rem' }}>{reg.eventTitle}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                              {reg.eventDate}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <select
                              className="form-control"
                              style={{
                                padding: '0.32rem 0.5rem',
                                fontSize: '0.76rem',
                                minWidth: '132px',
                              }}
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
                          <td style={{ padding: '0.85rem 0.75rem', verticalAlign: 'top' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedRegistration(reg)}
                              className="btn btn-outline-navy btn-sm"
                              style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                            >
                              View Pass
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              MODULE 5: EVENT PHOTOS & CHAPTER GALLERY MANAGER
             ================================================================= */}
          {activeModule === 'photos' && (
            <>
              <div className="admin-panel-card">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: showPhotoUploader ? '1.25rem' : 0,
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                      Event Photographs &amp; Chapter Gallery ({photos.length})
                    </h2>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0 }}>
                      Upload photographs from your computer or paste an image URL, attach them to an
                      event report, and curate the gallery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPhotoUploader((prev) => !prev)}
                    className="btn btn-primary btn-sm"
                  >
                    {showPhotoUploader ? '✕ Close Photo Uploader' : '+ Upload New Photograph'}
                  </button>
                </div>

                {showPhotoUploader && (
                  <form
                    onSubmit={handleAddPhoto}
                    style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid #E2E8F0',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Photograph Title *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., Keynote Address During AIoT Session"
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
                        <label className="form-label">Link to Specific Event Page (Optional)</label>
                        <select
                          className="form-control"
                          value={photoEventSlug}
                          onChange={(e) => setPhotoEventSlug(e.target.value)}
                        >
                          <option value="">Main Chapter Gallery Only</option>
                          {events.map((ev) => (
                            <option key={ev.slug} value={ev.slug}>
                              {ev.title} ({ev.date})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Date &amp; Location Tag</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., 10 November 2026 • Thrissur"
                          value={photoMetaTag}
                          onChange={(e) => setPhotoMetaTag(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Factual Caption (Identify Occasion &amp; Dignitaries/Speakers) *
                      </label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Enter a factual caption describing the occasion and people in the photograph"
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
                        background: '#F8FAFC',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
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

                    <button type="submit" className="btn btn-primary">
                      + Publish Photograph to Gallery →
                    </button>
                  </form>
                )}
              </div>

              <div className="admin-panel-card">
                <div
                  style={{
                    display: 'flex',
                    gap: '0.45rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.25rem',
                  }}
                >
                  {(
                    [
                      { id: 'all', label: `All Photos (${photos.length})` },
                      { id: 'ceremony', label: 'Ceremony' },
                      { id: 'addresses', label: 'Addresses & Sessions' },
                      { id: 'oath', label: 'Oath of Office' },
                      { id: 'felicitations', label: 'Felicitations' },
                      { id: 'portraits', label: 'Group Photos' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPhotoCategoryFilter(cat.id)}
                      style={{
                        padding: '0.38rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border:
                          photoCategoryFilter === cat.id
                            ? '1.5px solid #1D4ED8'
                            : '1px solid #CBD5E1',
                        background: photoCategoryFilter === cat.id ? '#EFF6FF' : '#FFFFFF',
                        color: photoCategoryFilter === cat.id ? '#1D4ED8' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {filteredPhotos.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
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
                            height: '145px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                        <div style={{ padding: '0.75rem' }}>
                          <div
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              color: '#1D4ED8',
                              textTransform: 'uppercase',
                            }}
                          >
                            {p.categoryLabel}
                          </div>
                          <div
                            style={{
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: '#0F172A',
                              marginTop: '0.15rem',
                            }}
                          >
                            {p.title}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderTop: '1px solid #F1F5F9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{p.metaTag}</span>
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(p.id, p.title)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#B91C1C',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              MODULE 6: MONGODB DATABASE & CACHE CONTROLS
             ================================================================= */}
          {activeModule === 'system' && (
            <div className="admin-panel-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                MongoDB Collections &amp; Server Cache Controls
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Connected via the official <code>mongodb</code> driver (<code>src/lib/mongodb.ts</code>)
                with a 60-second TTL server/client cache (<code>src/lib/backendStore.ts</code>) that
                automatically invalidates on every write operation.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.15rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    🗄️ MongoDB Storage Status
                  </h4>
                  <div style={{ fontSize: '0.85rem', lineHeight: 1.75, color: '#334155' }}>
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
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    ⚡ Cache Layer Performance
                  </h4>
                  <div style={{ fontSize: '0.85rem', lineHeight: 1.75, color: '#334155' }}>
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
                  background: '#071524',
                  color: '#F8FAFC',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ color: '#FACC15', fontWeight: 800, marginBottom: '0.35rem' }}>
                  Environment Configuration (`.env.local`):
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
                    showToast('✓ Server and client cache flushed.');
                  }}
                  className="btn btn-outline-navy btn-sm"
                >
                  ⚡ Flush Server &amp; Client Cache
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          PARTICIPANT REGISTRATION DETAIL / PASS MODAL
         ===================================================================== */}
      {selectedRegistration && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 21, 36, 0.65)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                  }}
                >
                  {selectedRegistration.registrationCode}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.35rem 0 0' }}>
                  {selectedRegistration.salutation} {selectedRegistration.fullName}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Registered for <strong>{selectedRegistration.eventTitle}</strong> (
                  {selectedRegistration.eventDate})
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRegistration(null)}
                className="btn btn-outline-navy btn-sm"
              >
                ✕ Close
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.9rem',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  DATE OF BIRTH &amp; GENDER
                </strong>
                {selectedRegistration.dob}{' '}
                {selectedRegistration.gender ? `(${selectedRegistration.gender})` : ''}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  EMAIL ADDRESS
                </strong>
                {selectedRegistration.email}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  PHONE &amp; WHATSAPP
                </strong>
                Phone: {selectedRegistration.phone} | WA: {selectedRegistration.whatsapp}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  DISTRICT &amp; LOCATION
                </strong>
                {selectedRegistration.district}, {selectedRegistration.city || ''}{' '}
                {selectedRegistration.state}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  ORGANISATION / INSTITUTION
                </strong>
                {selectedRegistration.organization}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  DESIGNATION &amp; EXPERIENCE
                </strong>
                {selectedRegistration.designation} ({selectedRegistration.experienceYears})
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  PARTICIPANT CATEGORY
                </strong>
                {selectedRegistration.participantCategory}
              </div>
              <div>
                <strong style={{ color: '#64748B', display: 'block', fontSize: '0.73rem' }}>
                  ISTD MEMBERSHIP &amp; CERTIFICATE
                </strong>
                ISTD: {selectedRegistration.isIstdMember} | Certificate:{' '}
                {selectedRegistration.requireCertificate ? 'Requested' : 'No'}
              </div>
            </div>

            {selectedRegistration.expectations && (
              <div
                style={{
                  padding: '0.9rem',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.84rem',
                  marginBottom: '1.25rem',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.74rem', color: '#64748B' }}>
                  QUESTIONS / EXPECTATIONS FOR SPEAKER:
                </strong>
                {selectedRegistration.expectations}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                paddingTop: '1rem',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <a
                href={`https://wa.me/${selectedRegistration.whatsapp.replace(
                  /[^0-9]/g,
                  ''
                )}?text=${encodeURIComponent(
                  `Hello ${selectedRegistration.salutation} ${selectedRegistration.fullName}, your registration (${selectedRegistration.registrationCode}) for "${selectedRegistration.eventTitle}" (${selectedRegistration.eventDate}) with ISTD Thrissur Chapter is confirmed.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ background: '#047857', borderColor: '#047857' }}
              >
                💬 Send WhatsApp Confirmation ↗
              </a>
              <button
                type="button"
                onClick={() => setSelectedRegistration(null)}
                className="btn btn-outline-navy btn-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
