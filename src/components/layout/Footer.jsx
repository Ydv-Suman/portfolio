import { resume } from "../../data/resume";
import { socialIcons } from "../../lib/iconMaps";

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {resume.person.name}
        </p>

        <div className="flex gap-4">
          {resume.person.socialLinks.map(({ icon, label, href }) => {
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
    </footer>
  );
}

export default Footer;
