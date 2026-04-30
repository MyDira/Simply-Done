'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, type Theme, type ThemeName } from '@/lib/themes';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.lavender,
  themeName: 'lavender',
  setThemeName: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeNameState] = useState<ThemeName>('lavender');

  useEffect(() => {
    const saved = localStorage.getItem('simply-done-theme') as ThemeName | null;
    if (saved && saved in THEMES) setThemeNameState(saved);
  }, []);

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);
    localStorage.setItem('simply-done-theme', name);
  };

  const theme = THEMES[themeName];

  useEffect(() => {
    const style = document.getElementById('theme-scrollbar') || document.createElement('style');
    style.id = 'theme-scrollbar';
    style.textContent = `::-webkit-scrollbar-thumb { background: ${theme.scrollThumb}; }`;
    if (!document.getElementById('theme-scrollbar')) document.head.appendChild(style);
  }, [theme.scrollThumb]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
