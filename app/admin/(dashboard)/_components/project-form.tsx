
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { uploadFile } from '@/actions/upload';
import { createProject, updateProject } from '@/actions/projects';
import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/db/schema';

type Project = InferSelectModel<typeof projects>;

interface ProjectFormProps {
  initialData?: Project | null; 
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = initialData?.imageUrl || '';
      let imageUrl2 = initialData?.imageUrl2 || '';
      let imageUrl3 = initialData?.imageUrl3 || '';

      // Upload Image 1 (Required for new)
      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const uploadRes = await uploadFile(uploadData);
        if (uploadRes.success && uploadRes.url) imageUrl = uploadRes.url;
        else throw new Error('Image 1 upload failed');
      }

      // Upload Image 2 (Optional)
      if (file2) {
        const uploadData = new FormData();
        uploadData.append('file', file2);
        const uploadRes = await uploadFile(uploadData);
        if (uploadRes.success && uploadRes.url) imageUrl2 = uploadRes.url;
        else throw new Error('Image 2 upload failed');
      }

      // Upload Image 3 (Optional)
      if (file3) {
        const uploadData = new FormData();
        uploadData.append('file', file3);
        const uploadRes = await uploadFile(uploadData);
        if (uploadRes.success && uploadRes.url) imageUrl3 = uploadRes.url;
        else throw new Error('Image 3 upload failed');
      }

      if (isEditing && initialData) {
        await updateProject(initialData.id, formData, imageUrl, imageUrl2, imageUrl3);
      } else {
        if (!file && !imageUrl) {
          alert('Please upload the main cover image');
          setLoading(false);
          return;
        }
        await createProject(formData, imageUrl, imageUrl2, imageUrl3);
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Something went wrong or upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input 
              id="title" 
              name="title" 
              defaultValue={initialData?.title ?? ''} 
              required 
              className="bg-zinc-800 border-zinc-700" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              defaultValue={initialData?.description ?? ''} 
              className="bg-zinc-800 border-zinc-700" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveDemoUrl">Live Demo URL (User Side)</Label>
              <Input 
                id="liveDemoUrl" 
                name="liveDemoUrl" 
                defaultValue={initialData?.liveDemoUrl ?? ''} 
                className="bg-zinc-800 border-zinc-700" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminDemoUrl">Live Demo URL (Admin Side - Optional)</Label>
              <Input 
                id="adminDemoUrl" 
                name="adminDemoUrl" 
                defaultValue={initialData?.adminDemoUrl ?? ''} 
                className="bg-zinc-800 border-zinc-700" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl">Frontend / Main Repo URL</Label>
              <Input 
                id="repoUrl" 
                name="repoUrl" 
                defaultValue={initialData?.repoUrl ?? ''} 
                className="bg-zinc-800 border-zinc-700" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backendRepoUrl">Backend Repo URL (Optional)</Label>
              <Input 
                id="backendRepoUrl" 
                name="backendRepoUrl" 
                defaultValue={initialData?.backendRepoUrl ?? ''} 
                className="bg-zinc-800 border-zinc-700" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStackTags">Tech Stack (comma separated)</Label>
            <Input 
              id="techStackTags" 
              name="techStackTags" 
              defaultValue={initialData?.techStackTags?.join(', ') ?? ''} 
              placeholder="React, Node.js, TypeScript"
              className="bg-zinc-800 border-zinc-700" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
                <Label htmlFor="image">Cover Image (Required)</Label>
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-zinc-800 border-zinc-700 cursor-pointer" 
                />
                {initialData?.imageUrl && (
                  <p className="text-xs text-zinc-500 truncate">Current: {initialData.imageUrl.split('/').pop()}</p>
                )}
             </div>

             <div className="space-y-2">
                <Label htmlFor="image2">Image 2 (Optional)</Label>
                <Input 
                  id="image2" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile2(e.target.files?.[0] || null)}
                  className="bg-zinc-800 border-zinc-700 cursor-pointer" 
                />
                {initialData?.imageUrl2 && (
                  <p className="text-xs text-zinc-500 truncate">Current: {initialData.imageUrl2.split('/').pop()}</p>
                )}
             </div>

             <div className="space-y-2">
                <Label htmlFor="image3">Image 3 (Optional)</Label>
                <Input 
                  id="image3" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile3(e.target.files?.[0] || null)}
                  className="bg-zinc-800 border-zinc-700 cursor-pointer" 
                />
                {initialData?.imageUrl3 && (
                  <p className="text-xs text-zinc-500 truncate">Current: {initialData.imageUrl3.split('/').pop()}</p>
                )}
             </div>
          </div>

            <Button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 w-full cursor-pointer">
              {loading ? <span className="animate-spin mr-2">⠋</span> : (isEditing ? 'Update Project' : 'Create Project')}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
