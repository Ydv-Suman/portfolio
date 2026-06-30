import { useEffect, useState } from "react";

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"];

export default function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
