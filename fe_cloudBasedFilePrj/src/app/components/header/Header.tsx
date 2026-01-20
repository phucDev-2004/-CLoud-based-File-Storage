'use client';

import Link from 'next/link';
import { Cloud, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90"
        >
          <Cloud className="text-cyan-300" />
          Cloud Based
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-white/80">
          <a className="hover:text-cyan-300 transition">Features</a>
          <a className="hover:text-cyan-300 transition">Security</a>
          <a className="hover:text-cyan-300 transition">Docs</a>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Login */}
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
          >
            <LogIn size={18} />
            Login
          </Link>

          {/* Register */}
          <Link
            href="/auth/register"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg hover:opacity-90 transition"
          >
            <UserPlus size={18} />
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
