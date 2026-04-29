import { useEffect, useMemo, useState } from "react";

function TypewriterText({
  text,
  as: Component = "p",
  className = "",
  speed = 25,
  startDelay = 0,
  preserveWhitespace = false,
}) {
  const safeText = useMemo(() => text ?? "", [text]);
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let timeoutId = 0;
    let intervalId = 0;

    setVisibleText("");

    timeoutId = window.setTimeout(() => {
      let index = 0;
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleText(safeText.slice(0, index));

        if (index >= safeText.length) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [safeText, speed, startDelay]);

  return (
    <Component className={className} style={preserveWhitespace ? { whiteSpace: "pre-wrap" } : undefined}>
      {visibleText}
    </Component>
  );
}

export default TypewriterText;
