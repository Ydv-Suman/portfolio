import { useEffect } from "react";

export default function useTheme() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
}
