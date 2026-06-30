import resumePdf from "../assets/Yadav_Suman_Resume.pdf";
import profileImage from "../assets/image.png";

import awsCert from "../assets/AWS Certified AI Practitioner certificate.pdf";
import eccCert from "../assets/ECC-DSE-Certificate.pdf";
import aiMlCert from "../assets/AI_ML_DataSscience.pdf";
import fastapiCert from "../assets/FastAPI - The Complete Course 2026 (Beginner + Advanced).pdf";
import djangoCert from "../assets/PythonDjango-PracticalGuide.pdf";

export const resume = {
  person: {
    name: "Suman Yadav",
    role: "Backend · Frontend · AI",
    location: "Monroe, LA",
    university: "University of Louisiana at Monroe",
    email: "sumanydv615@gmail.com",
    profileImage,

    resumePdf,
    socialLinks: [
      { icon: "github", label: "GitHub", href: "https://github.com/Ydv-Suman" },
      { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/suman-ydv" },
      { icon: "instagram", label: "Instagram", href: "https://instagram.com/ydv___suman" },
      { icon: "facebook", label: "Facebook", href: "https://facebook.com/ydv.smn" },
    ],
  },

  nav: ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"],

  hero: {
    headline: "I build reliable backend systems.",
    description:
      "I build backend systems, craft frontend interfaces, and apply AI to real problems. Open to internships and part-time roles.",
    primaryCta: { label: "View Projects", href: "#projects" },
    secondaryCta: { label: "Download Resume", href: resumePdf, download: true },
  },

  about: {
    title: "About me",
    bio: [
      "I'm a Computer Science student at the University of Louisiana at Monroe, focused on backend engineering with Java and Spring Boot. I design APIs, model data, and build systems that scale — currently applying that to Atlas, a mobile-first AI coding agent platform I'm architecting as event-driven Spring Boot microservices.",
      "My path started with data science and machine learning — building predictive models, working with Python, FastAPI, and RAG pipelines, and competing in a hackathon as a finalist. That analytical foundation now shapes how I approach backend architecture: data-driven, testable, and maintainable. I've also built frontend interfaces with React and Tailwind, including during a frontend internship, giving me the range to own a feature end-to-end.",
    ],
    highlights: [],
  },

  skills: {
    title: "Skills",
    groups: [
      {
        title: "Languages",
        items: ["Java", "Python", "JavaScript", "HTML5", "SQL"],
      },
      {
        title: "Backend",
        items: [
          "Spring Boot 3",
          "Spring Security",
          "REST APIs",
          "JWT Authentication",
          "OAuth2",
          "Redis",
          "PostgreSQL",
          "MySQL",
          "Docker",
          "RabbitMQ",
          "Kafka",
        ],
      },
      {
        title: "Frontend",
        items: ["React", "Tailwind CSS", "HTML", "CSS"],
      },
      {
        title: "Cloud & DevOps",
        items: ["Git", "GitHub Actions", "AWS"],
      },
      {
        title: "ML & AI",
        items: ["TensorFlow", "Scikit-learn", "RAG", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
      },
      {
        title: "Computer Science",
        items: ["Data Structures & Algorithms", "System Design", "OOP", "Multithreading", "Database Design"],
      },
    ],
  },

  experience: {
    title: "Experience",
    items: [
      {
        period: "April 2026",
        title: "Hawkathon 2026 — Finalist",
        org: "Litmus",
        tech: ["Python", "FastAPI", "React", "PostgreSQL", "AWS S3"],
        summary:
          "Built a candidate evaluation pipeline with resume parsing, multi-source verification, and proctored assessments.",
        details: [
          "Designed resume parsing pipeline with structured scoring output",
          "Implemented GitHub and LinkedIn activity checks to detect inflated profiles",
          "Built full-stack system with HR-facing insights dashboard",
        ],
      },
      {
        period: "2023 — Expected May 2027",
        title: "B.S. Computer Science",
        org: "University of Louisiana at Monroe",
        tech: [],
        summary:
          "Coursework in AI, Data Structures, OOP, DBMS, Operating Systems, Discrete Structures, Calculus, Statistics & Probability.",
        details: [],
      },
      {
        period: "May 2023 — Aug 2023",
        title: "Web Developer Intern",
        org: "Startup Realm Technology · Lalitpur, Nepal",
        tech: ["HTML", "CSS", "JavaScript", "Git"],
        summary: "Built 10+ responsive UI views in a 10-member Agile team.",
        details: [
          "Shipped cross-browser components with Git-based code review",
          "Achieved 10% engagement lift through responsive design improvements",
          "Participated in sprint planning, daily standups, and retrospectives",
        ],
      },
    ],
  },

  projects: {
    title: "Projects",
    intro: "A selection of repositories showcasing backend, data science, and full-stack work.",
    items: [
      {
        name: "Atlas",
        description: "architected to power a mobile-first AI coding agent platform.",
        stack: ["Springboot", "PostgreSQL", "Docker" ,"Redis"],
        github: "https://github.com/Ydv-Suman/Atlas-backend.git",
      },
      {
        name: "Lernix",
        description: "A learning management platform with course enrollment, progress tracking, and content delivery.",
        stack: ["React", "FastAPI", "PostgreSQL"],
        github: "https://github.com/Ydv-Suman/Lernix",
      },
      {
        name: "TrustAI",
        description: "AI trust and safety evaluation tool for detecting bias and ensuring model reliability.",
        stack: ["Python", "Scikit-learn", "Pandas"],
        github: "https://github.com/Ydv-Suman/TrustAI",
      },
      {
        name: "DriftGuard",
        description: "Model monitoring system that detects data drift and performance degradation in production ML.",
        stack: ["Python", "Pandas", "Matplotlib"],
        github: "https://github.com/Ydv-Suman/DriftGuard",
      },
      {
        name: "Heart-Disease-Project",
        description: "End-to-end classification pipeline predicting heart disease from clinical data.",
        stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
        github: "https://github.com/Ydv-Suman/Heart-Disease-Project",
      },
    ],
  },

  certifications: {
    title: "Certifications",
    items: [
      {
        name: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services",
        date: "2026",
        pdf: awsCert,
      },
      {
        name: "DevSecOps Essentials",
        issuer: "EC-Council",
        date: "2026",
        pdf: eccCert,
      },
      {
        name: "AI, ML & Data Science",
        issuer: "Udemy",
        date: "2025",
        pdf: aiMlCert,
      },
      {
        name: "FastAPI — The Complete Course 2026",
        issuer: "Udemy",
        date: "2025",
        pdf: fastapiCert,
      },
      {
        name: "Python Django — Practical Guide",
        issuer: "Udemy",
        date: "2026",
        pdf: djangoCert,
      },
    ],
  },

  contact: {
    title: "Get in touch",
    intro: "Open to backend engineering roles, internships, and meaningful collaborations.",
    details: [
      { icon: "email", label: "Email", value: "sumanydv615@gmail.com", href: "mailto:sumanydv615@gmail.com" },
      { icon: "phone", label: "Phone", value: "+1 (318) 512-5501", href: "tel:+13185125501" },
      { icon: "location", label: "Location", value: "Monroe, Louisiana" },
      {
        icon: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/suman-ydv",
        href: "https://linkedin.com/in/suman-ydv",
      },
    ],
    form: {
      action: "https://formsubmit.co/ajax/sumanydv615@gmail.com",
      success: "Message sent! I'll get back to you within 24 hours.",
      validation: "Please fill every field before sending.",
      activationError: "Email delivery not yet activated. Please email me directly at sumanydv615@gmail.com.",
      fallbackError: "Something went wrong. Please try again or email me directly.",
      submitLabel: "Send message",
      submittingLabel: "Sending...",
      fields: [
        { id: "name", type: "text", label: "Name", placeholder: "Your full name" },
        { id: "email", type: "email", label: "Email", placeholder: "you@example.com" },
      ],
      messageField: {
        id: "message",
        label: "Message",
        placeholder: "Tell me about the problem you're solving.",
      },
    },
  },
};

export default resume;
