'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RecipeCard from './RecipeCard';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import type { Recipe } from '@/lib/types';

interface SortableCardProps {
  recipe: Recipe;
  onClick: () => void;
}

function SortableCard({ recipe, onClick }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: recipe.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <RecipeCard
        recipe={recipe}
        onClick={onClick}
        isDragging={isDragging}
        dragHandle={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

interface Props {
  recipes: Recipe[];
  searchQ: string;
  activeCategory: string;
  onRecipeClick: (recipe: Recipe) => void;
  onNewRecipe: () => void;
  onReorder: (ids: number[]) => void;
}

export default function RecipeGrid({
  recipes,
  searchQ,
  activeCategory,
  onRecipeClick,
  onNewRecipe,
  onReorder,
}: Props) {
  const { theme: t } = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filtered = recipes.filter(r => {
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    const q = searchQ.toLowerCase();
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.tags?.some(tag => tag.toLowerCase().includes(q)) ||
      r.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = recipes.findIndex(r => r.id === active.id);
    const newIndex = recipes.findIndex(r => r.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = [...recipes];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
    onReorder(newOrder.map(r => r.id));
  };

  return (
    <div style={{ paddingTop: 28 }}>
      {/* Section heading */}
      {activeCategory !== 'All' && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 30,
              fontWeight: 700,
              color: t.text,
              marginBottom: 4,
            }}
          >
            {activeCategory}
          </h2>
          <p style={{ fontSize: 13, color: t.textMuted }}>
            {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      {activeCategory === 'All' && !searchQ && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 30,
              fontWeight: 700,
              color: t.text,
              marginBottom: 4,
            }}
          >
            All Recipes
          </h2>
          <p style={{ fontSize: 13, color: t.textMuted }}>Your full collection</p>
        </div>
      )}
      {searchQ && (
        <div style={{ marginBottom: 24, fontSize: 14, color: t.textMuted }}>
          Results for &ldquo;<strong style={{ color: t.text }}>{searchQ}</strong>&rdquo;
        </div>
      )}

      {filtered.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            paddingTop: 80,
            color: t.textMuted,
          }}
        >
          <Icon name="book" size={48} style={{ opacity: 0.3 }} />
          <p style={{ fontSize: 15 }}>No recipes found</p>
          {!searchQ && (
            <button
              onClick={onNewRecipe}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: t.accent,
                color: t.accentText,
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
              }}
            >
              Add the first one
            </button>
          )}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={recipes.map(r => r.id)}
            strategy={rectSortingStrategy}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 20,
                paddingBottom: 48,
              }}
            >
              {filtered.map(recipe => (
                <SortableCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => onRecipeClick(recipe)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
