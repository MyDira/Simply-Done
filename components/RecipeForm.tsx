'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import DiffBadge from './DiffBadge';
import { CATEGORIES, type Recipe, type RecipeFormData } from '@/lib/types';

interface Props {
  initial?: Recipe | null;
  onSave: (data: RecipeFormData) => void;
  onCancel: () => void;
}

const EMPTY: RecipeFormData = {
  title: '',
  category: 'Meat',
  difficulty: 'Easy',
  prepTime: '',
  cookTime: '',
  servings: '',
  description: '',
  story: '',
  notes: '',
  photo: '',
  tags: [],
  ingredients: [''],
  steps: [''],
};

export default function RecipeForm({ initial, onSave, onCancel }: Props) {
  const { theme: t } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<RecipeFormData>(() =>
    initial
      ? {
          title: initial.title,
          category: initial.category,
          difficulty: initial.difficulty,
          prepTime: initial.prepTime,
          cookTime: initial.cookTime,
          servings: initial.servings,
          description: initial.description || '',
          story: initial.story || '',
          notes: initial.notes || '',
          photo: initial.photo || '',
          tags: [...initial.tags],
          ingredients: initial.ingredients.length ? [...initial.ingredients] : [''],
          steps: initial.steps.length ? [...initial.steps] : [''],
        }
      : EMPTY
  );
  const [tagInput, setTagInput] = useState('');

  const set = <K extends keyof RecipeFormData>(key: K, val: RecipeFormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const updateList = (key: 'ingredients' | 'steps', idx: number, val: string) => {
    const arr = [...form[key]];
    arr[idx] = val;
    set(key, arr);
  };

  const addListItem = (key: 'ingredients' | 'steps') =>
    set(key, [...form[key], '']);

  const removeListItem = (key: 'ingredients' | 'steps', idx: number) =>
    set(key, form[key].filter((_, i) => i !== idx));

  const addTag = () => {
    const v = tagInput.trim();
    if (v && !form.tags.includes(v)) set('tags', [...form.tags, v]);
    setTagInput('');
  };

  const handlePhotoUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) set('photo', data.url);
    setUploading(false);
  };

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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: t.textMuted,
    marginBottom: 6,
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 28 }}>
      <h3
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 17,
          color: t.text,
          fontWeight: 600,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 0 80px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0 32px',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 28,
            fontWeight: 700,
            color: t.text,
          }}
        >
          {initial ? 'Edit Recipe' : 'New Recipe'}
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onCancel}
            style={{
              padding: '9px 20px',
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
            onClick={() => onSave(form)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '9px 22px',
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
            <Icon name="save" size={15} /> Save Recipe
          </button>
        </div>
      </div>

      <Section title="Basics">
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={labelStyle}>Recipe Title *</label>
            <input
              style={inputStyle}
              value={form.title}
              placeholder="e.g. Slow-Roasted Lamb Shoulder"
              onChange={e => set('title', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Difficulty</label>
              <select
                style={inputStyle}
                value={form.difficulty}
                onChange={e => set('difficulty', e.target.value as RecipeFormData['difficulty'])}
              >
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Prep Time (min)</label>
              <input
                style={inputStyle}
                type="number"
                value={form.prepTime}
                onChange={e => set('prepTime', e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Cook Time (min)</label>
              <input
                style={inputStyle}
                type="number"
                value={form.cookTime}
                onChange={e => set('cookTime', e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Servings</label>
              <input
                style={inputStyle}
                type="number"
                value={form.servings}
                onChange={e => set('servings', e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              {form.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 10px',
                    borderRadius: 99,
                    background: t.accentSoft,
                    color: t.accent,
                    fontSize: 12,
                    border: `1px solid ${t.accent}44`,
                  }}
                >
                  {tag}
                  <button
                    onClick={() => set('tags', form.tags.filter(t2 => t2 !== tag))}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      padding: 0,
                      lineHeight: 1,
                      fontSize: 14,
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={tagInput}
                placeholder="Add a tag (e.g. Weeknight, Spicy)…"
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag()}
              />
              <button
                onClick={addTag}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  background: t.bgCard,
                  color: t.textMuted,
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Photo upload */}
      <Section title="Photo">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handlePhotoUpload(file);
          }}
        />
        {form.photo ? (
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ position: 'relative', width: '100%', height: 200 }}>
              <Image
                src={form.photo}
                alt="Recipe"
                fill
                style={{ objectFit: 'cover' }}
                sizes="780px"
              />
            </div>
            <button
              onClick={() => set('photo', '')}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              height: 160,
              borderRadius: 12,
              border: `2px dashed ${t.border}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              cursor: 'pointer',
              color: t.textMuted,
              background: t.inputBg,
              transition: 'border-color 0.15s',
            }}
          >
            {uploading ? (
              <span style={{ fontSize: 13 }}>Uploading…</span>
            ) : (
              <>
                <Icon name="upload" size={24} />
                <span style={{ fontSize: 13 }}>Click to upload a photo</span>
                <span style={{ fontSize: 11, color: t.textLight }}>JPG, PNG, WebP</span>
              </>
            )}
          </div>
        )}
      </Section>

      <Section title="Description & Story">
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.description}
              placeholder="A short description of the dish…"
              onChange={e => set('description', e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Your story / memory</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
              value={form.story}
              placeholder="Where does this recipe come from? What does it mean to you?"
              onChange={e => set('story', e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section title="Ingredients">
        <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 12 }}>
          Use{' '}
          <code
            style={{ background: t.bgAccent, padding: '1px 5px', borderRadius: 4 }}
          >
            —
          </code>{' '}
          as a separator between ingredient groups.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {form.ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={ing}
                placeholder={i === 0 ? 'e.g. 2 tbsp olive oil' : ''}
                onChange={e => updateList('ingredients', i, e.target.value)}
              />
              <button
                onClick={() => removeListItem('ingredients', i)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  background: t.bgCard,
                  color: t.textLight,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addListItem('ingredients')}
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px dashed ${t.border}`,
            background: 'none',
            color: t.textMuted,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          }}
        >
          <Icon name="plus" size={14} /> Add ingredient
        </button>
      </Section>

      <Section title="Method">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {form.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: t.accentSoft,
                  color: t.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 600,
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                {i + 1}
              </span>
              <textarea
                style={{ ...inputStyle, flex: 1, resize: 'vertical', minHeight: 72 }}
                value={step}
                placeholder={`Step ${i + 1}…`}
                onChange={e => updateList('steps', i, e.target.value)}
              />
              <button
                onClick={() => removeListItem('steps', i)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  background: t.bgCard,
                  color: t.textLight,
                  cursor: 'pointer',
                  marginTop: 6,
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addListItem('steps')}
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px dashed ${t.border}`,
            background: 'none',
            color: t.textMuted,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          }}
        >
          <Icon name="plus" size={14} /> Add step
        </button>
      </Section>

      <Section title="Chef's Notes">
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
          value={form.notes}
          placeholder="Tips, substitutions, make-ahead advice…"
          onChange={e => set('notes', e.target.value)}
        />
      </Section>

      {/* Difficulty preview */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: t.textMuted }}>Difficulty preview:</span>
        <DiffBadge level={form.difficulty} />
      </div>
    </div>
  );
}
