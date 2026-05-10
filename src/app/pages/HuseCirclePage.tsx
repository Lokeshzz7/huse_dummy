import { HuseCircle } from '../components/HuseCircle';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AmbientBackground } from '../components/AmbientBackground';

export function HuseCirclePage() {
  return (
    <div className="min-h-screen bg-[#111] relative">
      <AmbientBackground />
      <Header />
      <main className="pt-[70px]">
        <HuseCircle />
      </main>
      <Footer />
    </div>
  );
}
