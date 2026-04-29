import { useEffect, useState } from "react";
import { BUILT_IN_PATTERNS, COMMAND_SECTION_MAP, HELP_COMMANDS, NATURAL_LANGUAGE_PATTERN } from "../data/commands";
import { resume } from "../data/resume";
import useCommandHistory from "./useCommandHistory";

const DEFAULT_SECTION = "home";
const STORAGE_KEY = "portfolio-terminal-state";

const createLogLine = (text, tone = "output", options = {}) => ({
  id: crypto.randomUUID(),
  preserveWhitespace: Boolean(options.preserveWhitespace),
  text,
  tone,
});

const normalizeSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildProjectRecords = (repoDetails = []) =>
  resume.projects.items.map((item) => {
    const matchedRepo =
      repoDetails.find((repo) => normalizeSlug(repo.name) === item.slug) ??
      repoDetails.find((repo) => repo.name === item.repo);

    return {
      ...item,
      description: matchedRepo?.description || resume.github.fallbackDescription,
      forks_count: matchedRepo?.forks_count ?? 0,
      html_url: matchedRepo?.html_url ?? `https://github.com/${resume.github.username}/${item.repo}`,
      language: matchedRepo?.language ?? "",
      name: matchedRepo?.name ?? item.repo,
      stargazers_count: matchedRepo?.stargazers_count ?? 0,
      updated_at: matchedRepo?.updated_at ?? "",
    };
  });

const looksLikeCommand = (value) => {
  if (COMMAND_SECTION_MAP[value]) {
    return true;
  }

  return BUILT_IN_PATTERNS.some((pattern) => pattern.test(value)) || /^[a-z0-9-]+$/i.test(value);
};

const looksLikeNaturalLanguage = (value) => {
  if (NATURAL_LANGUAGE_PATTERN.test(value)) {
    return true;
  }

  return value.split(/\s+/).length >= 4;
};

const readStoredState = () => {
  if (typeof window === "undefined") {
    return { activeProjectSlug: null, activeSection: DEFAULT_SECTION, sectionStack: [DEFAULT_SECTION] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { activeProjectSlug: null, activeSection: DEFAULT_SECTION, sectionStack: [DEFAULT_SECTION] };
    }

    const parsed = JSON.parse(raw);
    return {
      activeProjectSlug: parsed.activeProjectSlug ?? null,
      activeSection: parsed.activeSection ?? DEFAULT_SECTION,
      sectionStack: Array.isArray(parsed.sectionStack) && parsed.sectionStack.length
        ? parsed.sectionStack
        : [parsed.activeSection ?? DEFAULT_SECTION],
    };
  } catch {
    return { activeProjectSlug: null, activeSection: DEFAULT_SECTION, sectionStack: [DEFAULT_SECTION] };
  }
};

function useTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(() =>
    resume.terminal.bootLines.map((line) => createLogLine(line, "system")),
  );
  const [activeSection, setActiveSection] = useState(() => readStoredState().activeSection);
  const [activeProjectSlug, setActiveProjectSlug] = useState(() => readStoredState().activeProjectSlug);
  const [sectionStack, setSectionStack] = useState(() => readStoredState().sectionStack);
  const [projects, setProjects] = useState(() => buildProjectRecords());
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const { cycleDown, cycleUp, pushHistory } = useCommandHistory();

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        setProjectError("");

        let mapped = null;

        try {
          const pinnedResponse = await fetch(
            `https://gh-pinned-repos.egoist.dev/?username=${resume.github.username}`,
          );

          if (pinnedResponse.ok) {
            const data = await pinnedResponse.json();
            if (Array.isArray(data) && data.length > 0) {
              mapped = data.map((repo) => ({
                description: repo.description,
                forks_count: repo.forks ?? 0,
                html_url: `https://github.com/${resume.github.username}/${repo.repo}`,
                language: repo.language,
                name: repo.repo,
                stargazers_count: repo.stars ?? 0,
                updated_at: repo.updatedAt ?? new Date().toISOString(),
              }));
            }
          }
        } catch {
          mapped = null;
        }

        if (!mapped) {
          const repoResponse = await fetch(
            `https://api.github.com/users/${resume.github.username}/repos?per_page=100`,
          );

          if (!repoResponse.ok) {
            throw new Error("GitHub API request failed");
          }

          const allRepos = await repoResponse.json();
          mapped = allRepos
            .filter((repo) => !repo.fork && resume.github.pinnedRepos.includes(repo.name))
            .sort(
              (left, right) =>
                resume.github.pinnedRepos.indexOf(left.name) - resume.github.pinnedRepos.indexOf(right.name),
            );
        }

        if (!active) {
          return;
        }

        setProjects(buildProjectRecords(mapped));
      } catch (error) {
        console.error(error);

        if (!active) {
          return;
        }

        setProjectError(resume.github.repoError);
      } finally {
        if (active) {
          setLoadingProjects(false);
        }
      }
    };

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeProjectSlug,
        activeSection,
        sectionStack,
      }),
    );
  }, [activeProjectSlug, activeSection, sectionStack]);

  const appendOutput = (lines) => {
    setOutput((current) => [...current, ...lines]);
  };

  const revealSection = (section, projectSlug = null) => {
    const nextKey = projectSlug ? `${section}:${projectSlug}` : section;
    const currentKey =
      activeSection === "project" && activeProjectSlug ? `${activeSection}:${activeProjectSlug}` : activeSection;

    setSectionStack((current) => (currentKey !== nextKey ? [...current, nextKey] : current));
    setActiveProjectSlug(projectSlug);
    setActiveSection(section);
  };

  const goBack = () => {
    if (sectionStack.length <= 1) {
      return false;
    }

    const next = sectionStack.slice(0, -1);
    const previousKey = next[next.length - 1];
    const [previousSection, previousProjectSlug = null] = previousKey.split(":");

    setSectionStack(next);
    setActiveSection(previousSection);
    setActiveProjectSlug(previousSection === "project" ? previousProjectSlug : null);
    return true;
  };

  const printHelp = () => {
    appendOutput([
      createLogLine(`Available commands:\n${HELP_COMMANDS.join("\n")}`, "system", { preserveWhitespace: true }),
    ]);
  };

  const replaceStreamingLine = (lineId, replacementLines) => {
    setOutput((current) => {
      const index = current.findIndex((line) => line.id === lineId);

      if (index === -1) {
        return [...current, ...replacementLines];
      }

      return [...current.slice(0, index), ...replacementLines, ...current.slice(index + 1)];
    });
  };

  const askAssistant = async (message) => {
    const endpoint = import.meta.env.VITE_TERMINAL_LLM_URL;

    if (!endpoint) {
      appendOutput([createLogLine(resume.terminal.llmUnavailable, "error")]);
      return;
    }

    const streamingId = crypto.randomUUID();

    setIsStreaming(true);
    setOutput((current) => [...current, { id: streamingId, text: "...", tone: "system", streaming: true }]);

    try {
      const response = await fetch(endpoint, {
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("LLM request failed");
      }

      let finalText = "";

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          finalText += decoder.decode(value, { stream: true });
        }

        finalText += decoder.decode();
      } else {
        finalText = await response.text();
      }

      const parsedText = (() => {
        try {
          const payload = JSON.parse(finalText);
          return payload.answer || payload.output || payload.message || finalText;
        } catch {
          return finalText;
        }
      })();

      const lines = parsedText
        .split("\n")
        .filter(Boolean)
        .map((line) => createLogLine(line, "output"));

      replaceStreamingLine(streamingId, lines.length ? lines : [createLogLine(parsedText, "output")]);
    } catch (error) {
      console.error(error);
      replaceStreamingLine(streamingId, [createLogLine(resume.terminal.llmUnavailable, "error")]);
    } finally {
      setIsStreaming(false);
    }
  };

  const executeCommand = async (rawValue) => {
    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
      return;
    }

    appendOutput([createLogLine(`${resume.terminal.prompt} ${trimmedValue}`, "input")]);
    pushHistory(trimmedValue);
    setInput("");

    const normalizedValue = trimmedValue.toLowerCase();

    if (normalizedValue === "clear") {
      setOutput([]);
      return;
    }

    if (normalizedValue === "help") {
      printHelp();
      return;
    }

    if (normalizedValue === "back") {
      const didGoBack = goBack();
      appendOutput([
        createLogLine(
          didGoBack ? resume.terminal.backMessage : resume.terminal.homeFallbackMessage,
          "system",
        ),
      ]);
      return;
    }

    if (/^sudo\s+.+$/i.test(trimmedValue)) {
      appendOutput([createLogLine(resume.terminal.sudoError, "error")]);
      return;
    }

    if (COMMAND_SECTION_MAP[normalizedValue]) {
      revealSection(COMMAND_SECTION_MAP[normalizedValue]);
      appendOutput([createLogLine(`revealing ${COMMAND_SECTION_MAP[normalizedValue]}`, "system")]);
      return;
    }

    if (looksLikeCommand(normalizedValue) && !looksLikeNaturalLanguage(trimmedValue)) {
      appendOutput([createLogLine(`command not found: ${trimmedValue}. type 'help'.`, "error")]);
      return;
    }

    await askAssistant(trimmedValue);
  };

  const onHistoryUp = () => {
    const nextValue = cycleUp();
    if (nextValue !== null) {
      setInput(nextValue);
    }
  };

  const onHistoryDown = () => {
    const nextValue = cycleDown();
    if (nextValue !== null) {
      setInput(nextValue);
    }
  };

  return {
    activeProjectSlug,
    activeSection,
    executeCommand,
    input,
    isStreaming,
    loadingProjects,
    output,
    projectError,
    projects,
    setInput,
    setInputValue: setInput,
    setTerminalCommand: setInput,
    terminalPrompt: resume.terminal.prompt,
    onHistoryDown,
    onHistoryUp,
  };
}

export default useTerminal;
