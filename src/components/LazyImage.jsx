/**
 * LazyImage — drop-in <img> replacement with:
 *  • IntersectionObserver: only fetches image when 400px from viewport
 *  • Animated skeleton shimmer shown while loading
 *  • Smooth opacity fade-in once image is decoded
 *  • Zero layout shift (aspect-ratio via wrapper)
 *  • Eager mode for above-fold / hero images
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ── Shared IntersectionObserver (one observer for all images) ─────────── */
const observers = new Map();
function getObserver(rootMargin) {
  if (observers.has(rootMargin)) return observers.get(rootMargin);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cb = entry.target._lazyCallback;
          if (cb) { cb(); obs.unobserve(entry.target); }
        }
      });
    },
    { rootMargin }
  );
  observers.set(rootMargin, obs);
  return obs;
}

/* ── Skeleton shimmer style ─────────────────────────────────────────────── */
const SHIMMER_STYLE = {
  background: 'linear-gradient(90deg, #141414 25%, #1e1a10 50%, #141414 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s ease-in-out infinite',
};

/* ── Component ───────────────────────────────────────────────────────────── */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  eager = false,        // true → load immediately (above fold)
  rootMargin = '400px', // how far before viewport to start loading
  aspectRatio,          // e.g. "16/9" — prevents CLS without fixed height
  wrapperClassName = '',
  ...imgProps
}) => {
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [loaded, setLoaded]         = useState(false);
  const [error, setError]           = useState(false);
  const wrapperRef = useRef(null);

  // ── Start load when near viewport ───────────────────────────────────────
  useEffect(() => {
    if (eager || !wrapperRef.current) { setShouldLoad(true); return; }

    const el = wrapperRef.current;
    const obs = getObserver(rootMargin);
    el._lazyCallback = () => setShouldLoad(true);
    obs.observe(el);

    return () => {
      obs.unobserve(el);
      el._lazyCallback = null;
    };
  }, [eager, rootMargin]);

  const handleLoad  = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => { setLoaded(true); setError(true); }, []);

  const wrapperStyle = aspectRatio
    ? { aspectRatio, overflow: 'hidden', position: 'relative', ...style }
    : { position: 'relative', ...style };

  return (
    <div ref={wrapperRef} className={`lazy-img-wrapper ${wrapperClassName}`} style={wrapperStyle}>

      {/* ── Skeleton shimmer — shown until image is loaded ── */}
      {!loaded && (
        <div
          className="absolute inset-0 z-0"
          style={SHIMMER_STYLE}
          aria-hidden="true"
        />
      )}

      {/* ── Actual image ── */}
      {shouldLoad && (
        <img
          src={error ? '' : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : 'low'}
          draggable={false}
          className={`
            ${className}
            relative z-10
            transition-opacity duration-700 ease-in-out
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `.trim()}
          style={{ willChange: loaded ? 'auto' : 'opacity' }}
          {...imgProps}
        />
      )}

      {/* ── Error fallback ── */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-dark-800">
          <span className="text-gray-600 text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
