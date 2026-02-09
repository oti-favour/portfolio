import { Header } from "@/components/layout/Header";
import { EmailSidebar } from "@/components/layout/EmailSidebar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { CosmosBackground } from "@/components/ui/CosmosBackground";

export default function Home() {
  return (
    <>
      <CosmosBackground />
      <Header />
      <EmailSidebar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
