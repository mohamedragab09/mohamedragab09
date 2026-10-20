import { PageHeader } from '../ui/section-images';
import Projects from '../ui/projects';
import { getProjects } from '@/lib/services/projects';

export default async function Works() {
  const projects = await getProjects();

  return (
    <section
      id="works"
      className="w-full overflow-x-clip px-4 py-12 text-background sm:px-6 md:py-16 lg:px-8"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8">
        <PageHeader title="Projects" description="A selection of things I&#39;ve built" />

        <Projects projects={ projects }/>
      </div>
    </section>
  );
}