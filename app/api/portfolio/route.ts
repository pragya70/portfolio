import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [personal, projects, skills, experience, services, seo] = await Promise.all([
    supabase.from('Personal').select('*').limit(1).single(),
    supabase.from('Project').select('*').eq('published', true).order('order'),
    supabase.from('Skill').select('*').order('skillType').order('order'),
    supabase.from('Experience').select('*').order('order'),
    supabase.from('Service').select('*').order('order'),
    supabase.from('SEO').select('*').limit(1).single(),
  ]);

  return NextResponse.json({
    personal: personal.data,
    projects: projects.data,
    skills: skills.data,
    experience: experience.data,
    services: services.data,
    seo: seo.data,
  });
}
