'use client';

type Service = { id: number; title: string; description: string; icon: string; color: string };

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-px opacity-50"
        style={{ background: 'linear-gradient(to right, transparent, #00f3ff, transparent)' }}
      />

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 reveal">
          What I <span style={{ color: '#00f3ff' }}>Do</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {services.map((service) => (
            <div
              key={service.id}
              data-hover
              className="glass p-8 rounded-2xl group transition-all"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = service.color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-all"
                style={{ background: `${service.color}1a` }}
              >
                <i className={`${service.icon} text-2xl`} style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
