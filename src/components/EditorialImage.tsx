import { useState } from 'react';
import { Landmark } from 'lucide-react';

interface EditorialImageProps {
  src?: string;
  alt: string;
  caption?: string;
  kannadaLabel?: string;
  className?: string;
  aspectClass?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  kannadaLabel,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#2B1417] via-[#4A171C] to-[#7A561A] flex flex-col items-center justify-center p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, #D4A43C 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D4A43C 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <Landmark className="w-7 h-7 text-[#E5C16C] mb-2 relative z-10" aria-hidden="true" />
        {kannadaLabel && (
          <p className="font-kannada text-lg font-medium text-[#FBF6EB] relative z-10">
            {kannadaLabel}
          </p>
        )}
        <p className="text-xs text-[#E5D4B3] mt-1 max-w-[22ch] relative z-10">
          {caption ?? alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EDE6D8] ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
