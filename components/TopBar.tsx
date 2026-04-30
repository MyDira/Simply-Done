'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';

interface Props {
  view: string;
  searchQ: string;
  filteredCount: number;
  onToggleSidebar: () => void;
  onSearchChange: (q: string) => void;
  onBack: () => void;
  title?: string;
}

export default function TopBar({
  view,
  searchQ,
  filteredCount,
  onToggleSidebar,
  onSearchChange,
  onBack,
  title,
}: Props) {
  const { theme: t } = useTheme();

  return (
    <header
      style={{
        background: t.headerBg,
        borderBottom: `1px solid ${t.border}`,
        padding: '0 28px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexShrink: 0,
      }}
    >
      <button
        onClick={onToggleSidebar}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: t.textMuted,
          display: 'flex',
          padding: 4,
          flexShrink: 0,
        }}
        aria-label="Toggle sidebar"
      >
        <Icon name="menu" size={18} />
      </button>

      {view === 'browse' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: t.inputBg,
            borderRadius: 8,
            padding: '0 14px',
            border: `1px solid ${t.inputBorder}`,
            maxWidth: 400,
          }}
        >
          <Icon name="search" size={15} style={{ color: t.textLight, flexShrink: 0 }} />
          <input
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.text,
              height: 36,
            }}
            placeholder="Search recipes…"
            value={searchQ}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {(view === 'detail' || view === 'form') && (
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'none',
            border: 'none',
            color: t.textMuted,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            padding: '6px 0',
          }}
        >
          <Icon name="back" size={16} /> {title || 'Back'}
        </button>
      )}

      <div style={{ flex: 1 }} />

      {view === 'browse' && (
        <span style={{ fontSize: 12, color: t.textMuted, flexShrink: 0 }}>
          {filteredCount} recipe{filteredCount !== 1 ? 's' : ''}
        </span>
      )}
    </header>
  );
}
