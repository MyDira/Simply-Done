'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import type { Dedication } from '@/lib/types';

interface Props {
  dedication: Dedication | null;
  onSave: (dedication: Dedication) => void;
  onClose: () => void;
}

export default function DedicationModal({ dedication, onSave, onClose }: Props) {
  const { theme: t } = useTheme();
  const [title, setTitle] = useState(dedication?.title || 'A Note from the Chef');
  const [content, setContent] = useState(dedication?.content || '');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: `1px solid ${t.inputBorder}`,
    background: t.inputBg,
    color: t.text,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    outline: 'none',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: t.bgCard,
          borderRadius: 20,
          padding: 36,
          width: '100%',
          maxWidth: 540,
          border: `1px solid ${t.border}`,
          boxShadow: t.shadowHover,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 24,
                fontWeight: 700,
                color: t.text,
                marginBottom: 4,
              }}
            >
              Dedication Page
            </h2>
            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
              This will appear at the front of your exported cookbook.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: t.textMuted,
              padding: 4,
            }}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: t.textMuted,
                marginBottom: 6,
              }}
            >
              Heading
            </label>
            <input
              style={inputStyle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. A Note from the Chef"
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: t.textMuted,
                marginBottom: 6,
              }}
            >
              Your words
            </label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 160, lineHeight: 1.7 }}
              value={content}
              placeholder="Write a personal note, dedication, or introduction to your cookbook…"
              onChange={e => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* Preview */}
        {content && (
          <div
            style={{
              marginTop: 20,
              padding: '20px 24px',
              borderRadius: 12,
              background: t.bgAccent,
              border: `1px solid ${t.border}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 24,
                height: 2,
                background: t.accent,
                margin: '0 auto 16px',
              }}
            />
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 600,
                fontSize: 14,
                color: t.text,
                marginBottom: 12,
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}
            >
              {content}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: t.bgCard,
              color: t.textMuted,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({ id: dedication?.id || 1, title, content })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 22px',
              borderRadius: 8,
              border: 'none',
              background: t.accent,
              color: t.accentText,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <Icon name="save" size={15} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
