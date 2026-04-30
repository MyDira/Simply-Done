'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import { CATEGORIES, type Recipe } from '@/lib/types';
import { THEMES, type ThemeName } from '@/lib/themes';

interface Props {
  open: boolean;
  recipes: Recipe[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onNewRecipe: () => void;
  onExportPDF: () => void;
  onEditDedication: () => void;
}

const THEME_LABELS: Record<ThemeName, string> = {
  lavender: 'Lavender',
  midnight: 'Midnight',
  spice: 'Spice',
};

export default function Sidebar({
  open,
  recipes,
  activeCategory,
  onCategoryChange,
  onNewRecipe,
  onExportPDF,
  onEditDedication,
}: Props) {
  const { theme: t, themeName, setThemeName } = useTheme();

  const counts: Record<string, number> = { All: recipes.length };
  for (const cat of CATEGORIES) {
    counts[cat] = recipes.filter(r => r.category === cat).length;
  }

  return (
    <aside
      style={{
        width: open ? 220 : 0,
        flexShrink: 0,
        background: t.bgSidebar,
        borderRight: `1px solid ${t.border}`,
        overflow: 'hidden',
        transition: 'width 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '28px 20px 16px', flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 22,
            color: t.accent,
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}
        >
          Simply Done
        </div>
        <div
          style={{
            fontSize: 10,
            color: t.textLight,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          A personal cookbook
        </div>
      </div>

      {/* New Recipe button */}
      <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
        <button
          onClick={onNewRecipe}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            width: '100%',
            padding: '9px 14px',
            borderRadius: 10,
            border: 'none',
            background: t.accent,
            color: t.accentText,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Icon name="plus" size={15} /> New Recipe
        </button>
      </div>

      {/* Category list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 12px' }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: t.textLight,
            padding: '4px 8px',
            marginBottom: 4,
          }}
        >
          Categories
        </div>

        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: 'none',
              background: activeCategory === cat ? t.bgAccent : 'none',
              color: activeCategory === cat ? t.accent : t.textMuted,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: activeCategory === cat ? 600 : 400,
              transition: 'all 0.12s',
            }}
          >
            <span>{cat}</span>
            <span
              style={{
                fontSize: 10,
                padding: '1px 6px',
                borderRadius: 99,
                background: activeCategory === cat ? t.accent : t.bgAccent,
                color: activeCategory === cat ? t.accentText : t.textLight,
              }}
            >
              {counts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Theme switcher */}
      <div
        style={{
          padding: '12px',
          borderTop: `1px solid ${t.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: t.textLight,
            padding: '0 2px 6px',
          }}
        >
          Theme
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(Object.keys(THEMES) as ThemeName[]).map(tn => (
            <button
              key={tn}
              onClick={() => setThemeName(tn)}
              title={THEMES[tn].name}
              style={{
                flex: 1,
                padding: '5px 4px',
                borderRadius: 7,
                border: `1.5px solid ${themeName === tn ? t.accent : t.border}`,
                background: themeName === tn ? t.accentSoft : t.bgCard,
                color: themeName === tn ? t.accent : t.textMuted,
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {THEME_LABELS[tn]}
            </button>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: '0 12px 16px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <button
          onClick={onEditDedication}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            width: '100%',
            padding: '8px 10px',
            borderRadius: 8,
            border: 'none',
            background: 'none',
            color: t.textMuted,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          }}
        >
          <Icon name="heart" size={14} /> Dedication page
        </button>
        <button
          onClick={onExportPDF}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            width: '100%',
            padding: '8px 10px',
            borderRadius: 8,
            border: 'none',
            background: 'none',
            color: t.textMuted,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          }}
        >
          <Icon name="print" size={14} /> Export to PDF
        </button>
      </div>
    </aside>
  );
}
