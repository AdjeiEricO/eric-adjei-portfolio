import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  containerClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className = '',
  containerClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200/70 to-slate-100 dark:from-[#0B1F33] dark:via-[#122D4A] dark:to-[#081421] text-slate-500 dark:text-slate-400 p-8 text-center ${containerClassName}`}
      >
        <div className="w-12 h-12 rounded-xl border border-slate-300/80 dark:border-[#224162] bg-white/80 dark:bg-[#0D2136]/90 flex items-center justify-center mb-3">
          <ImageIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        </div>
        <span className="font-display text-sm font-medium text-[#0B1F33] dark:text-slate-200">
          {title}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">{alt}</span>
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
}
