// All portfolio content lives here so it is easy to edit in one place.

export const profile = {
  name: "Bhumika Jain",
  role: "Software Developer",
  tagline:
    "Full-stack engineer building automation-first platforms, DNS/rDNS pipelines, cloud VM migration, and AI/OCR systems with Python, Django, and React.",
  location: "India",
  email: "i.jainbhumika@gmail.com",
  github: "https://github.com/i-Bhumika-Jain",
  githubLabel: "github.com/i-Bhumika-Jain",
  linkedin: "https://linkedin.com/in/bhumika-jain-0749031ba",
  linkedinLabel: "linkedin.com/in/bhumika-jain",
  // Drop a square photo at public/profile.jpg to replace the monogram avatar.
  photo: "/profile.jpg",
  initials: "BJ",
};

export const about = [
  "I'm a Software Developer who likes turning slow, manual, error-prone workflows into fast, validated, automated systems.",
  "At Chi Networks I automated DNS/rDNS operations, built change-request tooling, and worked on cloud VM migration across OpenStack and VMware/vCenter. Before that I built OCR automation and CRM tooling that cut manual data entry sharply.",
  "I work across the stack with Python, Django REST, FastAPI, React, Material UI, and shadcn/ui, with a soft spot for AI/OCR and clean, measurable results.",
];

export const stats = [
  { value: "80%", label: "Manual DNS/rDNS effort removed" },
  { value: "40%", label: "Manual data entry cut with OCR" },
  { value: "9.50", label: "CGPA / 10 - B.E. CSE" },
  { value: "2+", label: "Years building production software" },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Chi Networks India Pvt. Ltd.",
    role: "Software Developer",
    period: "Jun 2025 - Present",
    points: [
      "Automated DNS/rDNS operations by replacing manual zone-file edits and server coordination with validated API flows, BIND integration, provisioning queues, and Python workers, cutting manual effort by an estimated 80%.",
      "Built and optimized Change Request workflows for scheduling, recurring changes, reminders, documents, logs, and filters so internal teams track infrastructure changes faster.",
      "Worked on the MoveVM / VM migration module for OpenStack and VMware/vCenter, adding target-host selection, compatibility indicators, migration flows, and datastore visibility.",
      "Improved admin-platform speed and reliability through query optimization, caching, pagination, log analysis, Postman validation, and CI/CD deployment debugging.",
      "Developed React admin screens with Material UI and shadcn/ui for forms, tables, filters, dashboards, and frontend-backend workflows.",
    ],
  },
  {
    company: "Brane Enterprises Private Limited",
    role: "Software Development Intern",
    period: "Sep 2023 - Aug 2024",
    points: [
      "Solved HRMS expense-entry delays by building OCR automation for receipts, invoices, PDFs, scanned images, forms, and ID documents, reducing manual data entry by 40% across 25 validated edge cases.",
      "Integrated receipt scanning, currency conversion, and rule-based expense checks, cutting calculation effort by 70% and improving rule-based processing efficiency by 30%.",
      "Built CRM, sales dashboard, and project-triage features with React, Node.js, Material UI, charts, summaries, and Postman-tested APIs.",
      "Automated secure data extraction from login-protected sites using Selenium and BeautifulSoup, followed by data cleaning and storage workflows.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "NeuraChat - Conversational AI Assistant",
    blurb:
      "A document Q&A / chat application with a React frontend and Python backend, using LangChain and the Gemini API to process user queries and retrieve document context.",
    tags: ["React", "Python", "LangChain", "Gemini API"],
  },
  {
    title: "OCR System - Text Extraction from Images & PDFs",
    blurb:
      "A Gradio-based OCR testing tool for images and PDFs, covering 25 edge cases and reducing OCR error rate by 40% during A/B evaluation.",
    tags: ["Python", "PaddleOCR", "Gradio"],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["Python", "JavaScript", "SQL"] },
  {
    label: "Backend & Cloud",
    items: [
      "Django REST Framework",
      "FastAPI",
      "REST APIs",
      "RBAC",
      "TOTP",
      "OpenStack",
      "VMware / vCenter",
      "VM Migration",
    ],
  },
  {
    label: "Databases",
    items: [
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "Django ORM",
      "Query Optimization",
      "Caching",
      "Indexing",
    ],
  },
  {
    label: "Frontend",
    items: ["React.js", "HTML", "CSS", "Material UI", "shadcn/ui", "React Charts"],
  },
  { label: "AI / OCR", items: ["PaddleOCR", "Gradio", "LangChain", "Gemini API"] },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Linux", "Jenkins", "Playwright", "Sentry", "CI/CD"],
  },
];

export const education = {
  school: "Chitkara University, Punjab",
  degree: "B.E. in Computer Science and Engineering",
  period: "2020 - 2024",
  detail: "CGPA: 9.50 / 10",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];