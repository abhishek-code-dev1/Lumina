import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-gold-500/50 z-0 hidden md:block"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-gold-500/50 z-0 hidden md:block"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <img 
                src="/iiim/pexels-ids-fotowale-1416063-17000468.jpg" 
                alt="Photographer at work" 
                className="w-full h-80 object-cover object-top rounded-sm grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <img 
                src="/iiim/pexels-wedding-photography-2152349351-32153629.jpg" 
                alt="Wedding in progress" 
                className="w-full h-72 object-cover rounded-sm mt-8 grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 md:mb-8">More Than Just Pictures. We Capture Legacies.</h2>
            
            <p className="text-gray-400 font-light text-lg mb-6 leading-relaxed">
              Founded by visionary artists, Lumina Studio believes that every couple has a unique, beautiful story. We don't just take photographs; we freeze time. Our cinematic approach ensures that when you look back 20 years from now, you'll feel the exact emotion of that very second.
            </p>
            <p className="text-gray-400 font-light text-lg mb-10 leading-relaxed">
              With an obsession for perfect lighting, elegant composition, and raw emotion, we turn ordinary moments into timeless art.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 py-8 border-y border-white/10">
              <div>
                <h4 className="text-4xl text-white font-serif mb-2">500+</h4>
                <span className="text-gold-500 uppercase tracking-widest text-xs">Weddings Captured</span>
              </div>
              <div>
                <h4 className="text-4xl text-white font-serif mb-2">12</h4>
                <span className="text-gold-500 uppercase tracking-widest text-xs">Years Experience</span>
              </div>
              <div>
                <h4 className="text-4xl text-white font-serif mb-2">7</h4>
                <span className="text-gold-500 uppercase tracking-widest text-xs">Awards Won</span>
              </div>
            </div>

            <div className="mt-10">
              <img src="/signature-placeholder.png" alt="Signature" className="h-12 opacity-50 invert" />
              <p className="text-white uppercase tracking-widest text-xs mt-2 font-semibold">Arjun & Riya - Founders</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
