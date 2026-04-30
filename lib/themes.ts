export interface Theme {
  name: string;
  bg: string;
  bgCard: string;
  bgSidebar: string;
  bgAccent: string;
  border: string;
  text: string;
  textMuted: string;
  textLight: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
  accentText: string;
  gold: string;
  headerBg: string;
  shadow: string;
  shadowHover: string;
  scrollThumb: string;
  categoryBg: string;
  categoryText: string;
  inputBg: string;
  inputBorder: string;
}

export type ThemeName = 'lavender' | 'midnight' | 'spice';

export const THEMES: Record<ThemeName, Theme> = {
  lavender: {
    name: 'Lavender Editorial',
    bg: '#faf8fc',
    bgCard: '#ffffff',
    bgSidebar: '#f3eef9',
    bgAccent: '#ede6f7',
    border: '#e2d8f0',
    text: '#1a1625',
    textMuted: '#7c6e91',
    textLight: '#b5aac5',
    accent: 'oklch(52% 0.18 290)',
    accentHover: 'oklch(46% 0.18 290)',
    accentSoft: 'oklch(95% 0.05 290)',
    accentText: '#ffffff',
    gold: 'oklch(68% 0.12 75)',
    headerBg: '#ffffff',
    shadow: '0 2px 16px rgba(100,70,160,0.08)',
    shadowHover: '0 8px 32px rgba(100,70,160,0.14)',
    scrollThumb: '#c5b5e0',
    categoryBg: 'oklch(94% 0.04 290)',
    categoryText: 'oklch(42% 0.18 290)',
    inputBg: '#f7f4fc',
    inputBorder: '#d5c8e8',
  },
  midnight: {
    name: 'Midnight Plum',
    bg: '#100d18',
    bgCard: '#1c1628',
    bgSidebar: '#150e22',
    bgAccent: '#231a34',
    border: '#2e2245',
    text: '#ede6f9',
    textMuted: '#9b8fbd',
    textLight: '#5e5276',
    accent: 'oklch(72% 0.16 290)',
    accentHover: 'oklch(78% 0.16 290)',
    accentSoft: 'oklch(25% 0.08 290)',
    accentText: '#100d18',
    gold: 'oklch(78% 0.14 75)',
    headerBg: '#150e22',
    shadow: '0 2px 20px rgba(0,0,0,0.4)',
    shadowHover: '0 8px 36px rgba(0,0,0,0.55)',
    scrollThumb: '#3d2e5a',
    categoryBg: 'oklch(22% 0.07 290)',
    categoryText: 'oklch(80% 0.12 290)',
    inputBg: '#1c1628',
    inputBorder: '#2e2245',
  },
  spice: {
    name: 'Spice Market',
    bg: '#fdf6ee',
    bgCard: '#ffffff',
    bgSidebar: '#fef0e0',
    bgAccent: '#fde8d0',
    border: '#ecd5b8',
    text: '#2a1f0e',
    textMuted: '#8c6b45',
    textLight: '#c4a880',
    accent: 'oklch(52% 0.18 290)',
    accentHover: 'oklch(46% 0.18 290)',
    accentSoft: 'oklch(95% 0.06 290)',
    accentText: '#ffffff',
    gold: 'oklch(65% 0.15 55)',
    headerBg: '#fff8f0',
    shadow: '0 2px 16px rgba(80,40,10,0.08)',
    shadowHover: '0 8px 32px rgba(80,40,10,0.14)',
    scrollThumb: '#d4a870',
    categoryBg: 'oklch(93% 0.04 60)',
    categoryText: 'oklch(42% 0.14 55)',
    inputBg: '#fef8f0',
    inputBorder: '#e0c89a',
  },
};
