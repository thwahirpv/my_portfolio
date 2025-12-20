'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/actions/profile';
import { uploadFile } from '@/actions/upload';
import { Loader2, Save } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProfileFormProps {
  initialData: {
    id: number;
    name: string;
    headline: string | null;
    bio: string | null;
    position: string | null;
    avatarUrl: string | null;
    resumeUrl: string | null;
  } | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatarUrl || null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const avatarFile = formData.get('avatar') as File;
      if (avatarFile && avatarFile.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);
        
        const uploadRes = await uploadFile(uploadFormData);
        if (uploadRes.success && uploadRes.url) {
            formData.set('avatarUrl', uploadRes.url);
        } else {
             console.error("Upload error:", uploadRes.error);
             toast.error('Image upload failed: ' + uploadRes.error);
             setLoading(false);
             return;
        }
      } else if (initialData?.avatarUrl) {
        formData.set('avatarUrl', initialData.avatarUrl);
      }

      const res = await updateProfile(formData);
      if (res.success) {
        toast.success('Profile updated successfully!');
        router.refresh();
        router.push('/admin/dashboard');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={initialData?.name || ''} 
                required 
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Current Position (Job Title)</Label>
              <Input 
                id="position" 
                name="position" 
                defaultValue={initialData?.position || ''} 
                placeholder="e.g. Senior Full Stack Developer"
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline (Short Tagline)</Label>
              <Input 
                id="headline" 
                name="headline" 
                defaultValue={initialData?.headline || ''} 
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (About Section)</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                defaultValue={initialData?.bio || ''} 
                className="bg-black border-zinc-800 min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Media & Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Avatar Image</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-zinc-700 bg-black">
                  {avatarPreview ? (
                    <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-500">No Img</div>
                  )}
                </div>
                <div className="flex-1">
                  <Input 
                    type="file" 
                    name="avatar" 
                    accept="image/*" 
                    onChange={handleAvatarChange}
                    className="cursor-pointer bg-black border-zinc-800 file:text-white"
                  />
                  <p className="text-xs text-zinc-500 mt-2">Recommended: Square JPG/PNG</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL (Google Drive / PDF Link)</Label>
              <Input 
                id="resumeUrl" 
                name="resumeUrl" 
                defaultValue={initialData?.resumeUrl || ''} 
                placeholder="https://..."
                className="bg-black border-zinc-800"
              />
            </div>
            
            <Button disabled={loading} type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 size-4" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
