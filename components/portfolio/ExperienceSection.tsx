'use client';

type Experience = {
  id: number; period: string; role: string; company: string;
  description: string; color: string; icon: string; isRight: boolean;
};

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-24 px-6 relative" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center reveal">
          Work <span style={{ color: '#00ff87' }}>Experience</span>
        </h2>

        <div className="relative">
          <div className="timeline-line reveal" />

          {experience.map((item, i) => (
            <div
              key={item.id}
              className={`relative flex flex-col ${item.isRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between mb-16 w-full reveal`}
            >
              {/* Spacer */}
              <div className="order-1 md:w-5/12" />

              {/* Icon dot */}
              <div
                className="z-20 flex items-center order-1 w-12 h-12 rounded-full justify-center flex-shrink-0"
                style={{ background: item.color }}
              >
                <i className={`${item.icon} text-black text-sm`} />
              </div>

              {/* Card */}
              <div
                className={`order-1 md:w-5/12 ${item.isRight ? 'text-left pl-8 md:pl-0 md:pr-8' : 'text-right pl-8 md:pl-8 md:pr-0'}`}
              >
                <div
                  data-hover
                  className={`glass p-6 rounded-xl border-l-4 ${!item.isRight ? 'md:border-l-0 md:border-r-4' : ''}`}
                  style={{ borderColor: item.color }}
                >
                  <span className="text-xs font-mono" style={{ color: item.color }}>{item.period}</span>
                  <h3 className="text-xl font-bold mt-2">{item.role}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
