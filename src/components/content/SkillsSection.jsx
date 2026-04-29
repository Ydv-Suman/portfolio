import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { skillIcons } from "../../lib/iconMaps";

const accentGradients = [
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-pink-500",
];

const accentSofts = [
  "border-emerald-200 bg-emerald-50 text-emerald-700",
  "border-violet-200 bg-violet-50 text-violet-700",
  "border-sky-200 bg-sky-50 text-sky-700",
  "border-orange-200 bg-orange-50 text-orange-700",
  "border-rose-200 bg-rose-50 text-rose-700",
];

function SkillsSection() {
  const { skills } = resume;

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <TypewriterText
          as="p"
          text={skills.eyebrow}
          className="text-sm font-semibold uppercase tracking-widest text-emerald-600"
          speed={9}
        />
        <TypewriterText
          as="h2"
          text={skills.title}
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          speed={10}
          startDelay={80}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.groups.map((group, index) => {
          const accent = accentGradients[index % accentGradients.length];
          const soft = accentSofts[index % accentSofts.length];

          return (
            <div
              key={group.title}
              className="overflow-hidden rounded-2xl border border-gray-100/60 bg-white shadow-[0_4px_20px_rgba(5,150,105,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(5,150,105,0.12)]"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

              <div className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-xl shadow-sm ${accent}`}>
                    {group.emoji}
                  </div>
                  <div>
                    <TypewriterText
                      as="h3"
                      text={group.title}
                      className="text-base font-extrabold leading-none text-gray-900"
                      speed={10}
                      startDelay={index * 70}
                    />
                    <TypewriterText
                      as="p"
                      text={`${group.items.length} tools`}
                      className="mt-0.5 text-xs text-gray-400"
                      speed={10}
                      startDelay={80 + index * 70}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIndex) => {
                    const Icon = skillIcons[item];

                    return (
                      <span
                        key={item}
                        className={`inline-flex cursor-default items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${soft}`}
                      >
                        {Icon ? <Icon className="h-3.5 w-3.5 flex-shrink-0" /> : null}
                        <TypewriterText as="span" text={item} speed={8} startDelay={120 + itemIndex * 35 + index * 40} />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsSection;
