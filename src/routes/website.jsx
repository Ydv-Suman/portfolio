import React, { useEffect, useState } from "react";
import sumanImage from "../assets/suman.jpeg";
import skills from "../skills.json";
import {
  FaInstagram, FaFacebook, FaLinkedin, FaGithub,
  FaJava, FaChartLine, FaCode, FaEnvelope, FaMapMarkerAlt, FaFileDownload,
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiMysql, SiPytorch, SiScikitlearn, SiTensorflow,
  SiNumpy, SiPandas, SiReact, SiTailwindcss, SiHtml5, SiCss3,
  SiJupyter, SiGit, SiGithub, SiGooglecolab,
  SiDjango, SiFastapi, SiPostgresql,
} from "react-icons/si";
import { motion } from "framer-motion";

const GITHUB_USERNAME = "Ydv-Suman";
// Matches current pinned repos — update this list whenever you re-pin on GitHub
const PINNED_REPOS = ["Lernix", "TrustAI", "DriftGuard", "Heart-Disease-Project", "Sarcasm-Detector"];

const NAV_ITEMS = ["home", "skills", "experience", "projects", "about", "contact"];

const SOCIAL_LINKS = [
  { icon: FaGithub,    label: "GitHub",    href: "https://github.com/Ydv-Suman" },
  { icon: FaLinkedin,  label: "LinkedIn",  href: "https://linkedin.com/in/suman-ydv" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/ydv___suman" },
  { icon: FaFacebook,  label: "Facebook",  href: "https://facebook.com/ydv.smn" },
];


const EXPERIENCE_ITEMS = [
  {
    period: "2023 — Present",
    title: "B.S. Computer Science",
    org: "University of Louisiana Monroe",
    details: "Strengthening software engineering, algorithms, and applied statistics with a data science focus.",
    dot: "bg-emerald-600",
  },
  {
    period: "2024 — Present",
    title: "Machine Learning Projects",
    org: "Independent Research",
    details: "Heart disease, bulldozer pricing, sarcasm detection, MNIST, Iris predictor, WeatherPro, and PetVision.",
    dot: "bg-teal-600",
  },
  {
    period: "2022 — Present",
    title: "Full-Stack Experiments",
    org: "Personal & Client Work",
    details: "Designing responsive React + Tailwind experiences and integrating Python/FastAPI services for real users.",
    dot: "bg-green-500",
  },
];

const ABOUT_HIGHLIGHTS = [
  {
    emoji: "🚀",
    title: "What drives me",
    body: "Solving real-world problems with data-informed thinking, practical engineering, and relentless curiosity.",
  },
  {
    emoji: "📚",
    title: "Outside the editor",
    body: "Reading about AI ethics, experimenting with public APIs, and tackling online coding challenges.",
  },
  {
    emoji: "🤝",
    title: "Opportunities",
    body: "Open to internships, freelance collaborations, and research-driven product teams.",
  },
];

const CONTACT_DETAILS = [
  { icon: FaEnvelope,      label: "Email",    value: "sumanydv615@gmail.com",         href: "mailto:sumanydv615@gmail.com" },
  { icon: FaMapMarkerAlt,  label: "Location", value: "Monroe, Louisiana • Remote friendly" },
  { icon: FaLinkedin,      label: "LinkedIn", value: "linkedin.com/in/suman-ydv",     href: "https://linkedin.com/in/suman-ydv" },
  { icon: FaFileDownload,  label: "Resume",   value: "Download PDF",                  href: "/Yadav_Suman_Resume.pdf" },
];

const SKILL_ICONS = {
  Python:             SiPython,
  Java:               FaJava,
  JavaScript:         SiJavascript,
  MySQL:              SiMysql,
  PyTorch:            SiPytorch,
  "Scikit Learn":     SiScikitlearn,
  TensorFlow:         SiTensorflow,
  Numpy:              SiNumpy,
  Pandas:             SiPandas,
  Matplotlib:         FaChartLine,
  Seaborn:            FaChartLine,
  RAG:                FaChartLine,
  Django:             SiDjango,
  FastAPI:            SiFastapi,
  MySQL:              SiMysql,
  PostgreSQL:         SiPostgresql,
  React:              SiReact,
  "React Native":     SiReact,
  "Tailwind CSS":     SiTailwindcss,
  HTML:               SiHtml5,
  CSS:                SiCss3,
  "Jupyter Notebook": SiJupyter,
  Git:                SiGit,
  GitHub:             SiGithub,
  "Google Colab":     SiGooglecolab,
  Cursor:             FaCode,
  "VS Code":          FaCode,
};

const LANG_COLORS = {
  Python:             "#3572A5",
  JavaScript:         "#f1e05a",
  TypeScript:         "#2b7489",
  "Jupyter Notebook": "#DA5B0B",
  HTML:               "#e34c26",
  CSS:                "#563d7c",
  Java:               "#b07219",
};
const DEFAULT_LANG_COLOR = "#8b5cf6";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const M = {
  div: motion.div,
  li:  motion.li,
  h1:  motion.h1,
  p:   motion.p,
};

// ── Component ────────────────────────────────────────────────────────────────
function Website() {
  const [repos, setRepos]             = useState([]);
  const [loadingRepos, setLoading]    = useState(true);
  const [repoError, setRepoError]     = useState("");
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [formData, setFormData]       = useState({ name: "", email: "", message: "" });
  const [status, setStatus]           = useState({ type: "", message: "" });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setRepoError("");
        setLoading(true);

        // Try the public pinned-repos proxy first; fall back to REST API
        let mapped = null;
        try {
          const pr = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`);
          if (pr.ok) {
            const data = await pr.json();
            if (Array.isArray(data) && data.length > 0) {
              mapped = data.map(r => ({
                id:               r.repo,
                name:             r.repo,
                description:      r.description,
                html_url:         `https://github.com/${GITHUB_USERNAME}/${r.repo}`,
                language:         r.language,
                stargazers_count: r.stars ?? 0,
                forks_count:      r.forks ?? 0,
                updated_at:       r.updatedAt ?? new Date().toISOString(),
              }));
            }
          }
        } catch { /* fall through */ }

        if (!mapped) {
          const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
          if (!res.ok) throw new Error("GitHub API request failed");
          const all = await res.json();
          mapped = all
            .filter(r => !r.fork && PINNED_REPOS.includes(r.name))
            .sort((a, b) => PINNED_REPOS.indexOf(a.name) - PINNED_REPOS.indexOf(b.name));
        }

        if (active) setRepos(mapped);
      } catch (err) {
        console.error(err);
        if (active) setRepoError("GitHub data is temporarily unavailable. Please try again later.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill every field before sending." });
      return;
    }
    try {
      setStatus({ type: "", message: "" });
      const res = await fetch("https://formsubmit.co/ajax/sumanydv615@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus({ type: "success", message: "Message sent! Thank you for reaching out." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const skillGroups = [
    { emoji: "🔤", title: "Languages",              items: skills.language             ?? [] },
    { emoji: "🧠", title: "ML & Data Science",      items: skills.MlDataScience        ?? [] },
    { emoji: "🌐", title: "Web & Mobile",           items: skills.WebAndMobile         ?? [] },
    { emoji: "🗄️", title: "Backend & Database",    items: skills.BackendAndDatabase   ?? [] },
    { emoji: "⚙️", title: "Tools & Workflow",       items: skills.tools                ?? [] },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-emerald-100/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-emerald-300/40">
              SY
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-400 uppercase leading-none mb-0.5">Portfolio</p>
              <p className="text-base font-bold text-gray-800 leading-none">Suman Yadav</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={e => scrollTo(e, item)}
                className="px-4 py-2 rounded-full text-base font-medium capitalize text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          <a
            href="mailto:sumanydv615@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-base font-semibold shadow-md shadow-emerald-200/60 hover:shadow-emerald-300/70 hover:-translate-y-0.5 transition-all"
          >
            Let&apos;s talk
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            onClick={() => setIsMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white/95 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-2">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={e => scrollTo(e, item)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium capitalize text-gray-700 text-left hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  {item}
                </button>
              ))}
              <a
                href="mailto:sumanydv615@gmail.com"
                className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold text-center"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section id="home" className="px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-14 items-center lg:grid-cols-2">

            {/* Left: Text */}
            <M.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
              <M.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for internships
                </span>
              </M.div>


              <M.div variants={fadeInUp} className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  Data · Machine Learning · Web
                </p>
                <M.h1 className="text-5xl lg:text-[3.6rem] font-extrabold text-gray-900 leading-[1.1]">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 bg-clip-text text-transparent">
                    Suman Yadav
                  </span>
                </M.h1>
              </M.div>

              <M.p variants={fadeInUp} className="text-lg text-gray-500 leading-relaxed max-w-xl">
                I explore the edge between intelligent systems and polished user experiences.
                From predictive models to production-ready frontends, every project balances
                research rigor with design clarity.
              </M.p>

              <M.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <button
                  onClick={e => scrollTo(e, "projects")}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200/70 hover:shadow-emerald-300/80 hover:-translate-y-0.5 transition-all"
                >
                  View my work
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="/Yadav_Suman_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-gray-600 font-semibold border border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  Resume
                </a>
              </M.div>

              <M.div variants={fadeInUp} className="flex items-center gap-3 pt-1">
                <span className="text-xs uppercase tracking-widest text-gray-400">Follow me</span>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-300 hover:-translate-y-0.5 transition-all shadow-sm"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </M.div>
            </M.div>

            {/* Right: Circular profile image */}
            <M.div initial="hidden" animate="visible" variants={scaleIn} className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative glow blob */}
                <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 blur-3xl opacity-60" />

                {/* Profile circle */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-emerald-200/50">
                  <img
                    src={sumanImage}
                    alt="Suman Yadav"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Location badge */}
                <div className="absolute top-4 -right-4 sm:-right-8 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg shadow-gray-200/60 border border-gray-100">
                  <span className="text-lg">📍</span>
                  <div className="leading-none">
                    <p className="text-[10px] text-gray-400">Based in</p>
                    <p className="text-xs font-bold text-gray-800">Monroe, LA</p>
                  </div>
                </div>

                {/* University badge */}
                <div className="absolute bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl px-3 py-2 shadow-lg shadow-gray-200/60 border border-gray-100 leading-none">
                  <p className="text-[10px] text-gray-400 mb-0.5">Studying at</p>
                  <p className="text-xs font-bold text-gray-800">UL Monroe</p>
                </div>

                {/* Status badge */}
                <div className="absolute bottom-20 -right-4 sm:-right-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl px-3 py-2 shadow-lg leading-none">
                  <p className="text-[10px] text-emerald-200 mb-0.5">Status</p>
                  <p className="text-xs font-bold text-white">Open to work</p>
                </div>
              </div>
            </M.div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────── */}
        <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">Capabilities</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">A balanced, end-to-end toolkit</h2>
            </M.div>

            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-5"
            >
              {skillGroups.map(group => (
                <M.div
                  key={group.title}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60 hover:shadow-[0_8px_28px_rgba(5,150,105,0.1)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{group.emoji}</span>
                    <h3 className="text-xl font-extrabold text-gray-900">{group.title}</h3>
                    <span className="ml-auto text-sm text-gray-400 bg-gray-50 rounded-full px-3 py-0.5 border border-gray-100">
                      {group.items.length} tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => {
                      const Icon = SKILL_ICONS[item];
                      return (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-xl text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-all cursor-default"
                        >
                          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </M.div>
              ))}
            </M.div>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
        <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-center mb-12"
            >
              <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">Journey</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">Experience & long-form learning</h2>
            </M.div>

            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="relative"
            >
              {/* Vertical line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-300 via-teal-200 to-green-200 hidden md:block" />

              <div className="space-y-6">
                {EXPERIENCE_ITEMS.map((item, i) => (
                  <M.li
                    key={item.title}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="relative list-none md:pl-16"
                  >
                    <span className={`absolute left-3.5 top-7 w-5 h-5 rounded-full ${item.dot} border-4 border-white shadow-md hidden md:block`} />
                    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60 hover:shadow-[0_8px_28px_rgba(5,150,105,0.1)] transition-all">
                      <span className="inline-block px-3 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full mb-3">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm font-semibold text-emerald-600 mt-0.5 mb-3">{item.org}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.details}</p>
                    </div>
                  </M.li>
                ))}
              </div>
            </M.div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────── */}
        <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">Work</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">My featured projects</h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                A curated selection of pinned repositories showcasing data science, ML, and product intuition.
              </p>
              {repoError && <p className="mt-3 text-sm text-red-500">{repoError}</p>}
            </M.div>

            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {loadingRepos
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="animate-pulse rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-3">
                      <div className="h-5 w-3/5 rounded-xl bg-gray-100" />
                      <div className="h-3 w-full rounded bg-gray-100" />
                      <div className="h-3 w-4/5 rounded bg-gray-100" />
                      <div className="h-9 w-full rounded-xl bg-gray-100 mt-4" />
                    </div>
                  ))
                : repos.map((repo, i) => {
                    const langColor = LANG_COLORS[repo.language] || DEFAULT_LANG_COLOR;
                    return (
                      <M.div
                        key={repo.id}
                        variants={fadeInUp}
                        transition={{ delay: i * 0.07 }}
                        className="group bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60 hover:shadow-[0_8px_32px_rgba(5,150,105,0.14)] hover:-translate-y-1 transition-all flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                            <FaGithub className="h-5 w-5 text-emerald-600" />
                          </div>
                          {repo.language && (
                            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 mt-1 flex-shrink-0">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
                              {repo.language}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{repo.name}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                          {repo.description || "Exploring data, ML, and product craftsmanship."}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                          <span>
                            {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </span>
                        </div>

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 border border-gray-100 hover:border-transparent text-sm font-semibold text-gray-600 hover:text-white transition-all"
                        >
                          <FaGithub className="h-4 w-4" />
                          View on GitHub
                        </a>
                      </M.div>
                    );
                  })}
            </M.div>

          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">About</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">Curiosity-powered builder</h2>
            </M.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Bio card */}
              <M.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60"
              >
                <p className="text-gray-500 leading-relaxed">
                  Hello! I&apos;m <span className="font-bold text-gray-900">Suman Yadav</span>, a tech enthusiast from
                  Monroe, Louisiana currently pursuing a Bachelor&apos;s in Computer Science at the{" "}
                  <span className="text-emerald-600 font-semibold">University of Louisiana</span>.
                </p>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  My work spans responsive React + Tailwind experiences, FastAPI services, and data science projects
                  powered by Python, Pandas, and Scikit-learn. Every build blends thoughtful UX with measurable results.
                </p>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  I thrive at the intersection of experimentation and delivery — crafting solutions that are practical,
                  scalable, and grounded in user needs.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </M.div>

              {/* Highlights + CTA */}
              <M.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="space-y-4"
              >
                {ABOUT_HIGHLIGHTS.map(item => (
                  <M.div
                    key={item.title}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60 flex gap-4 hover:shadow-[0_8px_28px_rgba(5,150,105,0.1)] transition-all"
                  >
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                    </div>
                  </M.div>
                ))}

                {/* CTA gradient card */}
                <M.div
                  variants={fadeInUp}
                  className="rounded-2xl p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-300/40"
                >
                  <p className="text-sm font-medium text-emerald-200 mb-1">Open to work</p>
                  <h3 className="text-xl font-extrabold mb-2">Let&apos;s build something amazing</h3>
                  <p className="text-sm text-emerald-200 mb-4">Internships, freelance, research — I&apos;m all ears.</p>
                  <button
                    onClick={e => scrollTo(e, "contact")}
                    className="px-5 py-2 bg-white text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all"
                  >
                    Get in touch →
                  </button>
                </M.div>
              </M.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-12">
            <M.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">Contact</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">Let&apos;s build something meaningful</h2>
              <p className="mt-3 text-gray-400">Always interested in data-first products, ML research, and full-stack challenges.</p>
            </M.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact details */}
              <M.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="space-y-4"
              >
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <M.div
                    key={label}
                    variants={fadeInUp}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{value}</p>
                      )}
                    </div>
                  </M.div>
                ))}

                <M.div
                  variants={fadeInUp}
                  className="rounded-2xl p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
                >
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Drop me a message and I&apos;ll get back to you within 24 hours. Always happy to discuss
                    data science, ML research, or product ideas. ✉️
                  </p>
                </M.div>
              </M.div>

              {/* Form */}
              <M.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(5,150,105,0.06)] border border-gray-100/60"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "name",    type: "text",  label: "Name",    placeholder: "Your full name" },
                    { id: "email",   type: "email", label: "Email",   placeholder: "you@example.com" },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        name={f.id}
                        value={formData[f.id]}
                        onChange={handleChange}
                        required
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about the problem you are solving."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md shadow-emerald-200/60 hover:shadow-emerald-300/70 hover:-translate-y-0.5 transition-all"
                  >
                    Send message →
                  </button>
                  {status.message && (
                    <p className={`text-center text-sm font-semibold ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                      {status.message}
                    </p>
                  )}
                </form>
              </M.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Website;
