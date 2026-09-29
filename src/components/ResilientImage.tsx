import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#292524] via-[#44403C] to-[#78350F] text-[#FAF8F5] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-xl font-semibold tracking-wide text-[#FDE68A]">
          Sanggar Pitaloka Kusuma Putri
        </span>
        <span className="mt-2 text-xs text-[#E7E5E4] max-w-xs">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
