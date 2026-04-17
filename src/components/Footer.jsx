import React from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-dark-900 pt-20 pb-20 md:pb-0 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="text-2xl tracking-[0.2em] font-serif text-white mb-6">
              LUMINA<span className="text-gold-500">.</span>
            </div>
            <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">
              Based in San Francisco, capturing luxury weddings and cinematic love stories worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Portfolio', 'Services', 'About', 'Pricing', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={link.toLowerCase()} 
                    smooth={true} 
                    duration={800} 
                    offset={-80}
                    className="text-gray-400 hover:text-gold-500 text-sm font-light uppercase tracking-widest cursor-pointer transition-colors block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6 text-lg">Categories</h4>
            <ul className="space-y-4">
              {['Wedding Photography', 'Pre-Wedding Shoots', 'Cinematic Films', 'Elopements', 'Destination Weddings'].map((item, i) => (
                <li key={i} className="text-gray-400 hover:text-gold-500 text-sm font-light cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6 text-lg">Newsletter</h4>
            <p className="text-gray-400 font-light text-sm mb-4">Subscribe for inspiration and exclusive offers.</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-600"
              />
              <button className="text-gold-500 text-xs uppercase tracking-widest font-semibold hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-gray-500 text-xs font-light">
            &copy; {new Date().getFullYear()} Lumina Studio. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-xs font-light">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
