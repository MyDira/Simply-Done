import React from 'react';
import Image from 'next/image';
import Icon from './Icon';
import type { Theme } from '@/lib/themes';

interface Props {
  src?: string;
  label?: string;
  style?: React.CSSProperties;
  t: Theme;
}

export default function PhotoPlaceholder({ src, label, style = {}, t }: Props) {
  if (src) {
    return (
      <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
        <Image
          src={src}
          alt={label || 'Recipe photo'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: `repeating-linear-gradient(45deg, ${t.bgAccent} 0px, ${t.bgAccent} 8px, ${t.border} 8px, ${t.border} 9px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        color: t.textLight,
        fontFamily: 'monospace',
        fontSize: 11,
        textAlign: 'center',
        ...style,
      }}
    >
      <Icon name="image" size={28} />
      <span style={{ maxWidth: 120, lineHeight: 1.4 }}>{label || 'recipe photo'}</span>
    </div>
  );
}
