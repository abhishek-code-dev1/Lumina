import React from 'react';
import LazyImage from './LazyImage';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Image Side ── */}
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative corners — desktop only */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-gold-500/50 z-0 hidden md:block" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-gold-500/50 z-0 hidden md:block" />

            <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4">
              {/* Image 1 */}
              <div className="overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
                <LazyImage
                src="/iiim/pexels-ids-fotowale-1416063-17000468.jpg"
                alt="Lumina photographer at work"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                wrapperClassName="w-full h-full"
              />
              </div>
              {/* Image 2 — offset down */}
              <div className="overflow-hidden rounded-sm mt-6 md:mt-8" style={{ aspectRatio: '3/4' }}>
                <LazyImage
                src="/iiim/pexels-wedding-photography-2152349351-32153629.jpg"
                alt="Wedding in progress"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                wrapperClassName="w-full h-full"
              />
              </div>
            </div>
          </div>

          {/* ── Text Side ── */}
          <div className="w-full lg:w-1/2">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 block">
              Our Story
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-white mb-5 md:mb-8 leading-tight">
              More Than Just Pictures.<br className="hidden md:block" /> We Capture Legacies.
            </h2>

            <p className="text-gray-400 font-light text-sm md:text-lg mb-4 leading-relaxed">
              Founded by visionary artists, Lumina Studio believes that every couple has a unique, beautiful story. We don't just take photographs; we freeze time. Our cinematic approach ensures that when you look back 20 years from now, you'll feel the exact emotion of that very second.
            </p>
            <p className="text-gray-400 font-light text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
              With an obsession for perfect lighting, elegant composition, and raw emotion, we turn ordinary moments into timeless art.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 border-y border-white/10">
              {[
                { num: '500+', label: 'Weddings Captured' },
                { num: '12',   label: 'Years Experience' },
                { num: '7',    label: 'Awards Won' },
              ].map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-2xl md:text-4xl text-white font-serif mb-1">{stat.num}</h4>
                  <span className="text-gold-500 uppercase tracking-widest text-[8px] md:text-xs leading-tight block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10">
              <p className="text-gold-400 font-serif text-lg italic">Arjun &amp; Riya</p>
              <p className="text-white uppercase tracking-widest text-xs mt-1 font-semibold">Founders, Lumina Studio</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
