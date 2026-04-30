'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import { CATEGORIES, type Recipe, type Dedication } from '@/lib/types';

interface Props {
  recipes: Recipe[];
  dedication: Dedication | null;
  onClose: () => void;
}

export default function PrintPreview({ recipes, dedication, onClose }: Props) {
  const { theme: t } = useTheme();
  const chapters = CATEGORIES.filter(c => recipes.some(r => r.category === c));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: t.bg,
        overflow: 'auto',
      }}
    >
      {/* Toolbar */}
      <div
        className="no-print"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: t.headerBg,
          borderBottom: `1px solid ${t.border}`,
          padding: '12px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 20,
              color: t.accent,
            }}
          >
            Simply Done
          </span>
          <span style={{ fontSize: 13, color: t.textMuted }}>— Print Preview</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '9px 20px',
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
            <Icon name="print" size={15} /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: t.bgCard,
              color: t.textMuted,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
            }}
          >
            <Icon name="x" size={15} /> Close
          </button>
        </div>
      </div>

      {/* Book content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 40px 80px' }}>
        {/* Cover page */}
        <div
          style={{
            textAlign: 'center',
            padding: '80px 40px',
            borderBottom: `2px solid ${t.border}`,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              width: 3,
              height: 60,
              background: t.accent,
              margin: '0 auto 32px',
              borderRadius: 2,
            }}
          />
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 58,
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}
          >
            Simply Done
          </h1>
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 20,
              color: t.accent,
              marginBottom: 32,
            }}
          >
            A personal collection of beloved recipes
          </p>
          <p style={{ fontSize: 13, color: t.textMuted }}>
            {recipes.length} recipes across {chapters.length} chapters
          </p>
        </div>

        {/* Dedication page */}
        {dedication && dedication.content && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 60px',
              borderBottom: `1px solid ${t.border}`,
              marginBottom: 60,
              pageBreakAfter: 'always',
            }}
          >
            <div
              style={{
                width: 32,
                height: 2,
                background: t.accent,
                margin: '0 auto 28px',
              }}
            />
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 24,
                fontWeight: 600,
                color: t.text,
                marginBottom: 24,
              }}
            >
              {dedication.title}
            </h2>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 16,
                color: t.textMuted,
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}
            >
              {dedication.content}
            </p>
          </div>
        )}

        {/* Table of contents */}
        <div style={{ marginBottom: 60, pageBreakAfter: 'always' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 28,
              color: t.text,
              marginBottom: 24,
            }}
          >
            Contents
          </h2>
          {chapters.map(cat => {
            const catRecipes = recipes.filter(r => r.category === cat);
            return (
              <div key={cat} style={{ marginBottom: 20 }}>
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
                  {cat}
                </div>
                {catRecipes.map(r => (
                  <div
                    key={r.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '6px 0',
                      borderBottom: `1px dotted ${t.border}`,
                      fontSize: 14,
                      color: t.text,
                    }}
                  >
                    <span style={{ fontFamily: 'Playfair Display, serif' }}>{r.title}</span>
                    <span style={{ color: t.textMuted, fontSize: 12 }}>
                      {r.prepTime + r.cookTime}m · Serves {r.servings}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Chapter pages */}
        {chapters.map(cat => {
          const catRecipes = recipes.filter(r => r.category === cat);
          return (
            <div key={cat}>
              {/* Chapter header */}
              <div
                style={{
                  padding: '60px 0 40px',
                  borderTop: `2px solid ${t.border}`,
                  marginBottom: 40,
                  pageBreakBefore: 'always',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    color: t.gold,
                    marginBottom: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Chapter
                </div>
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 42,
                    fontWeight: 700,
                    color: t.text,
                  }}
                >
                  {cat}
                </h2>
                <div
                  style={{ width: 40, height: 2, background: t.accent, marginTop: 16 }}
                />
              </div>

              {catRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  style={{
                    marginBottom: 60,
                    pageBreakInside: 'avoid',
                    paddingBottom: 48,
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  {/* Recipe photo in print */}
                  {recipe.photo && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginBottom: 20,
                      }}
                    >
                      <Image
                        src={recipe.photo}
                        alt={recipe.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="760px"
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: 20 }}>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 28,
                        fontWeight: 600,
                        color: t.text,
                        marginBottom: 10,
                      }}
                    >
                      {recipe.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: 20,
                        fontSize: 12,
                        color: t.textMuted,
                      }}
                    >
                      <span>Prep: {recipe.prepTime}m</span>
                      <span>Cook: {recipe.cookTime}m</span>
                      <span>Serves: {recipe.servings}</span>
                      <span>Difficulty: {recipe.difficulty}</span>
                    </div>
                  </div>

                  {recipe.story && (
                    <p
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        fontSize: 14,
                        color: t.textMuted,
                        lineHeight: 1.7,
                        marginBottom: 20,
                        paddingLeft: 16,
                        borderLeft: `2px solid ${t.accent}`,
                      }}
                    >
                      &ldquo;{recipe.story}&rdquo;
                    </p>
                  )}

                  {recipe.description && (
                    <p
                      style={{
                        fontSize: 13.5,
                        color: t.text,
                        lineHeight: 1.7,
                        marginBottom: 24,
                      }}
                    >
                      {recipe.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.5fr',
                      gap: 32,
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 16,
                          color: t.text,
                          marginBottom: 12,
                        }}
                      >
                        Ingredients
                      </h4>
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        {recipe.ingredients?.map((ing, i) =>
                          ing === '—' ? (
                            <li
                              key={i}
                              style={{ height: 1, background: t.border, margin: '4px 0' }}
                            />
                          ) : (
                            <li
                              key={i}
                              style={{
                                fontSize: 12.5,
                                color: t.text,
                                display: 'flex',
                                gap: 8,
                                lineHeight: 1.5,
                              }}
                            >
                              <span style={{ color: t.accent, marginTop: 3, fontSize: 8 }}>
                                ●
                              </span>{' '}
                              {ing}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 16,
                          color: t.text,
                          marginBottom: 12,
                        }}
                      >
                        Method
                      </h4>
                      <ol
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                        }}
                      >
                        {recipe.steps?.map((step, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              gap: 10,
                              fontSize: 12.5,
                              color: t.text,
                              lineHeight: 1.6,
                            }}
                          >
                            <span
                              style={{
                                flexShrink: 0,
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: 700,
                                color: t.accent,
                                fontSize: 14,
                              }}
                            >
                              {i + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {recipe.notes && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: t.bgAccent,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: t.gold,
                        }}
                      >
                        Chef&apos;s Notes
                      </span>
                      <p
                        style={{
                          fontSize: 12.5,
                          color: t.text,
                          lineHeight: 1.65,
                          marginTop: 6,
                        }}
                      >
                        {recipe.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
