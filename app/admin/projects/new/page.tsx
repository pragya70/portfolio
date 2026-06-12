import { ProjectForm } from '@/components/admin/ProjectForm';
import { PageHeader } from '@/components/admin/PageHeader';

export default function NewProjectPage() {
  return (
    <div className="">
      <PageHeader
        title="New Project"
        subtitle="Add a new project to your portfolio — fill in the details below"
      />
      <ProjectForm />
    </div>
  );
}

