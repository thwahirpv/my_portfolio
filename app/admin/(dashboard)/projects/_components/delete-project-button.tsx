'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { deleteProject } from '@/actions/projects';
import { DeleteAlert } from '@/components/admin/DeleteAlert';
import { toast } from 'sonner';

interface DeleteProjectButtonProps {
  id: number;
}

export function DeleteProjectButton({ id }: DeleteProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
      setOpen(false);
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="sm" 
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Trash size={16} />
      </Button>

      <DeleteAlert 
        open={open} 
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </>
  );
}
