import React, { useState, useEffect } from 'react';
import { Home, Image, Briefcase, Star, Phone } from 'lucide-react';
import { Link } from 'react-scroll';

const navItems = [
  { to: 'home',      icon: Home,      label: 'Home'     },
  { to: 'portfolio', icon: Image,     label: 'Gallery'  },
  { to: 'services',  icon: Briefcase, label: 'Services' },
  { to: 'pricing',   icon: Star,      label: 'Pricing'  },
  { to: 'contact',   icon: Phone,     label: 'Book'     },
];

const MobileBottomNav = () => {
  const [active, setActive] = useState('home');

  // Update active section on scroll via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.to);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-stretch w-full h-16">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = active === to;
          return (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={500}
              offset={-60}
              spy={true}
              onSetActive={() => setActive(to)}
              onClick={() => setActive(to)}
              className="flex flex-col items-center justify-center flex-1 cursor-pointer group relative select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Active indicator pill */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-b-full transition-all duration-300"
                style={{
                  width: isActive ? '32px' : '0px',
                  background: 'linear-gradient(90deg, #B08D5B, #D4A96A)',
                  opacity: isActive ? 1 : 0,
                }}
              />

              {/* Icon container */}
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(176,141,91,0.15)' : 'transparent',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{
                    color: isActive ? '#D4A96A' : '#9CA3AF',
                    transition: 'color 0.25s, stroke-width 0.25s',
                  }}
                />
              </span>

              {/* Label */}
              <span
                className="text-[9px] uppercase tracking-widest leading-none transition-colors duration-250 mt-0.5"
                style={{
                  color: isActive ? '#D4A96A' : '#6B7280',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
