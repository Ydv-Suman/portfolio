import { FaGithub } from "react-icons/fa";
import { resume } from "../../data/resume";
import { skillIcons, skillColors } from "../../lib/iconMaps";
import SectionTitle from "../common/SectionTitle";

function ProjectsSection() {
  const { projects } = resume;

  return (
    <div className="space-y-12">
      <SectionTitle>{projects.title}</SectionTitle>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => (
          <div
            key={project.name}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-white/40 hover:bg-white/60 hover:shadow-lg hover:backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700/40 dark:hover:bg-gray-900/60 dark:hover:shadow-gray-900/50"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {project.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => {
                const Icon = skillIcons[tech];
                const color = skillColors[tech] || "#6b7280";
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${color}15`,
                      borderColor: `${color}30`,
                      color: color,
                    }}
                  >
                    {Icon ? <Icon className="h-3 w-3" style={{ color }} /> : null}
                    {tech}
                  </span>
                );
              })}
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <FaGithub className="h-4 w-4" />
                Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
