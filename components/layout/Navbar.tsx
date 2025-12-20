
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset

      const active = navLinks.slice().reverse().find(link => {
        if (link.href === '#' || link.href === '/') return scrollPosition < 300; 
        // For contact, checking if we are near bottom or at element
        if (link.href === '#contact') {
            const contact = document.getElementById('contact');
            if (contact && scrollPosition >= contact.offsetTop - 300) return true;
        }
        
        const targetId = link.href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          return scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight;
        }
        return false;
      });

      if (active) {
        setActiveSection(active.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar on Admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Pill Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none">
        <nav className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-full p-1.5 flex items-center shadow-2xl shadow-black/40 pointer-events-auto">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <Link 
                  href={link.href}
                  onClick={() => setActiveSection(link.name)}
                  className={`relative z-10 block px-6 py-2.5 text-[11px] uppercase font-bold tracking-[0.2em] transition-all duration-500 ${
                    activeSection === link.name ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {activeSection === link.name && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-600/10 rounded-full border border-blue-500/20 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navbar (Hamburger) */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden p-4 flex justify-end pointer-events-none">
        <button 
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white p-3.5 rounded-full pointer-events-auto shadow-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-24 right-4 z-50 bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 min-w-[240px] shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => {
                      setActiveSection(link.name);
                      setIsMobileMenuOpen(false);
                  }}
                  className={`px-6 py-4 text-xs uppercase font-bold tracking-[0.2em] rounded-2xl transition-all duration-300 ${
                    activeSection === link.name 
                        ? 'bg-blue-600/10 text-white border border-blue-500/20' 
                        : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
