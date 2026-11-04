'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface CaptchaChallengeProps {
  onVerifyChange: (isValid: boolean) => void;
  resetSignal?: number;
  label?: string;
}

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCaptchaCode(length = 6): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length));
  }
  return code;
}

export function CaptchaChallenge({
  onVerifyChange,
  resetSignal = 0,
  label = 'Security CAPTCHA Verification *',
}: CaptchaChallengeProps) {
  const [captchaCode, setCaptchaCode] = useState<string>('ISTD55');
  const [userInput, setUserInput] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const refreshCaptcha = useCallback(() => {
    const nextCode = generateCaptchaCode(6);
    setCaptchaCode(nextCode);
    setUserInput('');
    onVerifyChange(false);
  }, [onVerifyChange]);

  useEffect(() => {
    setMounted(true);
    refreshCaptcha();
  }, [refreshCaptcha, resetSignal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);
    const matches = val.trim() === captchaCode;
    onVerifyChange(matches);
  };

  const isVerified = mounted && userInput.trim() === captchaCode;

  return (
    <div
      style={{
        background: 'var(--color-surface-soft)',
        border: `1.5px solid ${isVerified ? '#10B981' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.15rem',
        marginTop: '0.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.6rem',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <label
          style={{
            fontSize: '0.84rem',
            fontWeight: 800,
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          {label}
        </label>
        {isVerified ? (
          <span
            style={{
              fontSize: '0.76rem',
              fontWeight: 800,
              color: '#047857',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '0.18rem 0.6rem',
              borderRadius: '999px',
            }}
          >
            ✓ CAPTCHA Verified
          </span>
        ) : (
          <span style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
            Enter the 6-character security code shown below
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Visual Distorted SVG CAPTCHA Box */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#0B2239',
            borderRadius: 'var(--radius-sm)',
            padding: '0.25rem 0.5rem',
            border: '1px solid #1E3A8A',
            userSelect: 'none',
          }}
          aria-label="CAPTCHA security image"
        >
          <svg width="165" height="44" viewBox="0 0 165 44">
            <rect width="165" height="44" fill="#0B2239" rx="6" />
            {/* Noise lines */}
            <line x1="8" y1="12" x2="155" y2="34" stroke="rgba(56,189,248,0.28)" strokeWidth="1.5" />
            <line x1="14" y1="36" x2="148" y2="10" stroke="rgba(250,204,21,0.25)" strokeWidth="1.5" />
            <path
              d="M 5 22 Q 45 6, 85 24 T 160 18"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.4"
            />
            {captchaCode.split('').map((char, idx) => {
              const x = 18 + idx * 24;
              const y = 28 + (idx % 2 === 0 ? -2 : 3);
              const rotate = (idx % 2 === 0 ? -9 : 8) + (idx - 2) * 2;
              return (
                <text
                  key={idx}
                  x={x}
                  y={y}
                  fill={idx % 2 === 0 ? '#FACC15' : '#F8FAFC'}
                  fontSize="21"
                  fontWeight="800"
                  fontFamily="monospace"
                  transform={`rotate(${rotate}, ${x}, ${y})`}
                >
                  {char}
                </text>
              );
            })}
          </svg>
        </div>

        <button
          type="button"
          onClick={refreshCaptcha}
          className="btn btn-outline-navy btn-sm"
          style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
          title="Generate a new CAPTCHA code"
        >
          ↻ Refresh Code
        </button>

        <input
          type="text"
          className="form-control"
          placeholder="Type code here..."
          value={userInput}
          onChange={handleInputChange}
          maxLength={6}
          required
          style={{
            flex: '1',
            minWidth: '150px',
            maxWidth: '210px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background: '#FFFFFF',
          }}
        />
      </div>
    </div>
  );
}
