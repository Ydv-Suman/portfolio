import useTheme from "../hooks/useTheme";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/content/HeroSection";
import AboutSection from "../components/content/AboutSection";
import SkillsSection from "../components/content/SkillsSection";
import ExperienceSection from "../components/content/ExperienceSection";
import ProjectsSection from "../components/content/ProjectsSection";
import CertificationsSection from "../components/content/CertificationsSection";

import ContactSection from "../components/content/ContactSection";
import Footer from "../components/layout/Footer";

function Website() {
  useTheme();

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-6">
        <section id="hero" className="py-24 sm:py-32">
          <HeroSection />
        </section>

        <section id="about" className="py-24">
          <AboutSection />
        </section>

        <section id="skills" className="py-24">
          <SkillsSection />
        </section>

        <section id="experience" className="py-24">
          <ExperienceSection />
        </section>

        <section id="projects" className="py-24">
          <ProjectsSection />
        </section>

        <section id="certifications" className="py-24">
          <CertificationsSection />
        </section>

<section id="contact" className="py-24">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Website;
