// ── UPDATE THIS FILE with your real details ──────────────────────────────────

export const personal = {
  name: 'Pragya Raj Nemkul',
  shortName: 'Pragya',
  role: 'Full Stack Developer',
  taglines: [
    'Full Stack Developer.',
    'React Specialist.',
    'UI/UX Enthusiast.',
    'Problem Solver.',
  ],
  bio1:
    "I'm a passionate Full Stack Developer with a strong foundation in building modern, scalable web applications. I bridge the gap between design and engineering, turning complex visions into smooth, interactive realities.",
  bio2:
    'My expertise spans the React ecosystem, modern CSS architectures, and backend development. I obsess over clean code, performance, and exceptional user experiences.',
  email: 'hello@pragyaraj.com.np',
  location: 'Nepal',
  remoteOk: true,
  available: true,
  socials: {
    github: 'https://github.com/pragyarajnemkul',
    linkedin: 'https://linkedin.com/in/pragyarajnemkul',
    twitter: '#',
  },
  stats: [
    { value: 3, label: 'Years Exp.', color: 'text-[#00f3ff]' },
    { value: 20, label: 'Projects', color: 'text-[#7000ff]' },
    { value: 10, label: 'Clients', color: 'text-[#ff00ea]' },
  ],
};

export const skills = [
  { name: 'React.js', icon: 'fab fa-react', color: 'text-[#00f3ff]' },
  { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
  { name: 'TypeScript', icon: 'fas fa-code', color: 'text-blue-400' },
  { name: 'CSS/Tailwind', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
  { name: 'Node.js', icon: 'fab fa-node', color: 'text-green-500' },
  { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-500' },
];

export const skillBars = [
  { name: 'Frontend Development', percent: 90, from: '#00f3ff', to: '#7000ff' },
  { name: 'React / Next.js', percent: 88, from: '#7000ff', to: '#ff00ea' },
  { name: 'UI/UX Design', percent: 80, from: '#ff00ea', to: '#f97316' },
  { name: 'Backend / APIs', percent: 72, from: '#f97316', to: '#facc15' },
];

export const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-featured online store with product management, cart, Stripe payments, and an admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB'],
    tagColors: ['#00f3ff', '#7000ff', '#ff00ea'],
    icon: 'fas fa-shopping-bag',
    gradient: 'from-blue-900 to-gray-900',
    hoverColor: '#00f3ff',
    github: '#',
    demo: '#',
  },
  {
    title: 'Portfolio CMS',
    description:
      'Dynamic portfolio builder with drag-and-drop interface, live preview, and one-click deployment.',
    tags: ['Next.js', 'Tailwind', 'Prisma'],
    tagColors: ['#00f3ff', '#7000ff', '#00ff87'],
    icon: 'fas fa-layer-group',
    gradient: 'from-purple-900 to-black',
    hoverColor: '#7000ff',
    github: '#',
    demo: '#',
  },
  {
    title: 'Real-time Chat App',
    description:
      'Scalable messaging app with rooms, file sharing, and real-time notifications via WebSockets.',
    tags: ['React', 'Socket.io', 'Express'],
    tagColors: ['#00f3ff', '#ff00ea', '#00ff87'],
    icon: 'fas fa-comments',
    gradient: 'from-gray-800 to-gray-900',
    hoverColor: '#ff00ea',
    github: '#',
    demo: '#',
  },
];

export const experience = [
  {
    period: '2022 – Present',
    role: 'Full Stack Developer',
    company: 'Freelance / Remote',
    description:
      'Building and delivering end-to-end web applications for clients across e-commerce, SaaS, and portfolio domains.',
    color: '#00f3ff',
    icon: 'fas fa-laptop-code',
    right: true,
  },
  {
    period: '2021 – 2022',
    role: 'Frontend Developer',
    company: 'Tech Startup, Nepal',
    description:
      'Developed responsive React interfaces, collaborated on design systems, and improved page performance by 40%.',
    color: '#7000ff',
    icon: 'fas fa-code',
    right: false,
  },
  {
    period: '2018 – 2022',
    role: 'B.Sc. CSIT',
    company: 'Tribhuvan University, Nepal',
    description:
      "Bachelor's in Computer Science & Information Technology. Focused on software engineering, databases, and web technologies.",
    color: '#ff00ea',
    icon: 'fas fa-graduation-cap',
    right: true,
  },
];

export const services = [
  {
    title: 'Web Development',
    description:
      'Building responsive, high-performance websites using React, Next.js, and modern web technologies.',
    icon: 'fas fa-laptop-code',
    color: '#00f3ff',
  },
  {
    title: 'Responsive Design',
    description:
      'Creating layouts that adapt perfectly to all screen sizes for a consistent, seamless experience.',
    icon: 'fas fa-mobile-alt',
    color: '#7000ff',
  },
  {
    title: 'Interactive UI/UX',
    description:
      'Implementing smooth animations, micro-interactions, and polished interfaces to delight users.',
    icon: 'fas fa-magic',
    color: '#ff00ea',
  },
];
