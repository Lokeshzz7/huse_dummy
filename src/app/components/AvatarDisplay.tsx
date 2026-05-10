import React from 'react';

interface AvatarDisplayProps {
  avatar?: string;
  name?: string;
  className?: string;
}

export function AvatarDisplay({ avatar, name, className = "" }: AvatarDisplayProps) {
  if (avatar?.startsWith('http')) {
    return <img src={avatar} alt={name || 'Avatar'} className={`w-full h-full object-cover rounded-full ${className}`} />;
  }
  
  if (avatar) {
    return <span className={className}>{avatar}</span>;
  }
  
  if (name) {
    return <span className={className}>{name.charAt(0)}</span>;
  }
  
  return <span className={className}>👤</span>;
}
