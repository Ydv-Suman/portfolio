import { resume } from "../../data/resume";
import { socialIcons } from "../../lib/iconMaps";

function HeroSection() {
  const { person, hero } = resume;

  return (
    <div className="flex min-h-[70vh] items-center">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            {person.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl">
            {person.role}
          </p>
        </div>

        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
          {hero.description}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            download={hero.secondaryCta.download}
            className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <div className="flex gap-4 pt-2">
          {person.socialLinks.map(({ icon, label, href }) => {
            const Icon = socialIcons[icon];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {Icon ? <Icon className="h-5 w-5" /> : null}
              </a>
            );
          })}
        </div>
      </div>

      <div className="hidden justify-center lg:flex">
        <img
          src={person.profileImage}
          alt={person.name}
          className="max-h-[28rem] object-cover object-top mix-blend-luminosity dark:mix-blend-lighten dark:opacity-80"
        />
      </div>
      </div>
    </div>
  );
}

export default HeroSection;
