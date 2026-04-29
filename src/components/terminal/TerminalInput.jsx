function TerminalInput({ inputRef, onChange, onKeyDown, prompt, value }) {
  return (
    <div className="sticky bottom-0 border-t border-[#21262d] bg-[#0d1117] px-4 py-3">
      <label className="flex items-center gap-3 font-mono text-sm text-[#58a6ff]">
        <span className="shrink-0">{prompt}</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label={prompt}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full border-0 bg-transparent pr-4 text-[#e6edf3] outline-none placeholder:text-[#6e7681]"
          />
          <span className="pointer-events-none absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 animate-pulse bg-[#58a6ff]" />
        </div>
      </label>
    </div>
  );
}

export default TerminalInput;
