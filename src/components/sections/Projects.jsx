import { projects } from '../../data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span style={{ color: '#ff00ea' }}>Projects</span>
            </h2>
            <p className="text-gray-400 max-w-xl">A selection of my recent work across various domains.</p>
          </div>
          <a href="#" data-hover className="mt-4 md:mt-0 font-semibold hover:underline flex items-center transition-colors"
            style={{ color: '#00f3ff' }}>
            View All Work <i className="fas fa-arrow-right ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={project.title} data-hover
              className={`group glass rounded-2xl overflow-hidden transition-all hover:-translate-y-2 reveal`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 transition-opacity group-hover:opacity-0"
                  style={{ background: `${project.hoverColor}1a` }} />
                <i className={`${project.icon} text-6xl text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-500`} />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, j) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded"
                      style={{ color: project.tagColors[j], background: `${project.tagColors[j]}1a` }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors group-hover:opacity-90"
                  style={{ '--hover-color': project.hoverColor }}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <a href={project.github} data-hover className="text-sm text-white hover:text-[#00f3ff] transition-colors">
                    <i className="fab fa-github mr-1" /> Code
                  </a>
                  <a href={project.demo} data-hover className="text-sm text-white hover:text-[#00f3ff] transition-colors">
                    <i className="fas fa-external-link-alt mr-1" /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
