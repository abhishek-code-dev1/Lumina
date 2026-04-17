import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Engagements', 'Cinematic'];

const galleryItems = [
  {
    id: 1,
    category: 'Weddings',
    src: '/iiim/pexels-fotographiya-wedding-photography-823737813-30215313.jpg',
    title: 'The Celebration',
    size: 'large', // hero card — 2 cols + 2 rows on desktop
  },
  {
    id: 2,
    category: 'Pre-Wedding',
    src: '/iiim/prewedding/pexels-framesbygaurav-36967369.jpg',
    title: 'Royal Romance',
    size: 'normal',
  },
  {
    id: 3,
    category: 'Engagements',
    src: '/iiim/pexels-supriyo-raii-1011612-19613666.jpg',
    title: 'The Question',
    size: 'normal',
  },
  {
    id: 4,
    category: 'Weddings',
    src: '/iiim/pexels-aalap-creation-2158557916-35457634.jpg',
    title: 'Sacred Vows',
    size: 'wide', // 2-col wide
  },
  {
    id: 5,
    category: 'Cinematic',
    src: '/iiim/pexels-khaas-photographer-3700378-24334710.jpg',
    title: 'Heritage Details',
    size: 'normal',
  },
  {
    id: 6,
    category: 'Pre-Wedding',
    src: '/iiim/prewedding/pexels-upenderphotography-32404924.jpg',
    title: 'Golden Hour',
    size: 'normal',
  },
  {
    id: 7,
    category: 'Pre-Wedding',
    src: '/iiim/prewedding/pexels-fotographiya-wedding-photography-823737813-31771913.jpg',
    title: 'Eternal Bond',
    size: 'normal',
  },
];

/* 
  Desktop CSS grid layout (4 cols, auto rows 200px):
  Item 1 (large):  col 1-3, row 1-3
  Item 2 (normal): col 3-4 (actually col 3-5), row 1-2  → actually col 3/5 row 1-2
  Item 3 (normal): col 3-5, row 2-4  = wait, let's use explicit placement
  
  Explicit placement approach for the 7 items:
  1 → col 1/3, row 1/3 (big hero)
  2 → col 3/5, row 1/2
  3 → col 3/5, row 2/3
  4 → col 1/3, row 3/4 (wide)  
  5 → col 3/4, row 3/4
  6 → col 4/5, row 3/4
  7 → col 1/3 or col 3/5, row 4/5 ... 

  Actually let's keep it simpler and robust: 
  Use a 3-col grid, auto-rows with some items spanning more.
*/

const desktopStyles = [
  { gridColumn: '1 / 3', gridRow: '1 / 3' },   // 1 – big hero (2×2)
  { gridColumn: '3 / 4', gridRow: '1 / 2' },    // 2
  { gridColumn: '3 / 4', gridRow: '2 / 3' },    // 3
  { gridColumn: '1 / 3', gridRow: '3 / 4' },    // 4 – wide (2×1)
  { gridColumn: '3 / 4', gridRow: '3 / 4' },    // 5
  { gridColumn: '1 / 2', gridRow: '4 / 5' },    // 6
  { gridColumn: '2 / 4', gridRow: '4 / 5' },    // 7 – wide (2×1)
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(null);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  const closeLightbox = () => setSelectedIdx(null);
  const goPrev = () => setSelectedIdx((i) => (i - 1 + filteredItems.length) % filteredItems.length);
  const goNext = () => setSelectedIdx((i) => (i + 1) % filteredItems.length);

  // Show the "All" filtered items in the bento only when showing all;
  // For filtered views switch to a uniform grid
  const isBento = activeCategory === 'All';

  return (
    <section id="portfolio" className="relative py-14 md:py-24 bg-dark-900 border-b border-white/5 overflow-hidden">
      {/* subtle bg glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ════ HEADER ════ */}
        <div className="text-center mb-8 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 tracking-[0.35em] uppercase text-[9px] sm:text-[11px] font-semibold mb-3"
          >
            Gallery
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3 leading-tight"
          >
            Our <span className="text-gold-400 italic">Masterpieces</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="origin-center w-14 md:w-20 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"
          />
        </div>

        {/* ════ FILTER TABS ════ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-0 md:flex-wrap md:justify-center mb-8 md:mb-12 pb-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelectedIdx(null); }}
              className={`relative flex-shrink-0 px-4 md:px-6 py-2 text-[10px] md:text-xs tracking-widest uppercase transition-all duration-200 rounded-full md:rounded-none ${
                activeCategory === cat
                  ? 'text-dark-900 bg-gold-500 md:bg-transparent md:text-gold-500'
                  : 'text-gray-400 hover:text-white bg-dark-800/60 md:bg-transparent'
              }`}
            >
              {cat}
              {/* underline on desktop */}
              {activeCategory === cat && (
                <span className="hidden md:block absolute bottom-0 left-0 w-full h-px bg-gold-500" />
              )}
            </button>
          ))}
        </motion.div>

        {/* ════ GALLERY GRID ════ */}

        {/* ── Mobile: always 2-col uniform ── */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelectedIdx(idx)}
                className={`relative group cursor-pointer overflow-hidden rounded bg-dark-800 ${
                  idx === 0 && activeCategory === 'All' ? 'col-span-2 h-52' : 'h-40'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
                  <span className="text-gold-400 text-[8px] tracking-[0.18em] uppercase mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-xs leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Desktop: bento (All) or uniform grid (filtered) ── */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {isBento ? (
              /* ── BENTO LAYOUT ── */
              <motion.div
                key="bento"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridAutoRows: '240px',
                  gap: '12px',
                }}
              >
                {galleryItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    onClick={() => setSelectedIdx(idx)}
                    className="relative group cursor-pointer overflow-hidden rounded-sm bg-dark-800"
                    style={desktopStyles[idx]}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* permanent vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    {/* hover darken */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                      <span className="text-gold-400 text-[9px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-white font-serif text-base md:text-lg lg:text-xl leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    {/* zoom icon */}
                    <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* ── FILTERED UNIFORM GRID ── */
              <motion.div
                key={`filtered-${activeCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-3"
              >
                <AnimatePresence>
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      onClick={() => setSelectedIdx(idx)}
                      className="relative group cursor-pointer overflow-hidden rounded-sm bg-dark-800 h-72"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-gold-400 text-[9px] tracking-widest uppercase mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-white font-serif text-xl">{item.title}</h3>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn size={14} className="text-white" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ════ LIGHTBOX ════ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96 backdrop-blur-2xl"
            onClick={closeLightbox}
          >
            {/* close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
            >
              <X size={18} />
            </button>

            {/* counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-gray-400 text-xs tracking-widest select-none">
              {selectedIdx + 1} / {filteredItems.length}
            </div>

            {/* prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
            >
              <ChevronLeft size={22} />
            </button>

            {/* image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center max-w-5xl w-full px-14 md:px-20"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full max-h-[72vh] object-contain rounded-sm shadow-2xl select-none"
                  draggable={false}
                />
                <div className="mt-5 text-center">
                  <h3 className="text-white font-serif text-lg md:text-2xl mb-1">{selectedItem.title}</h3>
                  <p className="text-gold-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                    {selectedItem.category}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark-900 text-white transition-all duration-200"
            >
              <ChevronRight size={22} />
            </button>

            {/* dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredItems.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIdx ? 'bg-gold-500 w-5' : 'bg-white/25 w-1.5'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
