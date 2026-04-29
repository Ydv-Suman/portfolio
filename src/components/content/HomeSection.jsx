import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { socialIcons } from "../../lib/iconMaps";

function HomeSection({ onCommandSuggestion }) {
  const { home, person, terminal } = resume;

  return (
    <div className="grid min-h-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <TypewriterText as="span" text={person.availability} speed={10} />
        </div>

        <div className="space-y-3">
          <TypewriterText
            as="p"
            text={home.eyebrow}
            className="text-xs font-medium uppercase tracking-widest text-gray-400"
            speed={8}
          />
          <div className="space-y-1">
            <TypewriterText
              as="p"
              text={home.headingPrefix}
              className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-[3.2rem]"
              speed={10}
            />
            <TypewriterText
              as="p"
              text={home.headingAccent}
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl lg:text-[3.2rem]"
              speed={10}
              startDelay={120}
            />
          </div>
        </div>

        <TypewriterText
          text={home.summary}
          className="max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg"
          speed={8}
          startDelay={220}
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCommandSuggestion(home.primaryAction.command)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-200/70 transition-all hover:-translate-y-0.5 hover:shadow-emerald-300/80"
          >
            <TypewriterText as="span" text={home.primaryAction.label} speed={10} startDelay={280} />
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href={home.secondaryAction.href}
            download={home.secondaryAction.download}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3 font-semibold text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600"
          >
            <TypewriterText as="span" text={home.secondaryAction.label} speed={10} startDelay={340} />
          </a>
        </div>

        <div className="space-y-3 pt-1">
          <TypewriterText
            as="p"
            text={home.followLabel}
            className="text-xs uppercase tracking-widest text-gray-400"
            speed={8}
            startDelay={400}
          />
          <div className="flex flex-wrap gap-2">
            {person.socialLinks.map(({ icon, label, href }, index) => {
              const Icon = socialIcons[icon];

              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <TypewriterText as="span" text={label} speed={9} startDelay={460 + index * 60} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-[0_4px_20px_rgba(5,150,105,0.06)]">
          <TypewriterText
            text={terminal.bootLines.join(" ")}
            className="font-mono text-sm leading-relaxed text-gray-500"
            speed={7}
            startDelay={520}
          />
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 blur-3xl opacity-60" />

          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-2xl shadow-emerald-200/50 sm:h-72 sm:w-72 lg:h-[22rem] lg:w-[22rem]">
            <img src={person.profileImage} alt={person.name} className="h-full w-full object-cover object-top" />
          </div>

          {home.badges.map((badge, index) => {
            const positionClasses = [
              "absolute top-4 -right-4 rounded-2xl border border-gray-100 bg-white px-3 py-2 shadow-lg shadow-gray-200/60 sm:-right-8",
              "absolute bottom-8 -left-4 rounded-2xl border border-gray-100 bg-white px-3 py-2 shadow-lg shadow-gray-200/60 sm:-left-8",
              "absolute bottom-20 -right-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 px-3 py-2 shadow-lg sm:-right-10",
            ];
            const eyebrowClass = badge.tone === "accent" ? "text-[10px] text-emerald-200" : "text-[10px] text-gray-400";
            const valueClass = badge.tone === "accent" ? "text-xs font-bold text-white" : "text-xs font-bold text-gray-800";

            return (
              <div key={badge.label} className={positionClasses[index]}>
                <TypewriterText as="p" text={badge.label} className={eyebrowClass} speed={12} startDelay={180 + index * 60} />
                <TypewriterText as="p" text={badge.value} className={valueClass} speed={12} startDelay={260 + index * 60} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
