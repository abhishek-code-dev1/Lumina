import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center md:animate-ken-burns scale-110"
          style={{ backgroundImage: 'url(/iiim/pexels-fotographiya-wedding-photography-823737813-30215313.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/90 z-10"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="mb-2 md:mb-4"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-[9px] md:text-sm font-semibold">
            Fine Art Photography
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-6xl lg:text-7xl mb-3 md:mb-6 text-white font-serif leading-tight drop-shadow-xl px-2"
        >
          Capturing Your <em className="text-gold-400 not-italic">Timeless</em> Moments
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-300 mb-6 md:mb-10 text-[11px] md:text-xl font-light tracking-wide max-w-2xl px-4"
        >
          Pre-Wedding | Weddings | Cinematic Films
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-2 md:gap-6 justify-center w-full px-4 md:px-0 sm:w-auto"
        >
          <Link to="contact" smooth={true} duration={800} offset={-80} className="w-1/2 sm:w-auto cursor-pointer">
            <button className="btn-primary w-full sm:w-auto py-2 md:py-3 text-[10px] md:text-sm px-2">
              Book Date
            </button>
          </Link>
          <Link to="portfolio" smooth={true} duration={800} offset={-80} className="w-1/2 sm:w-auto cursor-pointer">
            <button className="btn-outline w-full sm:w-auto bg-dark-900/30 backdrop-blur-sm py-2 md:py-3 text-[10px] md:text-sm px-2">
              Portfolio
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
