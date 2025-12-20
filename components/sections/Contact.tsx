'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitMessage } from '@/actions/contact';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitMessage(formData);
      if (result.success) {
        setIsSuccess(true);
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-40 pb-32 relative overflow-hidden scroll-mt-32">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-8 md:px-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-zinc-500 text-xs font-bold uppercase tracking-[0.5em] mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '3rem' }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="h-px bg-blue-600 mx-auto mb-8" 
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-white font-light tracking-tight max-w-2xl mx-auto"
          >
            Have a project in mind? Let&apos;s build something <span className="text-blue-500">extraordinary</span>.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl hover:shadow-blue-500/5 transition-all duration-700"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2.5">
                  <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-[0.2rem] text-zinc-500 ml-4">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-blue-500/30 focus:bg-white/[0.05] rounded-full px-5 py-3 text-sm text-white placeholder:text-zinc-700 transition-all outline-none duration-500"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2.5">
                  <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-[0.2rem] text-zinc-500 ml-4">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-blue-500/30 focus:bg-white/[0.05] rounded-full px-5 py-3 text-sm text-white placeholder:text-zinc-700 transition-all outline-none duration-500"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2.5">
                <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-[0.2rem] text-zinc-500 ml-4">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What&apos;s on your mind?"
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-blue-500/30 focus:bg-white/[0.05] rounded-[1.5rem] px-5 py-4 text-sm text-white placeholder:text-zinc-700 transition-all outline-none duration-500 resize-none"
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-xs font-bold uppercase tracking-[0.2rem] rounded-full shadow-lg shadow-blue-900/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <Send size={16} />
                    </motion.div>
                  ) : isSuccess ? (
                    <span className="flex items-center gap-2">
                       SENT <CheckCircle2 size={16} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                       SEND MESSAGE <Send size={16} />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
