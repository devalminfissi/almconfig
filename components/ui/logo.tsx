import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 120, height = 60 }: LogoProps) {
  return (
    <Image
      src="/alm.png"
      alt="ALM Infissi Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
