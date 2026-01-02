'use client';

import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import Image from 'next/image';

// Fallback image as data URL (simple gray placeholder)
const DEFAULT_FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzY2NjY2NiI+SW1hZ2UgUGxhY2Vob2xkZXI8L3RleHQ+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMCwyMCBMMjgwLDI4MCBNMjgwLDIwIEwyMCwyODAiLz48L2c+PC9zdmc+';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16-9' | '4-3' | '1-1' | '3-2' | '2-3';
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fallbackSrc?: string | null;
  focalPoint?: { x: string; y: string };
  onClick?: () => void;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  aspectRatio = '16-9',
  objectFit = 'cover',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  fallbackSrc = null,
  focalPoint,
  onClick,
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = useCallback(() => {
    setError(true);
    setImgSrc(fallbackSrc || DEFAULT_FALLBACK_IMAGE);
  }, [fallbackSrc]);

  // Determine if we should use Next.js Image or regular img
  const isNextImage = src.startsWith('/') || src.startsWith('http');

  // Set focal point style if provided
  const focalPointStyle = focalPoint
    ? {
        '--focal-x': focalPoint.x,
        '--focal-y': focalPoint.y,
      }
    : {};

  return (
    <div
      className={`aspect-ratio-container ratio-${aspectRatio} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {isNextImage ? (
        // Use Next.js Image for local or external URLs
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={`${
            objectFit === 'cover' ? 'img-cover' : 'img-contain'
          } ${isLoading ? 'blur-up' : 'blur-up loaded'} ${
            error ? 'error' : ''
          } ${focalPoint ? 'img-focal-point' : ''}`}
          style={focalPointStyle as React.CSSProperties}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        // Use regular img for data URLs or other sources
        <img
          src={imgSrc}
          alt={alt}
          className={`${
            objectFit === 'cover' ? 'img-cover' : 'img-contain'
          } ${isLoading ? 'blur-up' : 'blur-up loaded'} ${
            error ? 'error' : ''
          } ${focalPoint ? 'img-focal-point' : ''}`}
          style={focalPointStyle as React.CSSProperties}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state with fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 text-gray-500 text-sm p-4 text-center">
          {alt || 'Image could not be loaded'}
        </div>
      )}
    </div>
  );
}

// Picture component for art direction
interface ResponsivePictureProps {
  mobileSrc: string;
  tabletSrc?: string;
  desktopSrc: string;
  alt: string;
  className?: string;
}

export function ResponsivePicture({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className = '',
}: ResponsivePictureProps) {
  return (
    <picture className={className}>
      <source media="(max-width: 640px)" srcSet={mobileSrc} />
      {tabletSrc && <source media="(max-width: 1024px)" srcSet={tabletSrc} />}
      <source media="(min-width: 1025px)" srcSet={desktopSrc} />
      <img src={desktopSrc} alt={alt} className="responsive-img" />
    </picture>
  );
}

// Background image component
interface ResponsiveBackgroundProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  backgroundSize?: 'cover' | 'contain';
}

export function ResponsiveBackground({
  src,
  className = '',
  children,
  backgroundSize = 'cover',
}: ResponsiveBackgroundProps) {
  return (
    <div
      className={`${
        backgroundSize === 'cover' ? 'bg-responsive' : 'bg-responsive-contain'
      } ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    >
      {children}
    </div>
  );
}

// Image gallery component
interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ResponsiveGalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function ResponsiveGallery({
  images,
  className = '',
  columns = 3,
}: ResponsiveGalleryProps) {
  return (
    <div
      className={`img-gallery ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {images.map((image, index) => (
        <div key={index} className="img-card">
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            aspectRatio="1-1"
            className="img-card-img"
          />
        </div>
      ))}
    </div>
  );
}