import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AboutSection from "../components/content/AboutSection";
import ContactSection from "../components/content/ContactSection";
import ExperienceSection from "../components/content/ExperienceSection";
import HomeSection from "../components/content/HomeSection";
import ProjectDetail from "../components/content/ProjectDetail";
import ProjectsSection from "../components/content/ProjectsSection";
import SkillsSection from "../components/content/SkillsSection";
import SectionFrame from "../components/layout/SectionFrame";
import Terminal from "../components/terminal/Terminal";
import useTerminal from "../hooks/useTerminal";

function Website() {
  const {
    activeProjectSlug,
    activeSection,
    executeCommand,
    input,
    isStreaming,
    loadingProjects,
    onHistoryDown,
    onHistoryUp,
    output,
    projectError,
    projects,
    setInputValue,
    terminalPrompt,
  } = useTerminal();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const runCommandFromButton = useCallback(
    (command) => {
      setIsTerminalOpen(true);
      setTimeout(() => {
        executeCommand(command);
        setIsTerminalOpen(false);
      }, 600);
    },
    [executeCommand],
  );

  const activeProject = projects.find((project) => project.slug === activeProjectSlug) ?? null;

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutSection onCommandSuggestion={runCommandFromButton} />;
      case "skills":
        return <SkillsSection />;
      case "projects":
        return (
          <ProjectsSection
            loadingProjects={loadingProjects}
            projectError={projectError}
            projects={projects}
          />
        );
      case "project":
        return <ProjectDetail onCommandSuggestion={setInputValue} project={activeProject} />;
      case "experience":
        return <ExperienceSection />;
      case "contact":
        return <ContactSection />;
      case "home":
      default:
        return <HomeSection onCommandSuggestion={runCommandFromButton} />;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.45),transparent_42%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.55),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f6fffb_100%)]" />

      <div className="relative h-[calc(100vh-160px)] overflow-hidden">
        <AnimatePresence mode="wait">
          <SectionFrame sectionKey={activeSection === "project" ? `${activeSection}-${activeProjectSlug}` : activeSection}>
            {renderSection()}
          </SectionFrame>
        </AnimatePresence>
      </div>

      <Terminal
        executeCommand={executeCommand}
        input={input}
        isOpen={isTerminalOpen}
        isStreaming={isStreaming}
        onHistoryDown={onHistoryDown}
        onHistoryUp={onHistoryUp}
        onOpenChange={setIsTerminalOpen}
        output={output}
        setInputValue={setInputValue}
        terminalPrompt={terminalPrompt}
      />
    </div>
  );
}

export default Website;
