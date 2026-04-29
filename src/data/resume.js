import resumePdf from "../assets/Suman_Yadav_Resume.pdf";
import profileImage from "../assets/suman.jpeg";
import logoImage from "../assets/logo.jpeg";

export const resume = {
  terminal: {
    prompt: "visitor@suman:~$",
    launcherLabel: "Terminal",
    bootLines: [
      "🖥️ Click on terminal and enter 'help' to find out commands.",
    ],
    backMessage: "Returned to the previous section.",
    homeFallbackMessage: "Already at the root section.",
    sudoError: "Permission denied: nice try.",
    llmUnavailable: "LLM endpoint is unavailable. Set VITE_TERMINAL_LLM_URL to enable natural language answers.",
    loadingProject: "Loading project data from GitHub...",
  },
  github: {
    username: "Ydv-Suman",
    pinnedRepos: ["Lernix", "TrustAI", "DriftGuard", "Heart-Disease-Project", "Sarcasm-Detector"],
    fallbackDescription: "Exploring data, ML, and product craftsmanship.",
    repoError: "GitHub data is temporarily unavailable. Please try again later.",
  },
  person: {
    name: "Suman Yadav",
    role: "Data · Machine Learning · Web",
    availability: "Available for opportunity",
    location: "Monroe, LA",
    university: "UL Monroe",
    status: "Open to work",
    profileImage,
    logoImage,
    socialLinks: [
      { icon: "github", label: "GitHub", href: "https://github.com/Ydv-Suman" },
      { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/suman-ydv" },
      { icon: "instagram", label: "Instagram", href: "https://instagram.com/ydv___suman" },
      { icon: "facebook", label: "Facebook", href: "https://facebook.com/ydv.smn" },
    ],
  },
  home: {
    eyebrow: "Data · Machine Learning · Web",
    headingPrefix: "Hi, I'm",
    headingAccent: "Suman Yadav",
    summary:
      "I explore the edge between intelligent systems and polished user experiences. From predictive models to production-ready frontends, every project balances research rigor with design clarity.",
    primaryAction: {
      label: "View my work",
      command: "projects",
    },
    secondaryAction: {
      label: "Resume",
      href: resumePdf,
      download: true,
    },
    followLabel: "Follow me",
    badges: [
      { label: "Based in", value: "Monroe, LA", tone: "light" },
      { label: "Studying at", value: "UL Monroe", tone: "light" },
      { label: "Status", value: "Open to work", tone: "accent" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Curiosity-powered builder",
    bio: [
      "Hello! I'm Suman Yadav, a tech enthusiast from Monroe, Louisiana currently pursuing a Bachelor's in Computer Science at the University of Louisiana.",
      "My work spans responsive React + Tailwind experiences, FastAPI services, and data science projects powered by Python, Pandas, and Scikit-learn. Every build blends thoughtful UX with measurable results.",
      "I thrive at the intersection of experimentation and delivery — crafting solutions that are practical, scalable, and grounded in user needs.",
    ],
    highlights: [
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
    ],
    cta: {
      eyebrow: "Open to work",
      title: "Let's build something amazing",
      body: "Internships, freelance, research — I'm all ears.",
      command: "contact",
      actionLabel: "Get in touch →",
    },
  },
  skills: {
    eyebrow: "Capabilities",
    title: "A balanced, end-to-end toolkit",
    groups: [
      {
        emoji: "🔤",
        title: "Languages",
        items: ["Python", "Java", "JavaScript"],
      },
      {
        emoji: "🧠",
        title: "ML & Data Science",
        items: ["Scikit Learn", "TensorFlow", "PyTorch", "RAG", "Numpy", "Pandas", "Matplotlib", "Seaborn"],
      },
      {
        emoji: "🌐",
        title: "Web & Mobile",
        items: ["React", "React Native", "Tailwind CSS", "HTML", "CSS"],
      },
      {
        emoji: "🗄️",
        title: "Backend & Database",
        items: ["Django", "FastAPI", "MySQL", "PostgreSQL"],
      },
      {
        emoji: "⚙️",
        title: "Tools & Workflow",
        items: ["Jupyter Notebook", "Google Colab", "Git", "GitHub", "Cursor", "VS Code"],
      },
    ],
  },
  experience: {
    eyebrow: "Journey",
    title: "Experience & long-form learning",
    items: [
      {
        period: "April 2026",
        title: "Hawkathon 2026 — Finalist",
        org: "Litmus · Python, FastAPI, React, PostgreSQL, AWS S3",
        details: "Built a candidate evaluation pipeline with resume parsing, multi-source verification, and proctored assessments. Detects inflated profiles via GitHub/LinkedIn activity checks. Full-stack system with structured scoring and HR-facing insights.",
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
        period: "2024 — Present",
        title: "Full-Stack Experiments",
        org: "Personal & Client Work",
        details: "Designing responsive React + Tailwind experiences and integrating Python/FastAPI services for real users.",
        dot: "bg-cyan-500",
      },
      {
        period: "2023 — Expected May 2027",
        title: "B.S. Computer Science",
        org: "University of Louisiana at Monroe",
        details: "AI, Data Structures, OOP, DBMS, Operating Systems, Discrete Structures, Calculus, Statistics & Probability.",
        dot: "bg-amber-500",
      },
      {
        period: "May 2023 — Aug 2023",
        title: "Web Developer Intern",
        org: "Startup Realm Technology · Lalitpur, Nepal",
        details: "Built 10+ responsive UI views with HTML, CSS, and JS — 10% engagement lift. Shipped cross-browser components in a 10-member Agile team with Git-based code review.",
        dot: "bg-green-500",
      },
    ],
  },
  projects: {
    eyebrow: "Work",
    title: "My featured projects",
    intro: "A curated selection of pinned repositories showcasing data science, ML, and product intuition.",
    actionLabel: "View on GitHub",
    repoMetaFallback: "Repository metadata is loading.",
    emptyTitle: "No project data available yet.",
    emptyBody: "Try again in a moment while the GitHub repositories finish loading.",
    terminalHintTitle: "Use the terminal to open a project",
    terminalHintBody: "Type open [slug] or cat [slug] in the terminal below.",
    starsSuffix: "stars",
    detailLabels: {
      repository: "Repository",
      lastUpdated: "Last updated",
      stars: "Stars",
      forks: "Forks",
    },
    detailPanel: {
      commandLabel: "back",
      title: "A curated selection of pinned repositories showcasing data science, ML, and product intuition.",
      body: "Repository metadata is loading.",
    },
    items: [
      { slug: "lernix", repo: "Lernix" },
      { slug: "trustai", repo: "TrustAI" },
      { slug: "driftguard", repo: "DriftGuard" },
      { slug: "heart-disease-project", repo: "Heart-Disease-Project" },
      { slug: "sarcasm-detector", repo: "Sarcasm-Detector" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something meaningful",
    intro: "Always interested in data-first products, ML research, and full-stack challenges.",
    details: [
      { icon: "email", label: "Email", value: "sumanydv615@gmail.com", href: "mailto:sumanydv615@gmail.com" },
      { icon: "location", label: "Location", value: "Monroe, Louisiana • Remote friendly" },
      { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/suman-ydv", href: "https://linkedin.com/in/suman-ydv" },
      { icon: "resume", label: "Resume", value: "Download PDF", href: resumePdf },
    ],
    note: "Drop me a message and I'll get back to you within 24 hours. Always happy to discuss data science, ML research, or product ideas. ✉️",
    form: {
      action: "https://formsubmit.co/ajax/sumanydv615@gmail.com",
      success: "Message sent! I'll get back to you within 24 hours.",
      validation: "Please fill every field before sending.",
      activationError: "Email delivery not yet activated. Please email me directly at sumanydv615@gmail.com.",
      fallbackError: "Something went wrong. Please try again or email me directly.",
      submitLabel: "Send message →",
      submittingLabel: "Sending…",
      fields: [
        { id: "name", type: "text", label: "Name", placeholder: "Your full name" },
        { id: "email", type: "email", label: "Email", placeholder: "you@example.com" },
      ],
      messageField: {
        id: "message",
        label: "Message",
        placeholder: "Tell me about the problem you are solving.",
      },
    },
  },
};

export default resume;
