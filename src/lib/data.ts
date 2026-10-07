/** GitHub Pages serves the site from a sub-path; local dev serves from root. */
const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const profile = {
  name: "Harsh Sanwal",
  role: "Data Analyst",
  roleSub: "Consumer Product Analytics",
  tagline:
    "turning customer, campaign, and product data into sharper decisions, cleaner reports, and measurable business impact.",
  location: "Delhi, India",
  email: "sanwalharshh@gmail.com",
  phone: "+91 94789 59696",
  github: "https://github.com/sanwalharsh",
  linkedin: "https://linkedin.com/in/sanwalharsh",
  resume: asset("/harsh-sanwal-cv.pdf"),
  draft:
    "https://drive.google.com/file/d/1Xp-c0TxsScZgyIhCaunyYanoxi8iJRnj/view?usp=sharing",
};

/** The record on the desk. Drop the file in public/audio/ and it plays for real. */
export const nowPlaying = {
  title: "Jazz et thé vert",
  artist: "Souleance",
  src: asset("/audio/jazz-et-the-vert.m4a"),
  /** shown until the file reports its real duration */
  fallbackDuration: "3:33",
};

export const cooking = {
  title: "Autonomous Self Learning AI System",
  kicker: "Currently thinking ☺︎",
  lead: "Building a reusable validation-and-review workflow for AI systems across noisy, limited, and shifting data conditions.",
  body: "A practical approach to model reliability: structured validation checks, version tracking, review logs, and rollback-ready governance for analytical changes.",
  footnote: "Also: AI/ML Intern at IIT Bombay and AI Research Intern at DRDO. ✈️",
};

export type Project = {
  id: string;
  name: string;
  blurb: string;
  year: string;
  stack: string[];
  points: string[];
  glyph: string;
  tint: string;
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    id: "self-learning-ai",
    name: "Autonomous Self Learning AI System",
    blurb: "Reusable validation workflows for model review and traceability",
    year: "2026",
    stack: ["Python", "SQL", "Pandas", "Model Validation", "Git", "Jupyter"],
    points: [
      "Designed repeatable data-validation and model-review workflows with manual checks, version tracking, and review logs.",
      "Implemented automated rollback to keep analytical changes traceable and standardized across review cycles.",
      "Built a governance layer that made model validation more consistent, auditable, and easier to operationalize.",
    ],
    glyph: "◴",
    tint: "var(--sky)",
  },
  {
    id: "phys-ai",
    name: "PHYS AI",
    blurb: "Comparative model evaluation & decision support",
    year: "2026",
    stack: ["Python", "PyTorch", "TensorFlow", "Statistics", "Model Evaluation"],
    points: [
      "Compared two neural-network approaches under changing, noisy, limited, and extreme data conditions to assess reliability risk.",
      "Mapped five reliability measures to four review categories to turn complex evidence into crisp review decisions.",
      "Communicated model limitations, metric trade-offs, and recommendations to support evidence-based decisions.",
    ],
    glyph: "◩",
    tint: "var(--brick)",
  },
  {
    id: "garvish-marketing",
    name: "Garvish Marketing Analytics",
    blurb: "KPI reporting and business performance tracking",
    year: "2024–2025",
    stack: ["SQL", "Python", "Power BI", "HubSpot", "ServiceNow", "Excel"],
    points: [
      "Translated business requirements from 10+ clients into tailored analytical reports across 40+ digital properties.",
      "Delivered KPI and management reporting to explain performance trends and inform business decisions.",
      "Integrated website, campaign, and customer data through HubSpot and ServiceNow to support recurring reporting and stakeholder updates.",
    ],
    glyph: "◑",
    tint: "var(--moss)",
  },
  {
    id: "drdo-telemetry",
    name: "DRDO Flight Simulation Analytics",
    blurb: "Telemetry analysis & model validation",
    year: "2026",
    stack: ["Python", "SQL", "Telemetry", "Model Evaluation", "Research Reporting"],
    points: [
      "Led a 5-member team through flight simulation and telemetry analysis, coordinating validation and delivery to achieve 87% initial model accuracy.",
      "Integrated imagery, IoT, and speech data sources into analytical workflows, combining structured and unstructured inputs.",
      "Communicated findings, limitations, and recommendations to research stakeholders to support evidence-based decisions.",
    ],
    glyph: "✳",
    tint: "var(--sun)",
  },
];

export type Card = {
  title: string;
  meta: string;
  body: string;
  rotate: number;
  pin: string;
};

export const other: Card[] = [
  {
    title: "M.Sc. Data Science & AI",
    meta: "BITS Pilani | 2026–2028 | Minor: BFSI",
    body: "Studying data science and AI with a BFSI lens, while building stronger foundations in modeling, analytics, and decision support.",
    rotate: -2.2,
    pin: "var(--brick)",
  },
  {
    title: "B.Sc. Mathematics",
    meta: "Kurukshetra University | 2023",
    body: "Built a quantitative foundation in reasoning, statistical thinking, and structured problem-solving.",
    rotate: 1.6,
    pin: "var(--sky)",
  },
  {
    title: "Quantitative + Financial Modeling",
    meta: "Wharton · Yale · Duke · Imperial · Dartmouth",
    body: "Fundamentals of Quantitative Modeling, Financial Markets, Risk Management and Financial Theory, Mathematics for Machine Learning, and Data Analytics.",
    rotate: -1.1,
    pin: "var(--sun)",
  },
  {
    title: "Leadership & Achievements",
    meta: "Team lead • Sports captain • Selection rounds",
    body: "Led a 5-member DRDO team, represented school and college sports teams, and cleared Army and Air Force selection stages under pressure.",
    rotate: 2.4,
    pin: "var(--moss)",
  },
  {
    title: "Officer Selection — Army & IAF",
    meta: "Cleared, multiple attempts",
    body: "Five days of leadership, group tasks, and decisions under pressure. It taught me as much about teams as any course.",
    rotate: -2.8,
    pin: "var(--brick)",
  },
];

export const toolkit: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "Pandas", "NumPy", "Git", "Jupyter"],
  },
  {
    label: "Reporting",
    items: ["Power BI", "Dashboards", "KPI Reporting", "Excel", "PowerPoint", "Data Visualization"],
  },
  {
    label: "Business Analytics",
    items: [
      "Marketing Analytics",
      "Campaign Analysis",
      "Business Performance Analysis",
      "Requirements Analysis",
      "Customer Data",
      "Multi-Source Integration",
    ],
  },
  {
    label: "AI & Statistics",
    items: [
      "AI/ML",
      "Predictive Modeling",
      "Statistical Analysis",
      "Model Evaluation",
      "Prompt Engineering",
      "Time-Series Analysis",
    ],
  },
  {
    label: "Delivery",
    items: [
      "Cross-Functional Collaboration",
      "Stakeholder Communication",
      "Process Automation",
      "Documentation",
      "Data Validation",
      "Root Cause Analysis",
    ],
  },
];

export const about = [
  "I’m a data analyst with 2+ years of experience translating customer, campaign, and product signals into clear, decision-ready insight.",
  "My work lives at the intersection of analytics and applied AI: KPI reporting, business performance analysis, data validation, predictive modeling, and evaluation workflows built for reliable decisions.",
  "I’m pursuing an M.Sc. in Data Science & AI at BITS Pilani with a BFSI minor, and I’ve worked across digital properties, research teams, and stakeholder environments that demand rigor.",
  "I build systems that make an answer defendable, not just impressive.",
];
