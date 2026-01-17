import React from 'react';
import spriteData from '@/public/images/sprite_sheet.json';

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export const SpriteIcon: React.FC<Props> = ({ name, size = 32, className = "" }) => {
  const sprite = spriteData.sprites.find(s => s.fileName === `${name}.png` || s.fileName === name);

  if (!sprite) {
    console.warn(`Sprite not found: ${name}`);
    return null;
  }

  // Calculate scaling if size is different from sprite.width/height
  const scaleX = size / sprite.width;
  const scaleY = size / sprite.height;

  const style: React.CSSProperties = {
    display: 'inline-block',
    backgroundImage: "url('/images/!sprite_sheet.png')",
    backgroundPosition: `-${sprite.x * scaleX}px -${sprite.y * scaleY}px`,
    backgroundSize: `${spriteData.spriteSheetWidth * scaleX}px ${spriteData.spriteSheetHeight * scaleY}px`,
    width: `${size}px`,
    height: `${size}px`,
    imageRendering: 'pixelated', // Keep it crisp if it's pixel art
  };

  return <div className={className} style={style} title={name} />;
};
