
'use client';

import { useState } from 'react';
import { createSkill, deleteSkill } from '@/actions/skills';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash, Plus } from 'lucide-react';

import { uploadFile } from '@/actions/upload';
import Image from 'next/image';
import { toast } from 'sonner';

// I need to make sure Select component is installed. 
// If not, I'll use a native select fallback or run the install command.
// I'll assume I need to install `select` component.

interface Skill {
  id: number;
  name: string;
  position: number;
  iconUrl: string | null;
}

import { DeleteAlert } from '@/components/admin/DeleteAlert';

// ... (keep unused imports if needed or clean them up, but focusing on DeleteAlert integration)

export default function SkillManager({ initialSkills }: { initialSkills: Skill[] }) {
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    // ... existing logic
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;

    if (!name || !position) {
      toast.error('Name and Position are required');
      setLoading(false);
      return;
    }

    const file = formData.get('icon') as File;
    
    let iconUrl = '';

    try {
      if (file && file.size > 0) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const res = await uploadFile(uploadData);
        if (res.success && res.url) {
          iconUrl = res.url;
        }
      }

      await createSkill(formData, iconUrl);
      toast.success('Skill added successfully');
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error('Failed to add skill');
    } finally {
        setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    
    setIsDeleting(true);
    try {
        await deleteSkill(deleteId);
        toast.success('Skill deleted successfully');
        setDeleteId(null);
    } catch {
        toast.error('Failed to delete skill');
    } finally {
        setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <DeleteAlert 
        open={deleteId !== null} 
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Skill"
        description="Are you sure you want to delete this skill? This action cannot be undone."
      />

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
        {/* ... existing form ... */}
        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
        <form onSubmit={handleAddSkill} className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
             <label className="text-sm mb-1 block">Name</label>
             <Input name="name" required className="bg-zinc-800 border-zinc-700" placeholder="React" />
          </div>
          
          <div className="w-[150px]">
            <label className="text-sm mb-1 block">Position</label>
            <Input 
                type="number" 
                name="position" 
                required
                placeholder="0" 
                className="bg-zinc-800 border-zinc-700" 
                defaultValue={0} 
            />
          </div>

          <div className="flex-1 min-w-[200px]">
             <label className="text-sm mb-1 block">Icon (Optional)</label>
             <Input type="file" name="icon" className="bg-zinc-800 border-zinc-700 cursor-pointer" />
          </div>

          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
            {loading ? <span className="animate-spin mr-2">⠋</span> : <Plus size={18} className="mr-1" />}
            Add
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialSkills.map(skill => (
          <Card key={skill.id} className="bg-zinc-900 border-zinc-800 text-white flex items-center p-4 justify-between">
            <div className="flex items-center gap-3">
              {skill.iconUrl && (
                <div className="relative w-8 h-8 rounded bg-zinc-800 p-1">
                  <Image src={skill.iconUrl} alt={skill.name} fill className="object-contain p-1" />
                </div>
              )}
              <div>
                <div className="font-bold">{skill.name}</div>
                <div className="text-xs text-zinc-500 uppercase">Pos: {skill.position}</div>
              </div>
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setDeleteId(skill.id)}
                className="text-red-500 hover:text-red-400 hover:bg-zinc-800 cursor-pointer"
            >
              <Trash size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
