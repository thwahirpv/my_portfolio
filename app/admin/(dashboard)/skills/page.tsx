
import { getSkills } from '@/actions/skills';
import SkillManager from './_components/skill-manager';

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills</h1>
      {/* 
        This is a server component fetching data and passing it to a client component
        So "skills" is plain JSON serializable data which is good.
      */}
      <SkillManager initialSkills={skills} />
    </div>
  );
}
