'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import PhotoPlaceholder from './PhotoPlaceholder';
import DiffBadge from './DiffBadge';
import type { Recipe } from '@/lib/types';

interface Props {
  recipe: Recipe;
  onClick: () => void;
  dragHandle?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

export default function RecipeCard({ recipe, onClick, dragHandle, isDragging }: Props) {
  const { theme: t } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.bgCard,
        borderRadius: 16,
        border: `1px solid ${t.border}`,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isDragging ? t.shadowHover : hovered ? t.shadowHover : t.shadow,
        transform: isDragging ? 'scale(1.03) rotate(1deg)' : hovered ? 'translateY(-3px)' : 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease',
        opacity: isDragging ? 0.85 : 1,
        position: 'relative',
      }}
    >
      {dragHandle && (
        <div
          {...dragHandle}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            color: t.textLight,
            cursor: 'grab',
            padding: 4,
            borderRadius: 6,
            background: t.bgCard + 'cc',
          }}
        >
          <Icon name="dots-vertical" size={16} />
        </div>
      )}
      <PhotoPlaceholder
        src={recipe.photo}
        label={recipe.title}
        t={t}
        style={{ width: '100%', height: 180 }}
      />
      <div style={{ padding: '16px 18px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              padding: '2px 10px',
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 600,
              background: t.categoryBg,
              color: t.categoryText,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {recipe.category}
          </span>
          <DiffBadge level={recipe.difficulty} />
        </div>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 17,
            fontWeight: 600,
            color: t.text,
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {recipe.title}
        </h3>
        <p
          style={{
            fontSize: 12.5,
            color: t.textMuted,
            lineHeight: 1.55,
            marginBottom: 12,
          }}
        >
          {recipe.description?.substring(0, 90)}
          {(recipe.description?.length ?? 0) > 90 ? '…' : ''}
        </p>
        <div style={{ display: 'flex', gap: 14, color: t.textLight, fontSize: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="clock" size={13} /> {recipe.prepTime + recipe.cookTime}m
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="users" size={13} /> {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
}
