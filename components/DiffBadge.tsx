import React from 'react';

const COLORS: Record<string, string> = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

export default function DiffBadge({ level }: { level: string }) {
  const color = COLORS[level] || COLORS.Easy;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 9px',
        borderRadius: 99,
        background: color + '22',
        color,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {level}
    </span>
  );
}
