'use client';

import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import Link from 'next/link';
import { FormLogin } from './FormLogin';
import { Toaster } from 'sonner';

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] flex items-center justify-center">
        {/* glow background */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
        >
          <Link href="/">
            <div className="flex flex-col items-center mb-6">
              <Cloud className="w-12 h-12 text-cyan-300 mb-2" />
              <h1 className="text-3xl font-bold text-white">Cloud Based</h1>
              <p className="text-sm text-cyan-200">Secure Cloud File Storage</p>
            </div>
          </Link>

          {/* Form Login */}
          <FormLogin />

          <p className="text-center text-sm text-white/70 mt-6">
            New here?{' '}
            <Link href="/auth/register">
              <span className="text-cyan-300 cursor-pointer">
                Create account
              </span>
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
