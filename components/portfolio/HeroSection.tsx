'use client';

import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

type Personal = {
  name: string; shortName: string; role: string; taglines: string[];
  bio1: string; available: boolean; github?: string | null;
  linkedin?: string | null; twitter?: string | null;
};

function useTypewriter(texts: string[]) {
  const [charIdx, setCharIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;
    const current = texts[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => setCharIdx((c) => c + 1), 100);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((c) => c - 1), 60);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, texts]);

  return texts.length ? texts[wordIdx].slice(0, charIdx) : '';
}

export function HeroSection({ personal }: { personal: Personal }) {
  const typed = useTypewriter(personal.taglines || []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(112,0,255,0.15) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="space-y-6">
          {personal.available && (
            <div
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass text-xs font-mono"
              style={{ color: '#00ff87', border: '1px solid rgba(0,255,135,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff87' }} />
              <span>Available for projects</span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I&apos;m{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #00f3ff, #7000ff)' }}
            >
              {personal.shortName}
            </span>
            <br />
            <span className="text-white">{typed}</span>
            <span className="animate-blink" style={{ color: '#00f3ff' }}>|</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">{personal.bio1}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              data-hover
              className="group relative px-8 py-3 rounded-full overflow-hidden transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,243,255,0.5)' }}
            >
              <span className="relative font-bold" style={{ color: '#00f3ff' }}>View Projects</span>
            </a>
            <a
              href="#contact"
              data-hover
              className="px-8 py-3 rounded-full glass glass-hover transition-all font-bold"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center space-x-6 pt-6 text-gray-500">
            {personal.github && personal.github !== '#' && (
              <a href={personal.github} data-hover target="_blank" rel="noreferrer"
                className="text-xl hover:text-[#00f3ff] transition-colors">
                <i className="fab fa-github" />
              </a>
            )}
            {personal.linkedin && personal.linkedin !== '#' && (
              <a href={personal.linkedin} data-hover target="_blank" rel="noreferrer"
                className="text-xl hover:text-[#7000ff] transition-colors">
                <i className="fab fa-linkedin" />
              </a>
            )}
            {personal.twitter && personal.twitter !== '#' && (
              <a href={personal.twitter} data-hover
                className="text-xl hover:text-[#ff00ea] transition-colors">
                <i className="fab fa-twitter" />
              </a>
            )}
          </div>
        </div>

        {/* Right — code card */}
        <div className="hidden lg:flex justify-center relative">
          <div
            className="w-96 h-96 rounded-full absolute animate-pulse"
            style={{ background: 'linear-gradient(to right, #00f3ff, #7000ff)', opacity: 0.2, filter: 'blur(60px)' }}
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable glareMaxOpacity={0.4} scale={1.02} className="w-80">
              <div className="glass rounded-xl p-4 border-l-2 animate-float" style={{ borderColor: '#00f3ff' }}>
                <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 ml-2">Portfolio.jsx</span>
                </div>
                <pre className="text-sm font-mono text-gray-300 leading-relaxed">
<span style={{ color: '#7000ff' }}>import</span>
{' '}
<span style={{ color: '#00f3ff' }}>{'{ useState }'}</span>
{' '}
<span style={{ color: '#7000ff' }}>from</span>
{' '}
<span style={{ color: '#00ff87' }}>&apos;react&apos;</span>
{`\n\n`}
<span style={{ color: '#7000ff' }}>const</span>
{' Portfolio = () => {\n  '}
<span style={{ color: '#7000ff' }}>const</span>
{' [ready] =\n    '}
<span style={{ color: '#00f3ff' }}>useState</span>
{`(true);\n\n  `}
<span style={{ color: '#7000ff' }}>return</span>
{` ready &&\n    <`}
<span style={{ color: '#00f3ff' }}>Portfolio</span>
{` />;\n}`}
                </pre>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
