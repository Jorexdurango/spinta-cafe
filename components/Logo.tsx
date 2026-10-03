import Image from 'next/image'
import React from 'react'

export interface LogoProps {
  variant?: 'naranja' | 'blanco' | 'negro'
  width?: number
  height?: number
  className?: string
  alt?: string
}

const logoSources = {
  naranja: '/LOGO-HORIZONTAL-NARANJA.png',
  blanco: '/LOGO-HORIZONTAL-BLANCO.png',
  negro: '/LOGO-HORIZONTAL-NEGRO.png',
}

export default function Logo({
  variant = 'naranja',
  width = 150,
  height = 40,
  className = '',
  alt = 'SPINTA CAFÉ',
}: LogoProps) {
  const src = logoSources[variant] || logoSources.naranja

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        width: 'auto',
        height: 'auto',
        maxHeight: `${height}px`,
        objectFit: 'contain',
      }}
      priority
    />
  )
}
