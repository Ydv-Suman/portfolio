import { FaGithub } from "react-icons/fa";
import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { defaultRepoLanguageColor, repoLanguageColors } from "../../lib/iconMaps";

function ProjectDetail({ onCommandSuggestion, project }) {
  const { projects } = resume;

  if (!project) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="max-w-xl rounded-[2rem] border border-gray-100/60 bg-white p-8 text-center shadow-[0_4px_20px_rgba(5,150,105,0.06)]">
          <TypewriterText as="h2" text={projects.emptyTitle} className="text-2xl font-bold text-gray-900" speed={10} />
          <TypewriterText text={projects.emptyBody} className="mt-3 text-gray-500" speed={8} startDelay={90} />
        </div>
      </div>
    );
  }

  const languageColor = repoLanguageColors[project.language] || defaultRepoLanguageColor;

  return (
    <div className="grid min-h-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6 rounded-[2rem] border border-gray-100/60 bg-white p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] sm:p-8">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${languageColor}12`,
            borderColor: `${languageColor}30`,
            color: languageColor,
          }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor }} />
          <TypewriterText as="span" text={project.language || projects.repoMetaFallback} speed={8} />
        </span>

        <div className="space-y-3">
          <TypewriterText as="p" text={projects.eyebrow} className="text-sm font-semibold uppercase tracking-widest text-emerald-600" speed={9} />
          <TypewriterText as="h2" text={project.name} className="text-3xl font-extrabold text-gray-900 sm:text-4xl" speed={10} startDelay={80} />
          <TypewriterText text={project.description} className="text-base leading-relaxed text-gray-500" speed={8} startDelay={150} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <TypewriterText as="p" text={projects.detailLabels.repository} className="text-[10px] uppercase tracking-widest text-gray-400" speed={10} />
            <TypewriterText as="p" text={project.name} className="mt-1 text-sm font-bold text-gray-900" speed={10} startDelay={80} />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <TypewriterText as="p" text={projects.detailLabels.lastUpdated} className="text-[10px] uppercase tracking-widest text-gray-400" speed={10} />
            <TypewriterText
              as="p"
              text={
                project.updated_at
                  ? new Date(project.updated_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : projects.repoMetaFallback
              }
              className="mt-1 text-sm font-bold text-gray-900"
              speed={10}
              startDelay={80}
            />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <TypewriterText as="p" text={projects.detailLabels.stars} className="text-[10px] uppercase tracking-widest text-gray-400" speed={10} />
            <TypewriterText as="p" text={`${project.stargazers_count}`} className="mt-1 text-sm font-bold text-gray-900" speed={10} startDelay={80} />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <TypewriterText as="p" text={projects.detailLabels.forks} className="text-[10px] uppercase tracking-widest text-gray-400" speed={10} />
            <TypewriterText as="p" text={`${project.forks_count}`} className="mt-1 text-sm font-bold text-gray-900" speed={10} startDelay={80} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCommandSuggestion("back")}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2 font-mono text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-100"
          >
            <TypewriterText as="span" text={projects.detailPanel.commandLabel} speed={9} />
          </button>
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: `${languageColor}10`,
              borderColor: `${languageColor}30`,
              color: languageColor,
            }}
          >
            <FaGithub className="h-4 w-4" />
            <TypewriterText as="span" text={projects.actionLabel} speed={9} startDelay={100} />
          </a>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-full rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)]">
          <TypewriterText
            as="p"
            text={projects.detailPanel.commandLabel}
            className="font-mono text-xs uppercase tracking-widest text-emerald-600"
            speed={9}
          />
          <TypewriterText
            as="h3"
            text={projects.detailPanel.title}
            className="mt-3 text-xl font-extrabold text-gray-900"
            speed={10}
            startDelay={80}
          />
          <TypewriterText
            text={projects.detailPanel.body}
            className="mt-3 text-sm leading-relaxed text-gray-500"
            speed={8}
            startDelay={160}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
