import { personal } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-white/5">
      <p className="text-gray-500 text-sm">
        Designed &amp; Built by{' '}
        <span className="font-semibold" style={{ color: '#00f3ff' }}>{personal.name}</span>{' '}
        with React, Three.js &amp; Tailwind.
        <br />
        <span className="text-xs opacity-60">© {new Date().getFullYear()} All Rights Reserved.</span>
      </p>
    </footer>
  );
}
