import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { socialIcons } from "../../lib/iconMaps";

function AboutSection({ onCommandSuggestion }) {
  const { about, person } = resume;

  return (
    <div className="grid min-h-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6 rounded-[2rem] border border-gray-100/60 bg-white p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] sm:p-8">
        <div className="space-y-3">
          <TypewriterText
            as="p"
            text={about.eyebrow}
            className="text-sm font-semibold uppercase tracking-widest text-emerald-600"
            speed={9}
          />
          <TypewriterText
            as="h2"
            text={about.title}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            speed={10}
            startDelay={80}
          />
        </div>

        <div className="space-y-4">
          {about.bio.map((paragraph, index) => (
            <TypewriterText
              key={paragraph}
              text={paragraph}
              className="text-sm leading-relaxed text-gray-500 sm:text-base"
              speed={8}
              startDelay={140 + index * 120}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {person.socialLinks.map(({ icon, label, href }, index) => {
            const Icon = socialIcons[icon];

            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                <TypewriterText as="span" text={label} speed={9} startDelay={440 + index * 70} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {about.highlights.map((item, index) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl border border-gray-100/60 bg-white p-5 shadow-[0_4px_20px_rgba(5,150,105,0.06)] transition-all hover:shadow-[0_8px_28px_rgba(5,150,105,0.1)]"
          >
            <span className="flex-shrink-0 text-2xl">{item.emoji}</span>
            <div>
              <TypewriterText
                as="p"
                text={item.title}
                className="mb-0.5 text-sm font-bold text-gray-900"
                speed={10}
                startDelay={140 + index * 80}
              />
              <TypewriterText
                text={item.body}
                className="text-sm leading-relaxed text-gray-500"
                speed={8}
                startDelay={220 + index * 80}
              />
            </div>
          </div>
        ))}

        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-lg shadow-emerald-300/40">
          <TypewriterText as="p" text={about.cta.eyebrow} className="mb-1 text-sm font-medium text-emerald-200" speed={10} />
          <TypewriterText as="h3" text={about.cta.title} className="mb-2 text-xl font-extrabold" speed={10} startDelay={80} />
          <TypewriterText as="p" text={about.cta.body} className="mb-4 text-sm text-emerald-200" speed={8} startDelay={160} />
          <button
            type="button"
            onClick={() => onCommandSuggestion(about.cta.command)}
            className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-50"
          >
            <TypewriterText as="span" text={about.cta.actionLabel} speed={10} startDelay={240} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
