import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo, Button, NavLink } from './Shared';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Where Teams Get Stuck", href: "#problems" },
    { label: "What We Automate", href: "#automation" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Briefings", href: "#newsletter" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf8f2]/95 backdrop-blur-md shadow-sm py-3 border-b border-ink/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Motto */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <Logo className="w-10 h-10 text-ink group-hover:text-accent transition-colors duration-500" />
          <div className="flex flex-col justify-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-ink leading-none">DaVeenci</span>
              <span className="text-[0.55rem] tracking-[0.2em] text-accent font-semibold uppercase mt-1">The Art of Automation</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-ink-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" className="!py-2 !px-4 !text-xs" onClick={scrollToBooking}>Book a Call</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden p-2 text-ink hover:text-accent">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-base border-b border-ink/10 shadow-xl p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={closeMenu}
              className="text-lg font-serif text-ink hover:text-accent border-b border-ink/5 pb-2"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" className="w-full mt-4" onClick={scrollToBooking}>Book a Call</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
