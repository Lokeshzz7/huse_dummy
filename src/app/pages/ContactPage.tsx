import { Contact } from '../components/Contact';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AmbientBackground } from '../components/AmbientBackground';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#111] relative">
      <AmbientBackground />
      <Header />
      <main className="pt-[70px]">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
