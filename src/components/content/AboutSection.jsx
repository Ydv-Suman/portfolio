import { resume } from "../../data/resume";
import aboutImage from "../../assets/suman.png";
import SectionTitle from "../common/SectionTitle";

function AboutSection() {
  const { about, person } = resume;

  return (
    <div className="space-y-12">
      <SectionTitle>{about.title}</SectionTitle>

      <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <div className="h-56 w-56 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-800">
            <img
              src={aboutImage}
              alt={person.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="space-y-4">
          {about.bio.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AboutSection;
