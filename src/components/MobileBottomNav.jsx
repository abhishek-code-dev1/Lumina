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

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.to);
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
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
        background: 'rgba(8,8,8,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        /* safe area for iPhone home indicator */
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Compact h-14 = 56px — same as Flipkart/Amazon bottom tab */}
      <div className="flex items-stretch w-full" style={{ height: '52px' }}>
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = active === to;
          return (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={450}
              offset={-56}
              spy={true}
              onSetActive={() => setActive(to)}
              onClick={() => setActive(to)}
              className="flex flex-col items-center justify-center flex-1 cursor-pointer relative select-none"
              style={{ WebkitTapHighlightColor: 'transparent', minWidth: 0 }}
            >
              {/* Active top pill */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-b-full"
                  style={{
                    width: '28px',
                    background: 'linear-gradient(90deg,#B08D5B,#D4A96A)',
                  }}
                />
              )}

              {/* Icon — 18px like Flipkart */}
              <span
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: '32px',
                  height: '28px',
                  background: isActive ? 'rgba(176,141,91,0.13)' : 'transparent',
                  marginBottom: '2px',
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  style={{ color: isActive ? '#D4A96A' : '#9CA3AF' }}
                />
              </span>

              {/* Label — 8px ultra-compact */}
              <span
                style={{
                  fontSize: '8px',
                  lineHeight: 1,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? '#D4A96A' : '#6B7280',
                  fontWeight: isActive ? 600 : 400,
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
