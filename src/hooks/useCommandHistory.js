import { useState } from "react";

function useCommandHistory() {
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(-1);

  const pushHistory = (command) => {
    if (!command.trim()) {
      return;
    }

    setHistory((current) => [...current, command]);
    setIndex(-1);
  };

  const cycleUp = () => {
    if (!history.length) {
      return null;
    }

    const nextIndex = index === -1 ? history.length - 1 : Math.max(0, index - 1);
    setIndex(nextIndex);
    return history[nextIndex];
  };

  const cycleDown = () => {
    if (!history.length) {
      return null;
    }

    if (index <= 0) {
      setIndex(-1);
      return "";
    }

    const nextIndex = Math.min(history.length - 1, index + 1);
    setIndex(nextIndex);
    return history[nextIndex];
  };

  return {
    cycleDown,
    cycleUp,
    history,
    pushHistory,
  };
}

export default useCommandHistory;
