import { useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { personal } from '../../data/portfolio';

function Counter({ target, color }) {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        let val = 0;
        const step = () => {
          val = Math.min(val + Math.ceil(target / 40), target);
          el.textContent = val + '+';
          if (val < target) requestAnimationFrame(step);
        };
        step();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <h3 ref={ref} className="text-3xl font-bold" style={{ color }}>0</h3>;
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span style={{ color: '#7000ff' }}>Me</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">{personal.bio1}</p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{personal.bio2}</p>

            <div className="grid grid-cols-3 gap-6">
              {personal.stats.map((stat) => (
                <div key={stat.label} data-hover className="glass p-4 rounded-xl text-center">
                  <Counter target={stat.value} color={stat.color.replace('text-[', '').replace(']', '')} />
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal flex justify-center">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className="w-80">
              <div className="relative h-96 glass rounded-2xl overflow-hidden">
                <div className="absolute inset-0 z-10"
                  style={{ background: 'linear-gradient(to top right, rgba(112,0,255,0.2), rgba(0,243,255,0.2))' }} />
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <i className="fas fa-user-astronaut text-8xl text-white/10" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 z-20"
                  style={{ background: 'linear-gradient(to top, black, transparent)' }}>
                  <h3 className="text-xl font-bold">{personal.name}</h3>
                  <p style={{ color: '#00f3ff' }}>{personal.role}</p>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
