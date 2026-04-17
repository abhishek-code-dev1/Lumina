import React from 'react';
import { Check, Sparkles, IndianRupee } from 'lucide-react';
import { Link } from 'react-scroll';

const plans = [
  {
    name: 'Classic',
    tagline: 'For intimate celebrations',
    price: '75,000',
    perDay: false,
    highlight: false,
    badge: null,
    features: [
      '1-Day Coverage (8 Hours)',
      '1 Lead Photographer',
      '300+ Edited Digital Photos',
      'Online Private Gallery',
      'Pre-Wedding Consultation',
      'Same-Day 10 Social Edits',
    ],
    button: { label: 'Inquire Now', style: 'btn-outline' },
  },
  {
    name: 'Signature',
    tagline: 'Complete wedding experience',
    price: '1,50,000',
    perDay: false,
    highlight: true,
    badge: 'Most Popular',
    features: [
      '2-Day Coverage (Mehndi + Wedding)',
      '2 Photographers + Candid Artist',
      '800+ Edited Digital Photos',
      'Cinematic Highlight Film (5 min)',
      'Premium 12×36 Flush-Mount Album',
      'Drone Aerial Coverage',
      'Same-Day Teaser Reel',
    ],
    button: { label: 'Book Experience', style: 'btn-primary' },
  },
  {
    name: 'Heritage',
    tagline: 'Multi-day destination luxury',
    price: '3,00,000',
    perDay: false,
    highlight: false,
    badge: 'Bespoke',
    features: [
      'Full Wedding Weekend (3–5 Days)',
      'Sangeet · Mehndi · Haldi · Baraat · Pheras',
      '3 Photographers + Cinema Crew',
      '2,000+ Edited Photos',
      'Full Documentary Film (20 min)',
      '3 Handcrafted Leather Albums',
      'Drone + Jib Cinematic Shots',
      'Destination Travel Included',
    ],
    button: { label: 'Get Custom Quote', style: 'btn-outline' },
  },
];

const addOns = [
  { name: 'Pre-Wedding Shoot', price: '25,000', note: 'Location of your choice' },
  { name: 'Extra Album Copy', price: '8,000', note: 'For in-laws / parents' },
  { name: 'LED Wall Slideshow', price: '12,000', note: 'Live at reception' },
  { name: 'Reel Edits Pack (10)', price: '5,000', note: 'Instagram-ready' },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-12 md:py-24 bg-dark-900 border-t border-white/5 relative">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-0 md:px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-[9px] md:text-sm font-semibold mb-2 md:mb-4 block">Investment</span>
          <h2 className="text-xl md:text-5xl font-serif text-white mb-2 md:mb-4">Wedding Collections</h2>
          <p className="text-gray-400 text-[10px] md:text-base font-light max-w-xl mx-auto px-4">
            Transparent pricing for Indian weddings — from intimate ceremonies to grand destination celebrations.
          </p>
        </div>

        {/* Pricing Cards — Horizontal Snap on Mobile */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 pb-8 md:grid md:grid-cols-3 md:gap-8 max-w-6xl mx-auto snap-x snap-mandatory">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`snap-center shrink-0 w-[85vw] md:w-auto relative flex flex-col items-center text-center rounded-sm transition-all duration-500
                ${plan.highlight
                  ? 'bg-dark-800 border-2 border-gold-500 md:-translate-y-4 shadow-[0_0_60px_-15px_rgba(205,170,100,0.15)]'
                  : 'glass-panel'
                } p-6 md:p-10`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] md:text-xs font-bold uppercase tracking-widest py-1 px-3 md:px-4 flex items-center gap-1
                  ${plan.highlight
                    ? 'bg-gold-500 text-dark-900'
                    : 'bg-dark-700 text-gold-400 border border-gold-500/40'
                  }`}
                >
                  {plan.highlight && <Sparkles size={10} />}
                  {plan.badge}
                </div>
              )}

              {/* Title */}
              <h3 className={`text-lg md:text-xl font-serif mb-1 md:mb-2 ${plan.badge ? 'mt-3' : ''} text-white`}>
                {plan.name}
              </h3>
              <p className="text-gray-400 text-[11px] md:text-sm mb-4 md:mb-6">{plan.tagline}</p>

              {/* Price */}
              <div className={`text-3xl md:text-4xl font-light tracking-wider mb-1 pb-2 w-full
                ${plan.highlight ? 'text-gold-400' : 'text-white'}`}
              >
                <span className="text-gold-500 text-base md:text-lg align-top mr-0.5">₹</span>
                {plan.price}
              </div>
              <p className="text-gray-500 text-[9px] md:text-xs mb-5 md:mb-6 pb-4 md:pb-6 border-b border-white/10 w-full">
                {plan.name === 'Heritage' ? 'Starting price · Customisable' : 'Inclusive of all taxes'}
              </p>

              {/* Features */}
              <ul className="text-left w-full space-y-2.5 md:space-y-3 mb-8 flex-1">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300 font-light text-[11px] md:text-sm">
                    <Check size={14} className="text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="contact" smooth={true} duration={800} offset={-80} className="w-full cursor-pointer">
                <button className={`${plan.button.style} w-full py-2.5 md:py-3 text-[10px] md:text-sm`}>
                  {plan.button.label}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* EMI Note */}
        <p className="text-center text-gray-500 text-[9px] md:text-xs mt-2 md:mt-4 px-4">
          <IndianRupee size={10} className="inline -mt-0.5 mr-0.5" />
          Easy EMI options available · No-cost EMI on select banks · UPI / Bank Transfer accepted
        </p>

        {/* ─── Add-On Services ─── */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 px-4">
          <div className="text-center mb-6 md:mb-10">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-[9px] md:text-xs font-semibold mb-2 block">Enhance Your Package</span>
            <h3 className="text-lg md:text-3xl font-serif text-white">Add-On Services</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {addOns.map((addon, i) => (
              <div key={i} className="glass-panel p-4 md:p-6 text-center rounded-sm hover:border-gold-500/40 transition-all duration-300 group">
                <h4 className="text-white text-[11px] md:text-sm font-medium mb-1 group-hover:text-gold-400 transition-colors">{addon.name}</h4>
                <div className="text-gold-400 text-base md:text-xl font-light mb-1">
                  <span className="text-[10px] md:text-sm align-top mr-0.5">₹</span>{addon.price}
                </div>
                <p className="text-gray-500 text-[8px] md:text-xs font-light">{addon.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Per-Service Starting Prices */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16 px-4">
          <div className="text-center mb-6 md:mb-10">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-[9px] md:text-xs font-semibold mb-2 block">Individual Services</span>
            <h3 className="text-lg md:text-3xl font-serif text-white">À La Carte Pricing</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[
              { service: 'Pre-Wedding Shoot', starts: '25,000', includes: '2-3 hrs · 1 location · 100+ edited photos' },
              { service: 'Wedding Photography', starts: '50,000', includes: '1 day · 1 photographer · 300+ photos' },
              { service: 'Cinematic Film', starts: '40,000', includes: 'Highlight reel (3-5 min) · Full ceremony' },
              { service: 'Luxury Album', starts: '8,000', includes: '12×36 flush-mount · 40 pages · leather-bound' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between glass-panel p-4 md:p-5 rounded-sm hover:border-gold-500/30 transition-all duration-300">
                <div className="flex-1">
                  <h4 className="text-white text-xs md:text-sm font-medium mb-0.5">{item.service}</h4>
                  <p className="text-gray-500 text-[9px] md:text-xs font-light">{item.includes}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-wider block">Starts at</span>
                  <span className="text-gold-400 text-sm md:text-lg font-light">
                    <span className="text-[10px] md:text-xs align-top mr-0.5">₹</span>{item.starts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
