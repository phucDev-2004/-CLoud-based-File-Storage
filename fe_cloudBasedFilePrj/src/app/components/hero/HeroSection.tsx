'use client';

import { motion } from 'framer-motion';
import { CloudUpload, Folder, Shield } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-[#020617] via-[#1e3a8a] to-[#0ea5e9] overflow-hidden">
        {/* glow */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/30 blur-3xl rounded-full -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full -bottom-40 -right-40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Cloud Based <br />
            <span className="text-cyan-300">File Storage System</span>
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Upload, download and manage your files securely on the cloud.
            <br />
            Designed as a cloud computing demo project.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-cyan-400 text-black font-semibold">
              Get Started
            </button>
            <Link href={`/about`}>
              <button className="px-6 py-3 rounded-lg border border-white/30 text-white">
                About
              </button>
            </Link>
          </div>

          {/* icons */}
          <div className="mt-16 flex justify-center gap-10 text-cyan-300">
            <CloudUpload size={40} />
            <Folder size={40} />
            <Shield size={40} />
          </div>
        </motion.div>
      </section>
    </>
  );
}
