import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { PageHeader } from '@/components/admin/PageHeader';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === 'new') return null;

  const { data: project } = await supabase.from('Project').select('*').eq('id', Number(id)).single();
  if (!project) notFound();

  return (
    <div>
      <PageHeader
        title="Edit Project"
        subtitle={`Editing "${project.title}" — changes go live immediately after saving`}
      />
      <ProjectForm initialData={{
        ...project,
        tags: (project.tags as string[]).join(', '),
        tagColors: (project.tagColors as string[]).join(', '),
        github: project.github ?? '',
        demo: project.demo ?? '',
        image: project.image ?? '',
      }} />
    </div>
  );
}
