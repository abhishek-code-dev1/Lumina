import React from 'react';
import { Camera, Video, BookHeart, Aperture } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Pre-Wedding',
    description: 'Cinematic storytelling before the big day.',
    icon: <Camera size={24} className="text-gold-500 mb-2 md:mb-6 md:w-8 md:h-8" />,
    image: '/iiim/prewedding/pexels-hasmukh-abchung-413074376-32495434.jpg',
    price: '₹25,000'
  },
  {
    id: 2,
    title: 'Wedding',
    description: 'Documentary style coverage preserving every emotion.',
    icon: <Aperture size={24} className="text-gold-500 mb-2 md:mb-6 md:w-8 md:h-8" />,
    image: '/iiim/pexels-fotographiya-wedding-photography-823737813-30184703.jpg',
    price: '₹50,000'
  },
  {
    id: 3,
    title: 'Cinematic',
    description: 'High-end 4K video for your luxury movie.',
    icon: <Video size={24} className="text-gold-500 mb-2 md:mb-6 md:w-8 md:h-8" />,
    image: '/iiim/pexels-darshandave-16846853.jpg',
    price: '₹40,000'
  },
  {
    id: 4,
    title: 'Albums',
    description: 'Handcrafted luxury leather albums imported from Italy.',
    icon: <BookHeart size={24} className="text-gold-500 mb-2 md:mb-6 md:w-8 md:h-8" />,
    image: '/iiim/pexels-darkmodecinema-30394998.jpg',
    price: '₹8,000'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-24 bg-dark-800 relative">
      <div className="container mx-auto px-2 md:px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-16 gap-2 md:gap-6 px-2">
          <div className="max-w-2xl">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-[9px] md:text-sm font-semibold mb-2 md:mb-4 block">Expertise</span>
            <h2 className="text-xl md:text-5xl font-serif text-white">Curating The Art of Romance</h2>
          </div>
        </div>

        {/* E-commerce Style Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 md:grid md:grid-cols-4 md:gap-6 px-2 pb-4 snap-x snap-mandatory">
          {services.map((service) => (
            <div key={service.id} className="snap-center shrink-0 w-[60vw] md:w-auto group relative overflow-hidden bg-dark-900 border border-white/5 rounded-sm">
              <div className="h-36 md:h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-dark-900/40 z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-8 relative z-20 bg-dark-900">
                {service.icon}
                <h3 className="text-white text-sm md:text-xl font-serif mb-2">{service.title}</h3>
                <p className="text-gray-400 text-[10px] md:text-sm font-light leading-relaxed mb-3 line-clamp-2 md:line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-gray-500 text-[8px] md:text-[10px] uppercase tracking-wider">Starts at</span>
                  <span className="text-gold-400 text-sm md:text-lg font-light">{service.price}</span>
                </div>
                <span className="text-gold-400 text-[9px] md:text-xs tracking-widest uppercase flex items-center">
                  Learn More <span className="ml-1 md:ml-2">&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
