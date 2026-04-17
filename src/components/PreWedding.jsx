import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';

const preweddingPhotos = [
  {
    id: 1,
    src: '/iiim/prewedding/pexels-ankitpatel-8296801.jpg',
    title: 'Whispers of Love',
    location: 'Jaipur, Rajasthan',
    // tall portrait – spans 2 rows
    colSpan: '',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 2,
    src: '/iiim/prewedding/pexels-ankitpatel-8296813.jpg',
    title: 'Garden of Dreams',
    location: 'Udaipur, Rajasthan',
    colSpan: '',
    rowSpan: '',
  },
  {
    id: 3,
    src: '/iiim/prewedding/pexels-fotographiya-wedding-photography-823737813-31771913.jpg',
    title: 'Eternal Bloom',
    location: 'Mumbai, Maharashtra',
    colSpan: '',
    rowSpan: '',
  },
  {
    id: 4,
    src: '/iiim/prewedding/pexels-framesbygaurav-36967369.jpg',
    title: 'Royal Romance',
    location: 'Jodhpur, Rajasthan',
    // wide landscape – spans 2 cols on desktop
    colSpan: 'md:col-span-2',
    rowSpan: '',
  },
  {
    id: 5,
    src: '/iiim/prewedding/pexels-hasmukh-abchung-413074376-32495434.jpg',
    title: 'Sunrise Rendezvous',
    location: 'Rann of Kutch, Gujarat',
    colSpan: '',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 6,
    src: '/iiim/prewedding/pexels-upenderphotography-32404924.jpg',
    title: 'Golden Hour',
    location: 'Rishikesh, Uttarakhand',
    colSpan: '',
    rowSpan: '',
  },
  {
    id: 7,
    src: '/iiim/prewedding/pexels-ynk-photostudio-617964828-30372650.jpg',
    title: 'City of Love',
    location: 'Delhi, NCR',
    colSpan: '',
    rowSpan: '',
  },
];

/* ─── Lightbox ─────────────────────────────────────────────────────── */
const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  const photo = preweddingPhotos[index];

  // keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* ── close ── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* ── counter ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-gray-400 text-xs tracking-widest uppercase select-none">
        {index + 1} &nbsp;/&nbsp; {preweddingPhotos.length}
      </div>

      {/* ── prev ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-6 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      {/* ── image + caption ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col items-center w-full max-w-5xl px-16 md:px-24"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full max-h-[72vh] object-contain rounded-sm shadow-2xl select-none"
            draggable={false}
          />
          <div className="mt-5 text-center">
            <h3 className="text-white font-serif text-lg md:text-2xl mb-1 tracking-wide">{photo.title}</h3>
            <div className="flex items-center justify-center gap-1.5 text-gold-500">
              <MapPin size={11} />
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase">{photo.location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── next ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-6 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* ── dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {preweddingPhotos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); /* jump */ }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === index ? 'bg-gold-500 w-4' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Main Component ────────────────────────────────────────────────── */
const PreWedding = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const open = (idx) => setSelectedIndex(idx);
  const close = () => setSelectedIndex(null);
  const prev = () => setSelectedIndex((i) => (i - 1 + preweddingPhotos.length) % preweddingPhotos.length);
  const next = () => setSelectedIndex((i) => (i + 1) % preweddingPhotos.length);

  return (
    <section id="prewedding" className="relative py-16 md:py-28 bg-dark-900 overflow-hidden">
      {/* decorative bg — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] hidden md:block"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #B08D5B 0%, transparent 60%), radial-gradient(circle at 80% 20%, #B08D5B 0%, transparent 50%)',
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ════ HEADER ════ */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 tracking-[0.35em] uppercase text-[9px] sm:text-[11px] font-semibold mb-4"
          >
            Before The Big Day
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight"
          >
            Pre-Wedding{' '}
            <span className="text-gold-400 italic">Photographs</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="origin-center w-14 md:w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2"
          >
            Every love story deserves its own chapter. Our pre-wedding sessions capture raw,
            unscripted magic — stolen glances, gentle touches, and laughter that echoes across
            India's most breathtaking landscapes.
          </motion.p>
        </div>

        {/* ════ MASONRY BENTO GRID ════ */}
        {/*
          Desktop layout (3 cols, auto rows of 280px):
            Col 1: photo[0] spans 2 rows (tall)
            Col 2: photo[1], photo[2] stack
            Col 3: (empty top) + photo[3] wide (col-span-2)
          Row 2:
            Col 1: (cont. photo[0])
            Col 2: photo[4] spans 2 rows (tall)
            Col 3: photo[5], photo[6] stack

          Actually let's use a simpler reliable approach:
          6-column CSS grid for desktop, 2-column for mobile.
        */}

        {/* 
          SIMPLE RELIABLE MASONRY:
          - Mobile: 2-col equal grid
          - Desktop: featured bento layout with varied sizes
        */}

        {/* ─── MOBILE (2-col) ─── hidden on md+ */}
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {preweddingPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onClick={() => open(idx)}
              className={`relative group cursor-pointer overflow-hidden rounded bg-dark-800 ${
                idx === 0 ? 'col-span-2 h-56' : 'h-40'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* always-on gradient label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-3">
                <span className="text-gold-400 text-[8px] tracking-[0.2em] uppercase mb-0.5">{photo.location}</span>
                <h3 className="text-white font-serif text-xs leading-tight">{photo.title}</h3>
              </div>
              {/* zoom icon */}
              <div className="absolute top-2 right-2 bg-black/40 rounded-full p-1 opacity-0 group-active:opacity-100">
                <ZoomIn size={12} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── DESKTOP BENTO GRID ─── hidden on mobile */}
        <div
          className="hidden md:grid gap-3 lg:gap-4"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: '120px',
          }}
        >
          {/* Photo 1: tall hero – col 1-5, row 1-4 */}
          <BentoCard photo={preweddingPhotos[0]} idx={0} onOpen={open}
            style={{ gridColumn: '1 / 5', gridRow: '1 / 5' }} />

          {/* Photo 2: col 5-9, row 1-3 */}
          <BentoCard photo={preweddingPhotos[1]} idx={1} onOpen={open}
            style={{ gridColumn: '5 / 9', gridRow: '1 / 3' }} />

          {/* Photo 3: col 9-13, row 1-3 */}
          <BentoCard photo={preweddingPhotos[2]} idx={2} onOpen={open}
            style={{ gridColumn: '9 / 13', gridRow: '1 / 3' }} />

          {/* Photo 4: wide – col 5-13, row 3-5 */}
          <BentoCard photo={preweddingPhotos[3]} idx={3} onOpen={open}
            style={{ gridColumn: '5 / 13', gridRow: '3 / 5' }} />

          {/* Photo 5: col 1-5, row 5-8 */}
          <BentoCard photo={preweddingPhotos[4]} idx={4} onOpen={open}
            style={{ gridColumn: '1 / 5', gridRow: '5 / 8' }} />

          {/* Photo 6: col 5-9, row 5-8 */}
          <BentoCard photo={preweddingPhotos[5]} idx={5} onOpen={open}
            style={{ gridColumn: '5 / 9', gridRow: '5 / 8' }} />

          {/* Photo 7: col 9-13, row 5-8 */}
          <BentoCard photo={preweddingPhotos[6]} idx={6} onOpen={open}
            style={{ gridColumn: '9 / 13', gridRow: '5 / 8' }} />
        </div>

        {/* ════ STATS ROW ════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-20 grid grid-cols-3 gap-4 border border-white/5 rounded-sm p-6 md:p-10 bg-dark-800/40 backdrop-blur-sm"
        >
          {[
            { num: '500+', label: 'Sessions Shot' },
            { num: '15+', label: 'Scenic Locations' },
            { num: '100%', label: 'Happiness Guaranteed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gold-400 font-serif text-2xl md:text-4xl mb-1">{stat.num}</p>
              <p className="text-gray-400 text-[9px] md:text-xs tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ════ CTA ════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-14 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-gold-500 text-gold-400 px-8 md:px-14 py-3.5 md:py-4 text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-dark-900 transition-all duration-300 rounded-sm"
          >
            Book Your Pre-Wedding Session
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      {/* ════ LIGHTBOX ════ */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            index={selectedIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─── Bento Card (desktop only) ──────────────────────────────────────── */
const BentoCard = ({ photo, idx, onOpen, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.07 }}
    onClick={() => onOpen(idx)}
    className="relative group cursor-pointer overflow-hidden rounded-sm bg-dark-800"
    style={style}
  >
    <img
      src={photo.src}
      alt={photo.title}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      loading="lazy"
      decoding="async"
    />
    {/* dark vignette always */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    {/* hover overlay */}
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

    {/* caption */}
    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
      <div className="flex items-center gap-1.5 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <MapPin size={10} className="text-gold-400 flex-shrink-0" />
        <span className="text-gold-400 text-[9px] tracking-[0.2em] uppercase">{photo.location}</span>
      </div>
      <h3 className="text-white font-serif text-sm md:text-base lg:text-lg leading-tight">
        {photo.title}
      </h3>
    </div>

    {/* zoom icon on hover */}
    <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ZoomIn size={14} className="text-white" />
    </div>
  </motion.div>
);

export default PreWedding;
