'use client';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Cloud, UserCheck } from 'lucide-react';

const members = [
  { id: '2251120049', name: 'Nguyễn Giang Thành Tài' },
  { id: '2251120103', name: 'Võ Văn Phúc' },
  { id: '2251120098', name: 'Trịnh Thị Nghĩa' },
  { id: '2251120069', name: 'Đỗ Thị Ngọc Diễm' },
  { id: '2254030146', name: 'Trịnh Hồ Ngọc Trung Kiên' },
];
export default function AboutPage() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#1e3a8a] to-[#0ea5e9] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Users className="mx-auto text-cyan-300 mb-4" size={48} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Group 6 – Cloud Based Project
            </h1>
            <p className="mt-4 text-white/80">
              Cloud-Based File Storage System
            </p>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white mb-16"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Trường */}
              <div className="flex items-center gap-3">
                <GraduationCap className="text-cyan-300" />
                <div>
                  <p className="font-semibold">
                    University of Transport Ho Chi Minh City
                  </p>
                  <p className="text-sm text-white/70">
                    Đại học Giao thông vận tải TP.HCM
                  </p>
                </div>
              </div>

              {/* Môn học */}
              <div className="flex items-center gap-3">
                <Cloud className="text-cyan-300" />
                <div>
                  <p className="font-semibold">
                    [010412303901] – Cloud Computing
                  </p>
                  <p className="text-sm text-white/70">
                    Điện toán đám mây – Môn học
                  </p>
                </div>
              </div>

              {/* Giáo viên hướng dẫn */}
              <div className="flex items-center gap-3">
                <UserCheck className="text-cyan-300" />
                <div>
                  <p className="font-semibold">Supervising Lecturer</p>
                  <p className="text-sm text-white/70">TS. Hàn Trung Định</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Members */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {members.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white hover:scale-105 transition"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-black mb-4">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-white/70">Student ID: {m.id}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
