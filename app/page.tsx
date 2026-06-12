import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
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

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await supabase.from('SEO').select('*').limit(1).single();
  return {
    title: seo?.title ?? 'Portfolio',
    description: seo?.description ?? '',
    keywords: seo?.keywords ?? '',
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export default async function PortfolioPage() {
  const [personal, projects, skills, experience, services] = await Promise.all([
    supabase.from('Personal').select('*').limit(1).single(),
    supabase.from('Project').select('*').eq('published', true).order('order'),
    supabase.from('Skill').select('*').order('skillType').order('order'),
    supabase.from('Experience').select('*').order('order'),
    supabase.from('Service').select('*').order('order'),
  ]);

  if (!personal.data) {
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
      <Navbar shortName={personal.data.shortName} />
      <main className="relative z-10">
        <HeroSection personal={personal.data} />
        <AboutSection personal={personal.data} />
        <SkillsSection skills={skills.data ?? []} />
        <ProjectsSection projects={projects.data ?? []} />
        <ExperienceSection experience={experience.data ?? []} />
        <ServicesSection services={services.data ?? []} />
        <ContactSection personal={personal.data} />
      </main>
      <Footer name={personal.data.name} />
    </>
  );
}
