import { useState, useEffect } from "react";
import { resume } from "../../data/resume";
import useActiveSection from "../../hooks/useActiveSection";

function TypingLogo() {
  const full = ">_ SUMAN";
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setCharIndex((i) => (i >= full.length ? 0 : i + 1)),
      charIndex >= full.length ? 2000 : 250,
    );
    return () => clearTimeout(timer);
  }, [charIndex]);

  return (
    <span className="font-mono">
      <span>{full.slice(0, charIndex)}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}


function Navbar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <a href="#hero" className="text-lg font-bold text-gray-100">
          <TypingLogo />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {resume.nav.map((label) => {
            const id = label.toLowerCase();
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-800 text-gray-100"
                    : "text-gray-400 hover:text-gray-100"
                }`}
              >
                {label}
              </a>
            );
          })}

          <a
            href={resume.person.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-gray-100"
          >
            Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-800 bg-gray-950 px-6 pb-4 pt-2 md:hidden">
          {resume.nav.map((label) => {
            const id = label.toLowerCase();
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-800 text-gray-100"
                    : "text-gray-400 hover:text-gray-100"
                }`}
              >
                {label}
              </a>
            );
          })}
          <a
            href={resume.person.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
