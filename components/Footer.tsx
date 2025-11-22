import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './Shared';

const Footer: React.FC = () => (
  <footer className="bg-ink text-base py-12 border-t border-white/10">
     <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
           <Logo className="w-6 h-6" />
           <span className="font-serif text-lg font-bold">DaVeenci</span>
        </div>
        
        <div className="flex flex-col items-center gap-3">
           <div className="flex gap-6 text-sm font-medium text-base/70">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Admin Panel</a>
           </div>
           <div className="text-xs text-base/40">
              © {new Date().getFullYear()} DaVeenci Consulting. All rights reserved.
           </div>
        </div>

        <div className="flex gap-6 items-center">
           <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
           </a>
           <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
           </a>
           <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
           </a>
           <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="X">
              <Twitter className="w-5 h-5" />
           </a>
        </div>
     </div>
  </footer>
);

export default Footer;
