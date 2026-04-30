'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RecipeGrid from './RecipeGrid';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import PrintPreview from './PrintPreview';
import DedicationModal from './DedicationModal';
import type { Recipe, RecipeFormData, Dedication } from '@/lib/types';

type View = 'browse' | 'detail' | 'form';

function AppInner() {
  const { theme: t } = useTheme();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [dedication, setDedication] = useState<Dedication | null>(null);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<View>('browse');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [searchQ, setSearchQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPrint, setShowPrint] = useState(false);
  const [showDedication, setShowDedication] = useState(false);

  const fetchRecipes = useCallback(async () => {
    const res = await fetch('/api/recipes');
    const data = await res.json();
    setRecipes(data);
  }, []);

  const fetchDedication = useCallback(async () => {
    const res = await fetch('/api/dedication');
    const data = await res.json();
    setDedication(data);
  }, []);

  useEffect(() => {
    Promise.all([fetchRecipes(), fetchDedication()]).finally(() => setLoading(false));
  }, [fetchRecipes, fetchDedication]);

  // Sync activeRecipe with recipe list after edits
  useEffect(() => {
    if (activeRecipe) {
      const updated = recipes.find(r => r.id === activeRecipe.id);
      if (updated) setActiveRecipe(updated);
    }
  }, [recipes]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (formData: RecipeFormData) => {
    const payload = {
      ...formData,
      prepTime: Number(formData.prepTime) || 0,
      cookTime: Number(formData.cookTime) || 0,
      servings: Number(formData.servings) || 1,
    };

    if (editRecipe) {
      const res = await fetch(`/api/recipes/${editRecipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updated: Recipe = await res.json();
      setRecipes(rs => rs.map(r => (r.id === editRecipe.id ? updated : r)));
      setActiveRecipe(updated);
      setView('detail');
    } else {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const created: Recipe = await res.json();
      setRecipes(rs => [...rs, created]);
      setActiveRecipe(created);
      setView('detail');
    }
    setEditRecipe(null);
  };

  const handleDelete = async () => {
    if (!activeRecipe) return;
    await fetch(`/api/recipes/${activeRecipe.id}`, { method: 'DELETE' });
    setRecipes(rs => rs.filter(r => r.id !== activeRecipe.id));
    setActiveRecipe(null);
    setView('browse');
  };

  const handleReorder = async (orderedIds: number[]) => {
    const items = orderedIds.map((id, order) => ({ id, order }));
    const newRecipes = items.map(({ id }) => recipes.find(r => r.id === id)!).filter(Boolean);
    setRecipes(newRecipes);
    await fetch('/api/recipes/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });
  };

  const handleSaveDedication = async (d: Dedication) => {
    const res = await fetch('/api/dedication', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: d.title, content: d.content }),
    });
    const updated = await res.json();
    setDedication(updated);
    setShowDedication(false);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setView('browse');
    setSearchQ('');
  };

  const handleNewRecipe = () => {
    setEditRecipe(null);
    setView('form');
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: t.bg,
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 28,
            color: t.accent,
          }}
        >
          Simply Done
        </div>
        <div style={{ fontSize: 13, color: t.textMuted }}>Loading your cookbook…</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: t.bg,
        color: t.text,
        overflow: 'hidden',
      }}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0,0,0,0.3)',
            display: 'none',
          }}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        recipes={recipes}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onNewRecipe={handleNewRecipe}
        onExportPDF={() => setShowPrint(true)}
        onEditDedication={() => setShowDedication(true)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar
          view={view}
          searchQ={searchQ}
          filteredCount={
            recipes.filter(r => {
              const matchesCat = activeCategory === 'All' || r.category === activeCategory;
              const q = searchQ.toLowerCase();
              return (
                matchesCat &&
                (!q ||
                  r.title.toLowerCase().includes(q) ||
                  r.tags?.some(tag => tag.toLowerCase().includes(q)) ||
                  r.category.toLowerCase().includes(q))
              );
            }).length
          }
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          onSearchChange={setSearchQ}
          onBack={() => {
            if (view === 'form' && editRecipe) {
              setView('detail');
            } else if (view === 'form') {
              setView('browse');
            } else {
              setView('browse');
            }
          }}
          title={
            view === 'detail'
              ? 'Back to recipes'
              : view === 'form'
              ? editRecipe
                ? 'Back to recipe'
                : 'Back to recipes'
              : undefined
          }
        />

        <main style={{ flex: 1, overflow: 'auto', padding: '0 28px' }}>
          {view === 'browse' && (
            <RecipeGrid
              recipes={recipes}
              searchQ={searchQ}
              activeCategory={activeCategory}
              onRecipeClick={recipe => {
                setActiveRecipe(recipe);
                setView('detail');
              }}
              onNewRecipe={handleNewRecipe}
              onReorder={handleReorder}
            />
          )}

          {view === 'detail' && activeRecipe && (
            <RecipeDetail
              recipe={activeRecipe}
              onBack={() => setView('browse')}
              onEdit={() => {
                setEditRecipe(activeRecipe);
                setView('form');
              }}
              onDelete={handleDelete}
            />
          )}

          {view === 'form' && (
            <RecipeForm
              initial={editRecipe}
              onSave={handleSave}
              onCancel={() => {
                if (editRecipe) {
                  setView('detail');
                } else {
                  setView('browse');
                }
                setEditRecipe(null);
              }}
            />
          )}
        </main>
      </div>

      {showPrint && (
        <PrintPreview
          recipes={recipes}
          dedication={dedication}
          onClose={() => setShowPrint(false)}
        />
      )}

      {showDedication && (
        <DedicationModal
          dedication={dedication}
          onSave={handleSaveDedication}
          onClose={() => setShowDedication(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
