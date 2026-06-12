import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import type { Personal, Project, Skill, Experience, Service, SEO } from '@prisma/client';
import { ThreeBackground } from '@/components/portfolio/ThreeBackground';
import { Navbar } from '@/components/portfolio/Navbar';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { ServicesSection } from '@/components/portfolio/ServicesSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Footer } from '@/components/portfolio/Footer';
import { RevealInit } from '@/components/portfolio/RevealInit';
import { Cursor } from '@/components/portfolio/Cursor';
import { Loader } from '@/components/portfolio/Loader';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const sb = getSupabase();
  const { data: seo } = await sb.from('SEO').select('*').limit(1).maybeSingle();
  const s = seo as SEO | null;
  return {
    title: s?.title ?? 'Portfolio',
    description: s?.description ?? '',
    keywords: s?.keywords ?? '',
    openGraph: s?.ogImage ? { images: [s.ogImage] } : undefined,
  };
}

export default async function PortfolioPage() {
  const sb = getSupabase();

  const [
    { data: personalData },
    { data: projectsData },
    { data: skillsData },
    { data: experienceData },
    { data: servicesData },
  ] = await Promise.all([
    sb.from('Personal').select('*').limit(1).maybeSingle(),
    sb.from('Project').select('*').eq('published', true).order('order'),
    sb.from('Skill').select('*').order('skillType').order('order'),
    sb.from('Experience').select('*').order('order'),
    sb.from('Service').select('*').order('order'),
  ]);

  const personal = personalData as Personal | null;
  const projects = (projectsData ?? []) as Project[];
  const skills = (skillsData ?? []) as Skill[];
  const experience = (experienceData ?? []) as Experience[];
  const services = (servicesData ?? []) as Service[];

  if (!personal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-mono">
        <div className="text-center space-y-4">
          <p className="text-2xl text-[#00f3ff]">Portfolio not configured yet.</p>
          <a href="/admin" className="text-sm underline hover:text-white">Go to Admin →</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Loader />
      <Cursor />
      <ThreeBackground />
      <ScrollProgress />
      <RevealInit />
      <Navbar shortName={personal.shortName} />
      <main className="relative z-10">
        <HeroSection personal={personal} />
        <AboutSection personal={personal} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={experience} />
        <ServicesSection services={services} />
        <ContactSection personal={personal} />
      </main>
      <Footer name={personal.name} />
    </>
  );
}
