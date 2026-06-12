import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: 'Admin', password: hashed, role: 'admin' },
  });

  // Personal info
  await prisma.personal.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Pragya Raj Nemkul',
      shortName: 'Pragya',
      role: 'Full Stack Developer',
      taglines: ['Full Stack Developer.', 'React Specialist.', 'UI/UX Enthusiast.', 'Problem Solver.'],
      bio1: "I'm a passionate Full Stack Developer with a strong foundation in building modern, scalable web applications. I bridge the gap between design and engineering, turning complex visions into smooth, interactive realities.",
      bio2: 'My expertise spans the React ecosystem, modern CSS architectures, and backend development. I obsess over clean code, performance, and exceptional user experiences.',
      email: 'hello@pragyaraj.com.np',
      location: 'Nepal',
      remoteOk: true,
      available: true,
      github: 'https://github.com/pragyarajnemkul',
      linkedin: 'https://linkedin.com/in/pragyarajnemkul',
      twitter: '#',
      statsYears: 3,
      statsProjects: 20,
      statsClients: 10,
    },
  });

  // Skills (icons)
  const iconSkills = [
    { name: 'React.js', icon: 'fab fa-react', color: 'text-[#00f3ff]', skillType: 'icon', order: 0 },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400', skillType: 'icon', order: 1 },
    { name: 'TypeScript', icon: 'fas fa-code', color: 'text-blue-400', skillType: 'icon', order: 2 },
    { name: 'CSS/Tailwind', icon: 'fab fa-css3-alt', color: 'text-blue-500', skillType: 'icon', order: 3 },
    { name: 'Node.js', icon: 'fab fa-node', color: 'text-green-500', skillType: 'icon', order: 4 },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-500', skillType: 'icon', order: 5 },
  ];

  const barSkills = [
    { name: 'Frontend Development', icon: '', color: '', skillType: 'bar', percent: 90, fromColor: '#00f3ff', toColor: '#7000ff', order: 0 },
    { name: 'React / Next.js', icon: '', color: '', skillType: 'bar', percent: 88, fromColor: '#7000ff', toColor: '#ff00ea', order: 1 },
    { name: 'UI/UX Design', icon: '', color: '', skillType: 'bar', percent: 80, fromColor: '#ff00ea', toColor: '#f97316', order: 2 },
    { name: 'Backend / APIs', icon: '', color: '', skillType: 'bar', percent: 72, fromColor: '#f97316', toColor: '#facc15', order: 3 },
  ];

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: [...iconSkills, ...barSkills] });

  // Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-featured online store with product management, cart, Stripe payments, and an admin dashboard.',
        tags: ['React', 'Node.js', 'MongoDB'],
        tagColors: ['#00f3ff', '#7000ff', '#ff00ea'],
        icon: 'fas fa-shopping-bag',
        gradient: 'from-blue-900 to-gray-900',
        hoverColor: '#00f3ff',
        github: '#',
        demo: '#',
        order: 0,
        published: true,
      },
      {
        title: 'Portfolio CMS',
        description: 'Dynamic portfolio builder with drag-and-drop interface, live preview, and one-click deployment.',
        tags: ['Next.js', 'Tailwind', 'Prisma'],
        tagColors: ['#00f3ff', '#7000ff', '#00ff87'],
        icon: 'fas fa-layer-group',
        gradient: 'from-purple-900 to-black',
        hoverColor: '#7000ff',
        github: '#',
        demo: '#',
        order: 1,
        published: true,
      },
      {
        title: 'Real-time Chat App',
        description: 'Scalable messaging app with rooms, file sharing, and real-time notifications via WebSockets.',
        tags: ['React', 'Socket.io', 'Express'],
        tagColors: ['#00f3ff', '#ff00ea', '#00ff87'],
        icon: 'fas fa-comments',
        gradient: 'from-gray-800 to-gray-900',
        hoverColor: '#ff00ea',
        github: '#',
        demo: '#',
        order: 2,
        published: true,
      },
    ],
  });

  // Experience
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        period: '2022 – Present',
        role: 'Full Stack Developer',
        company: 'Freelance / Remote',
        description: 'Building and delivering end-to-end web applications for clients across e-commerce, SaaS, and portfolio domains.',
        color: '#00f3ff',
        icon: 'fas fa-laptop-code',
        isRight: true,
        order: 0,
      },
      {
        period: '2021 – 2022',
        role: 'Frontend Developer',
        company: 'Tech Startup, Nepal',
        description: 'Developed responsive React interfaces, collaborated on design systems, and improved page performance by 40%.',
        color: '#7000ff',
        icon: 'fas fa-code',
        isRight: false,
        order: 1,
      },
      {
        period: '2018 – 2022',
        role: 'B.Sc. CSIT',
        company: 'Tribhuvan University, Nepal',
        description: "Bachelor's in Computer Science & Information Technology. Focused on software engineering, databases, and web technologies.",
        color: '#ff00ea',
        icon: 'fas fa-graduation-cap',
        isRight: true,
        order: 2,
      },
    ],
  });

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        title: 'Web Development',
        description: 'Building responsive, high-performance websites using React, Next.js, and modern web technologies.',
        icon: 'fas fa-laptop-code',
        color: '#00f3ff',
        order: 0,
      },
      {
        title: 'Responsive Design',
        description: 'Creating layouts that adapt perfectly to all screen sizes for a consistent, seamless experience.',
        icon: 'fas fa-mobile-alt',
        color: '#7000ff',
        order: 1,
      },
      {
        title: 'Interactive UI/UX',
        description: 'Implementing smooth animations, micro-interactions, and polished interfaces to delight users.',
        icon: 'fas fa-magic',
        color: '#ff00ea',
        order: 2,
      },
    ],
  });

  // SEO
  await prisma.sEO.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Pragya Raj Nemkul | Full Stack Developer',
      description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies. Based in Nepal, available for remote work.',
      keywords: 'full stack developer, react, nextjs, nepal, web development, typescript',
      ogImage: '',
      twitterHandle: '',
    },
  });

  console.log('✅ Database seeded successfully');
  console.log(`📧 Admin email: ${adminEmail}`);
  console.log(`🔑 Admin password: ${adminPassword}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
