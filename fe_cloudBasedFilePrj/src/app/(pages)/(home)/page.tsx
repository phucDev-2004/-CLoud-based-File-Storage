import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { FeatureSection } from '@/app/components/hero/FeatureSection';
import { HeroSection } from '@/app/components/hero/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </>
  );
}
