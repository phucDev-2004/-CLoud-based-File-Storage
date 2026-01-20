import { CloudUpload, Download, FolderCog } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: <CloudUpload size={32} />,
      title: 'Upload & Download',
      desc: 'Upload files to cloud storage and download anytime, anywhere.',
    },
    {
      icon: <FolderCog size={32} />,
      title: 'File Management',
      desc: 'Organize, rename, delete and manage all your files easily.',
    },
    {
      icon: <Download size={32} />,
      title: 'Cloud Architecture',
      desc: 'Demonstrates cloud-based file storage architecture.',
    },
  ];

  return (
    <>
      {' '}
      <section className="bg-[#020617] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white hover:scale-105 transition"
            >
              <div className="text-cyan-300 mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
