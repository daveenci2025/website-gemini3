
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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf8f2]/95 backdrop-blur-md shadow-sm py-4 border-b border-ink/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Motto */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <Logo className="w-12 h-12 text-ink group-hover:text-accent transition-colors duration-500" />
          <div className="flex flex-col justify-center">
              <span className="font-serif text-3xl font-bold tracking-tight text-ink leading-none">DaVeenci</span>
              <span className="text-[0.65rem] tracking-[0.25em] text-accent font-semibold uppercase mt-1.5 ml-0.5">The Art of Automation</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-base font-medium text-ink-muted hover:text-accent transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <Button variant="primary" className="py-2.5 px-6 text-sm shadow-md hover:shadow-lg" onClick={scrollToBooking}>Book a Call</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden p-2 text-ink hover:text-accent transform transition-transform active:scale-95">
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-base border-b border-ink/10 shadow-xl p-8 flex flex-col space-y-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={closeMenu}
              className="text-xl font-serif text-ink hover:text-accent border-b border-ink/5 pb-3 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" className="w-full mt-4 py-4 text-base" onClick={scrollToBooking}>Book a Call</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
