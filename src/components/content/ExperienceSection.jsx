import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";

function ExperienceSection() {
  const { experience } = resume;

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <TypewriterText
          as="p"
          text={experience.eyebrow}
          className="text-sm font-semibold uppercase tracking-widest text-emerald-600"
          speed={9}
        />
        <TypewriterText
          as="h2"
          text={experience.title}
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          speed={10}
          startDelay={80}
        />
      </div>

      <div className="relative">
        <div className="absolute bottom-6 left-6 top-6 hidden w-0.5 bg-gradient-to-b from-emerald-300 via-teal-200 to-green-200 md:block" />

        <div className="space-y-5">
          {experience.items.map((item, index) => (
            <div key={item.title} className="relative md:pl-16">
              <span className={`absolute left-3.5 top-7 hidden h-5 w-5 rounded-full border-4 border-white shadow-md md:block ${item.dot}`} />
              <div className="rounded-2xl border border-gray-100/60 bg-white p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] transition-all hover:shadow-[0_8px_28px_rgba(5,150,105,0.1)]">
                <TypewriterText
                  as="span"
                  text={item.period}
                  className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-600"
                  speed={9}
                  startDelay={index * 70}
                />
                <TypewriterText
                  as="h3"
                  text={item.title}
                  className="text-xl font-bold text-gray-900"
                  speed={10}
                  startDelay={80 + index * 70}
                />
                <TypewriterText
                  as="p"
                  text={item.org}
                  className="mb-3 mt-0.5 text-sm font-semibold text-emerald-600"
                  speed={10}
                  startDelay={150 + index * 70}
                />
                <TypewriterText
                  text={item.details}
                  className="text-sm leading-relaxed text-gray-500"
                  speed={8}
                  startDelay={220 + index * 70}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
