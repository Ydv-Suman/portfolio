import { useEffect, useRef } from "react";
import BlinkingDots from "../common/BlinkingDots";
import TypewriterText from "../common/TypewriterText";

const toneClasses = {
  error: "text-[#ff7b72]",
  input: "text-[#58a6ff]",
  output: "text-[#e6edf3]",
  system: "text-[#a5d6ff]",
};

function TerminalOutput({ output }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const scrollToBottom = () => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  useEffect(() => {
    const contentNode = contentRef.current;
    if (!contentNode) {
      return;
    }

    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    observer.observe(contentNode, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto bg-[#0d1117] px-4 py-4">
      <div ref={contentRef} className="space-y-2 font-mono text-sm leading-relaxed">
        {output.map((line, index) => (
          <div key={line.id} className={toneClasses[line.tone] ?? toneClasses.output}>
            {line.streaming ? (
              <span className="inline-flex items-center gap-2">
                <span>...</span>
                <BlinkingDots />
              </span>
            ) : (
              <TypewriterText
                text={line.text}
                preserveWhitespace={line.preserveWhitespace}
                speed={18}
                startDelay={Math.min(index * 18, 140)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TerminalOutput;
