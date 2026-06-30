import { resume } from "../../data/resume";
import { skillIcons, skillColors } from "../../lib/iconMaps";
import SectionTitle from "../common/SectionTitle";

function SkillsSection() {
  const { skills } = resume;

  return (
    <div className="space-y-12">
      <SectionTitle>{skills.title}</SectionTitle>

      <div className="grid gap-6 sm:grid-cols-2">
        {skills.groups.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-gray-200 p-6 dark:border-gray-800"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const Icon = skillIcons[item];
                const color = skillColors[item] || "#6b7280";
                return (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium"
                    style={{
                      backgroundColor: `${color}15`,
                      borderColor: `${color}30`,
                      color: color,
                    }}
                  >
                    {Icon ? <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color }} /> : null}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
