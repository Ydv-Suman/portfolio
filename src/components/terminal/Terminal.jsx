import { useEffect, useRef, useState } from "react";
import { resume } from "../../data/resume";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";

const STICKY_OPEN_COMMANDS = new Set(["back", "clear", "help"]);

function Terminal({
  executeCommand,
  input,
  isStreaming,
  onHistoryDown,
  onHistoryUp,
  output,
  setInputValue,
  terminalPrompt,
}) {
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [input, isOpen, output.length, isStreaming]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const focusInput = () => {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    };

    const handlePointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) {
        focusInput();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen]);

  const toggleTerminal = () => {
    setIsOpen((current) => !current);
  };

  const closeTerminal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const currentInput = input;
      const normalizedCommand = currentInput.trim().toLowerCase();
      if (!STICKY_OPEN_COMMANDS.has(normalizedCommand)) {
        closeTerminal();
      }
      await executeCommand(currentInput);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      onHistoryUp();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      onHistoryDown();
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          ref={panelRef}
          className="fixed left-1/2 top-5 z-50 flex h-[min(460px,calc(100vh-40px))] w-[min(860px,calc(100vw-28px))] -translate-x-1/2 flex-col overflow-hidden rounded-[1.2rem] border border-[#30363d] bg-[#0d1117] shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeTerminal}
                aria-label="Close terminal"
                className="h-3 w-3 rounded-full bg-[#ff5f57]"
              />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-[#8b949e]">{resume.terminal.launcherLabel}</span>
            <span className="w-[52px]" aria-hidden="true" />
          </div>
          <TerminalOutput output={output} />
          <TerminalInput
            inputRef={inputRef}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            prompt={terminalPrompt}
            value={input}
          />
        </div>
      ) : null}

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <button
          type="button"
          onClick={toggleTerminal}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-[#30363d] bg-[#0d1117]/96 px-4 py-2.5 text-left shadow-[0_18px_36px_rgba(0,0,0,0.28)] transition-all hover:border-[#3d444d]"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-mono text-xs text-[#8b949e]">{terminalPrompt}</span>
          <span className="font-mono text-sm text-[#e6edf3]">{resume.terminal.launcherLabel}</span>
        </button>
      </div>
    </>
  );
}

export default Terminal;
