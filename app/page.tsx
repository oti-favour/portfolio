import { Header } from "@/components/layout/Header";
import { EmailSidebar } from "@/components/layout/EmailSidebar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { CosmosBackground } from "@/components/ui/CosmosBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <CosmosBackground />
      <CustomCursor />
      <Header />
      <EmailSidebar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Marquee />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
