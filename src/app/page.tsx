import Hero from '@/components/Hero';
import Quiz from '@/components/Quiz';
import Wall from '@/components/Wall';
import MusicPlayer from '@/components/MusicPlayer';
import SecretMessage from '@/components/SecretMessage';
import FakeLoading from "@/components/FakeLoading";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <FakeLoading />
      <MusicPlayer />
      <Hero />
      <Quiz />
      <Wall />
      <SecretMessage />
    </main>
  );
}
