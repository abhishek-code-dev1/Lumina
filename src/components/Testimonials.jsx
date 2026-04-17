import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Priyanka & Rahul",
    date: "September 2023",
    text: "Lumina didn't just take photos; they captured the absolute essence of our love. The cinematic video from our Udaipur palace wedding still makes me cry every single time I watch it. They are true masters of their craft.",
    image: "/iiim/pexels-khaas-photographer-3700378-24334706.jpg"
  },
  {
    id: 2,
    name: "Sneha & Vikram",
    date: "July 2023",
    text: "From our pre-wedding shoot in Jaipur to the grand reception, their team was flawless. The attention to detail and the moody, elegant edit is exactly what we dreamed of. Worth every penny.",
    image: "/iiim/pexels-ids-fotowale-1416063-17000468.jpg"
  },
  {
    id: 3,
    name: "Ananya & Rohan",
    date: "May 2024",
    text: "We wanted a non-traditional, highly editorial and fashion-forward look for our wedding. Lumina delivered beyond our wildest expectations. The album looks like it belongs in Vogue India.",
    image: "/iiim/pexels-wedding-photography-2152349351-32153629.jpg"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

  return (
    <section className="py-16 md:py-24 bg-dark-800 relative overflow-hidden flex items-center justify-center min-h-[500px] md:min-h-[600px]">
      {/* Background glow — hidden on mobile via CSS for perf */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
        <Quote size={48} className="text-gold-500/40 mx-auto mb-8" />
        
        <div className="relative h-[300px] md:h-[250px] flex justify-center items-center">
          <AnimatePresence mode='wait'>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <p className="text-xl md:text-3xl text-gray-200 font-light font-serif leading-relaxed italic mb-10 px-4 md:px-16">
                "{testimonials[current].text}"
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover object-top mb-4 border border-gold-500/30"
                />
                <h4 className="text-white uppercase tracking-widest text-sm font-semibold">{testimonials[current].name}</h4>
                <span className="text-gold-500 text-xs font-light tracking-wide">{testimonials[current].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button onClick={prev} className="p-3 border border-white/20 hover:border-gold-500 text-white hover:text-gold-500 rounded-full transition-all duration-300">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-gold-500 w-6' : 'bg-white/20 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <button onClick={next} className="p-3 border border-white/20 hover:border-gold-500 text-white hover:text-gold-500 rounded-full transition-all duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
