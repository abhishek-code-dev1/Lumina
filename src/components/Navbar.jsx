import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Portfolio', to: 'portfolio' },
    { name: 'Pre-Wedding', to: 'prewedding' },
    { name: 'Services', to: 'services' },
    { name: 'About', to: 'about' },
    { name: 'Pricing', to: 'pricing' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-900/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <div className="text-2xl tracking-[0.2em] font-serif text-white">
          LUMINA<span className="text-gold-500">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={800}
              offset={-80}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold-500 transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <Link to="contact" smooth={true} duration={800} offset={-80}>
            <button className="px-6 py-2 border border-gold-500 text-gold-500 text-sm tracking-widest uppercase hover:bg-gold-500 hover:text-dark-900 transition-all duration-300">
              Book Now
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-900 border-b border-white/10 flex flex-col items-center py-8 space-y-6 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={800}
              offset={-80}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest text-gray-300 hover:text-gold-500 transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
