
import HomeContent from "@/components/layout/HomeContent";
import { getProfile } from "@/actions/profile";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HomeContent profile={profile || null}>
        <Navbar />
        <Hero profile={profile || null} />
        <About profile={profile || null} />
        <Skills />
        <Projects />
        <Contact />
      </HomeContent>
    </main>
  );
}
