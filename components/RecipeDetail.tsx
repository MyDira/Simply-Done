'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import PhotoPlaceholder from './PhotoPlaceholder';
import DiffBadge from './DiffBadge';
import type { Recipe } from '@/lib/types';

interface Props {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RecipeDetail({ recipe, onBack, onEdit, onDelete }: Props) {
  const { theme: t } = useTheme();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const ingredients = recipe.ingredients || [];
  const steps = recipe.steps || [];

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 0 60px' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0 24px',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
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
          <Icon name="back" size={16} /> Back to recipes
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: t.bgCard,
              color: t.text,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <Icon name="edit" size={14} /> Edit
          </button>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #fca5a5',
                background: '#fff1f1',
                color: '#ef4444',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <Icon name="trash" size={14} /> Delete
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={onDelete}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  background: t.bgCard,
                  color: t.textMuted,
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero photo */}
      <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 36 }}>
        <PhotoPlaceholder
          src={recipe.photo}
          label={recipe.title}
          t={t}
          style={{ width: '100%', height: 320 }}
        />
      </div>

      {/* Title block */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '3px 12px',
              borderRadius: 99,
              fontSize: 11,
              fontWeight: 700,
              background: t.categoryBg,
              color: t.categoryText,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            {recipe.category}
          </span>
          <DiffBadge level={recipe.difficulty} />
          {recipe.tags?.map(tag => (
            <span
              key={tag}
              style={{
                padding: '2px 9px',
                borderRadius: 99,
                fontSize: 10,
                background: t.bgAccent,
                color: t.textMuted,
                border: `1px solid ${t.border}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 38,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {recipe.title}
        </h1>

        <div
          style={{
            display: 'flex',
            gap: 24,
            color: t.textMuted,
            fontSize: 13,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="clock" size={15} style={{ color: t.accent }} />
            <strong style={{ color: t.text }}>Prep:</strong>&nbsp;{recipe.prepTime} min
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="clock" size={15} style={{ color: t.accent }} />
            <strong style={{ color: t.text }}>Cook:</strong>&nbsp;{recipe.cookTime} min
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="users" size={15} style={{ color: t.accent }} />
            <strong style={{ color: t.text }}>Serves:</strong>&nbsp;{recipe.servings}
          </span>
        </div>
      </div>

      {/* Story */}
      {recipe.story && (
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 14,
            marginBottom: 32,
            background: t.accentSoft,
            borderLeft: `3px solid ${t.accent}`,
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 15.5,
            color: t.text,
            lineHeight: 1.7,
          }}
        >
          &ldquo;{recipe.story}&rdquo;
        </div>
      )}

      {recipe.description && (
        <p
          style={{
            fontSize: 15,
            color: t.textMuted,
            lineHeight: 1.75,
            marginBottom: 36,
          }}
        >
          {recipe.description}
        </p>
      )}

      {/* Ingredients + Method */}
      <div
        className="recipe-detail-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* Ingredients */}
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
              fontWeight: 600,
              color: t.text,
              marginBottom: 18,
              paddingBottom: 10,
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            Ingredients
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ingredients.map((ing, i) =>
              ing === '—' ? (
                <li key={i} style={{ height: 1, background: t.border, margin: '6px 0' }} />
              ) : (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    fontSize: 13.5,
                    color: t.text,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: 6,
                      background: t.accent,
                    }}
                  />
                  {ing}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Method */}
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
              fontWeight: 600,
              color: t.text,
              marginBottom: 18,
              paddingBottom: 10,
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            Method
          </h2>
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {steps.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: t.accent,
                    color: t.accentText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ fontSize: 14, color: t.text, lineHeight: 1.7, marginTop: 4 }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Chef's notes */}
      {recipe.notes && (
        <div
          style={{
            marginTop: 36,
            padding: '18px 22px',
            borderRadius: 12,
            background: t.bgAccent,
            border: `1px solid ${t.border}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: t.gold,
              marginBottom: 8,
            }}
          >
            Chef&apos;s Notes
          </div>
          <p style={{ fontSize: 14, color: t.text, lineHeight: 1.7 }}>{recipe.notes}</p>
        </div>
      )}
    </div>
  );
}
