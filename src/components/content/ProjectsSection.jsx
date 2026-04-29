import { FaGithub } from "react-icons/fa";
import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { defaultRepoLanguageColor, repoLanguageColors } from "../../lib/iconMaps";

function ProjectsSection({ loadingProjects, projectError, projects }) {
  const { projects: projectContent } = resume;

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <TypewriterText
          as="p"
          text={projectContent.eyebrow}
          className="text-sm font-semibold uppercase tracking-widest text-emerald-600"
          speed={9}
        />
        <TypewriterText
          as="h2"
          text={projectContent.title}
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          speed={10}
          startDelay={80}
        />
        <TypewriterText
          text={projectContent.intro}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base"
          speed={8}
          startDelay={160}
        />
        {projectError ? <p className="text-sm text-red-500">{projectError}</p> : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loadingProjects
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm animate-pulse">
                <div className="h-1.5 w-full bg-gray-100" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-3/5 rounded-xl bg-gray-100" />
                  <div className="h-3 w-full rounded bg-gray-100" />
                  <div className="h-3 w-4/5 rounded bg-gray-100" />
                  <div className="mt-4 h-9 w-full rounded-xl bg-gray-100" />
                </div>
              </div>
            ))
          : projects.map((project, index) => {
              const languageColor = repoLanguageColors[project.language] || defaultRepoLanguageColor;

              return (
                <div
                  key={project.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100/60 bg-white shadow-[0_4px_20px_rgba(5,150,105,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(5,150,105,0.14)]"
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: languageColor }} />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl shadow-sm"
                        style={{ backgroundColor: `${languageColor}18` }}
                      >
                        <FaGithub className="h-5 w-5" style={{ color: languageColor }} />
                      </div>
                      {project.language ? (
                        <span
                          className="mt-1 flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: `${languageColor}12`,
                            borderColor: `${languageColor}30`,
                            color: languageColor,
                          }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor }} />
                          <TypewriterText as="span" text={project.language} speed={8} startDelay={80 + index * 40} />
                        </span>
                      ) : null}
                    </div>

                    <TypewriterText
                      as="h3"
                      text={project.name}
                      className="mb-2 text-base font-bold leading-snug text-gray-900"
                      speed={10}
                      startDelay={80 + index * 60}
                    />
                    <TypewriterText
                      text={project.description}
                      className="mb-4 flex-1 text-sm leading-relaxed text-gray-500"
                      speed={8}
                      startDelay={150 + index * 60}
                    />

                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      {project.stargazers_count > 0 ? (
                        <TypewriterText
                          as="span"
                          text={`${project.stargazers_count} ${projectContent.starsSuffix}`}
                          speed={9}
                          startDelay={200 + index * 60}
                        />
                      ) : null}
                      <TypewriterText
                        as="span"
                        text={
                          project.updated_at
                            ? new Date(project.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                            : projectContent.repoMetaFallback
                        }
                        speed={9}
                        startDelay={230 + index * 60}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{
                          backgroundColor: `${languageColor}10`,
                          borderColor: `${languageColor}30`,
                          color: languageColor,
                        }}
                      >
                        <FaGithub className="h-4 w-4" />
                        <TypewriterText as="span" text={projectContent.actionLabel} speed={9} startDelay={300 + index * 60} />
                      </a>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-2 font-mono text-xs text-emerald-700">
                        <TypewriterText
                          text={`open ${project.slug}`}
                          speed={8}
                          startDelay={340 + index * 60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ProjectsSection;
