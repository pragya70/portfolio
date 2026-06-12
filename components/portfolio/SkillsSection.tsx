'use client';

type Skill = {
  id: number; name: string; icon: string; color: string;
  skillType: string; percent?: number | null; fromColor?: string | null; toColor?: string | null;
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const icons = skills.filter((s) => s.skillType === 'icon');
  const bars = skills.filter((s) => s.skillType === 'bar');

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div
        className="absolute top-0 left-0 w-full h-px opacity-50"
        style={{ background: 'linear-gradient(to right, transparent, #7000ff, transparent)' }}
      />

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 reveal">
          Technical <span style={{ color: '#00f3ff' }}>Skills</span>
        </h2>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto reveal">
          A comprehensive toolkit for building high-performance web applications.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 reveal">
          {icons.map((skill) => (
            <div
              key={skill.id}
              data-hover
              className="glass p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-transform hover:scale-105 group cursor-pointer"
            >
              <i className={`${skill.icon} text-4xl ${skill.color} group-hover:animate-spin-slow`} />
              <span className="text-sm font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>

        {bars.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto reveal">
            {bars.map((bar) => (
              <div key={bar.id} className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{bar.name}</span>
                  <span style={{ color: bar.fromColor ?? '#00f3ff' }}>{bar.percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${bar.percent}%`,
                      background: `linear-gradient(to right, ${bar.fromColor}, ${bar.toColor})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
