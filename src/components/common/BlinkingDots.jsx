function BlinkingDots({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label="Loading">
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 [animation-delay:0ms]" />
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 [animation-delay:150ms]" />
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 [animation-delay:300ms]" />
    </span>
  );
}

export default BlinkingDots;
