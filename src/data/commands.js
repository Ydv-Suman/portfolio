export const COMMAND_SECTION_MAP = {
  whoami: "about",
  about: "about",
  skills: "skills",
  "skills --list": "skills",
  projects: "projects",
  "ls projects": "projects",
  experience: "experience",
  history: "experience",
  contact: "contact",
  home: "home",
};

export const HELP_COMMANDS = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "home",
  "back",
  "help",
  "clear",
];

export const BUILT_IN_PATTERNS = [
  /^sudo\s+.+$/i,
];

export const NATURAL_LANGUAGE_PATTERN =
  /(\?$)|\b(who|what|when|where|why|how|tell|explain|can|could|would|should|is|are|do|does)\b/i;
