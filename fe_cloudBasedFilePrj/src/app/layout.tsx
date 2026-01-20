import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: 'Cloud Based File Project',
  description: 'A cloud based file storage solution.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
