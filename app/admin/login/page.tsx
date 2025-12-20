'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { authenticate } from '@/actions/auth-action';

export default function AdminLogin() {
  const [error, setError] = useState('');

  // We need to wrap the action to handle client-side state
  async function handleLogin(formData: FormData) {
      setError('');
      try {
        const result = await authenticate(formData);
        if (result) {
            setError(result);
        }
      } catch (e) {
         if ((e as Error).message === 'NEXT_REDIRECT') {
             throw e;
         }
         // Other errors are silent or handled by result above
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800 text-white shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Enter admin email"
                required 
                className="bg-zinc-900/50 border-zinc-800 text-white focus:border-blue-600 focus:ring-blue-600/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter admin password"
                required 
                className="bg-zinc-900/50 border-zinc-800 text-white focus:border-blue-600 focus:ring-blue-600/20"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
            >
              Unlock Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
