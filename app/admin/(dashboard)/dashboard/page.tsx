import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getProjects } from '@/actions/projects';
import { getSkills } from '@/actions/skills';
import { getProfile } from '@/actions/profile';
import { User } from 'lucide-react';

export default async function AdminDashboard() {
  const projects = await getProjects();
  const skills = await getSkills();
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-zinc-700 flex items-center gap-2"
        >
          View Portfolio
          <span className="text-zinc-500">↗</span>
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-zinc-400">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-zinc-400">Total Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{skills.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-4 border-b border-zinc-800 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Owner Profile</CardTitle>
          <User className="text-zinc-500" size={24} />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {profile?.avatarUrl ? (
               <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0">
                  <img src={profile.avatarUrl} alt={profile.name} className="object-cover w-full h-full" />
               </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                <User size={48} className="text-zinc-600" />
              </div>
            )}
            
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-2xl font-bold">{profile?.name || 'No Name Set'}</h2>
                <p className="text-blue-400 font-medium text-lg">{profile?.position || 'No Position Set'}</p>
              </div>
              
              {profile?.headline && (
                <p className="text-zinc-300 italic">&quot;{profile.headline}&quot;</p>
              )}
              
              {profile?.bio && (
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Bio</span>
                  <p className="text-zinc-400 leading-relaxed max-w-2xl">{profile.bio}</p>
                </div>
              )}

              {profile?.resumeUrl && (
                <div className="pt-2">
                   <a href={profile.resumeUrl} target="_blank" className="text-sm text-blue-500 hover:underline">View Resume &rarr;</a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
