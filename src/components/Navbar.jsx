import { useState, useEffect } from 'react';
import { personal } from '../data/portfolio';

const NAV_LINKS = [
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 glass ${scrolled ? 'border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" data-hover className="text-2xl font-bold font-mono">
            <span style={{ color: '#00f3ff' }}>&lt;</span>
            {personal.shortName.toUpperCase()}
            <span style={{ color: '#7000ff' }}>.DEV</span>
            <span style={{ color: '#00f3ff' }}>/&gt;</span>
          </a>

          <div className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} data-hover
                className="text-sm font-semibold tracking-wider text-gray-300 hover:text-[#00f3ff] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" data-hover
              className="px-4 py-2 border border-[#00f3ff] rounded-full text-sm font-semibold hover:bg-[#00f3ff] hover:text-black transition-all">
              LET'S TALK
            </a>
          </div>

          <button data-hover className="md:hidden text-xl" style={{ color: '#00f3ff' }} onClick={() => setOpen(true)}>
            <i className="fas fa-bars" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-30 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}
            className="text-2xl font-bold hover:text-[#00f3ff] transition-colors">{l.label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}
          className="text-2xl font-bold hover:text-[#00ff87] transition-colors">CONTACT</a>
        <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setOpen(false)}>
          <i className="fas fa-times" />
        </button>
      </div>
    </>
  );
}
