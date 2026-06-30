import { useState } from "react";
import { resume } from "../../data/resume";
import SectionTitle from "../common/SectionTitle";

function ExperienceSection() {
  const { experience } = resume;
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-12">
      <SectionTitle>{experience.title}</SectionTitle>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gray-200 dark:bg-gray-800 md:block" />

        <div className="space-y-8">
          {experience.items.map((item, index) => {
            const isOpen = expanded[index];
            const hasDetails = item.details && item.details.length > 0;

            return (
              <div key={index} className="relative md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-1.5 hidden h-3 w-3 rounded-full border-2 border-white bg-gray-400 dark:border-gray-950 dark:bg-gray-600 md:block" />

                <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
                  <span className="mb-2 inline-block text-sm text-gray-500 dark:text-gray-400">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.org}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.summary}
                  </p>

                  {item.tech.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {hasDetails && (
                    <>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="mt-3 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        {isOpen ? "Show less" : "Show more"}
                      </button>

                      {isOpen && (
                        <ul className="mt-3 space-y-1.5">
                          {item.details.map((detail, i) => (
                            <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
