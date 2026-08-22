/** GitHub Pages serves the site from a sub-path; local dev serves from root. */
const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const profile = {
  name: "Harsh Sanwal",
  role: "Data & ML",
  roleSub: "Signal & Story",
  tagline:
    "a patient process of turning messy data into forecasts, root causes, and decisions people actually trust.",
  location: "Delhi, India",
  email: "sanwalmaillink@gmail.com",
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
  title: "D-MAIDS",
  kicker: "Currently cooking ☺︎",
  lead: "Designing a defence-oriented multi-agent system called",
  body: "Ten domain-specialist agents that coordinate through structured prompting, with a human-in-the-loop review gate at every hand-off. Draft in progress.",
  footnote: "Also: joining DRDO Hyderabad as an incoming AI Research Intern. ✈️",
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
    id: "futurescape",
    name: "FutureScape",
    blurb: "Time-series forecasting & scenario analysis platform",
    year: "2025",
    stack: ["Python", "FastAPI", "Redis", "Kafka", "Neo4j"],
    points: [
      "Prediction, Scenario Generator, Simulation and Optimization engines for multi-domain future analysis.",
      "FastAPI services generating 20 probabilistic scenarios at 68% / 95% confidence intervals.",
      "Neo4j knowledge graphs carrying the explainability trail behind every scenario.",
      "PoC validated on urban water and traffic datasets; Monte Carlo scaling with agent simulation.",
    ],
    glyph: "◴",
    tint: "var(--sky)",
  },
  {
    id: "supply-chain",
    name: "Disruption Radar",
    blurb: "Supply chain anomaly detection & root cause analysis",
    year: "2025",
    stack: ["Python", "TensorFlow", "PostgreSQL", "ETL", "Power BI"],
    points: [
      "Unified 4 siloed datasets into one PostgreSQL schema with 20+ engineered KPIs.",
      "LSTM anomaly detection with correlation-drift monitoring and statistical process control → 60% faster detection.",
      "Power BI root-cause dashboard with drill-down → 40% faster diagnosis for supplier escalation and rerouting.",
    ],
    glyph: "◩",
    tint: "var(--brick)",
  },
  {
    id: "incident-ops",
    name: "Incident Ops",
    blurb: "Automated incident analytics at Garvish Marketing",
    year: "2024–2026",
    stack: ["SQL", "Python", "ServiceNow API", "Node.js"],
    points: [
      "Automated incident analysis through the ServiceNow API → 20% fewer repeat incidents, 30% of the workflow automated.",
      "Python ETL pipeline feeding a 5-KPI Power BI dashboard: SLA, volume, resolution time, first-contact rate, MTTR.",
      "40% faster reporting, built alongside the operations and UI/UX teams.",
    ],
    glyph: "◑",
    tint: "var(--moss)",
  },
  {
    id: "dmaids",
    name: "D-MAIDS",
    blurb: "Ten-agent defence research system — in progress",
    year: "2026",
    stack: ["LangGraph", "RAG", "LLM Evaluation"],
    points: [
      "Domain-specialist agents coordinating via structured prompting.",
      "Human-in-the-loop review at every hand-off, with evaluation harnesses per agent.",
    ],
    glyph: "✳",
    tint: "var(--sun)",
    link: {
      label: "read the working draft",
      href: "https://drive.google.com/file/d/1Xp-c0TxsScZgyIhCaunyYanoxi8iJRnj/view?usp=sharing",
    },
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
    meta: "BITS Pilani | 2026–2028",
    body: "Heading back to school for the statistics-heavy half of machine learning, while working.",
    rotate: -2.2,
    pin: "var(--brick)",
  },
  {
    title: "B.Sc. Physics",
    meta: "Panjab University | 2023",
    body: "Where the habit started: measure carefully, then argue with your own error bars.",
    rotate: 1.6,
    pin: "var(--sky)",
  },
  {
    title: "Anthropic Academy",
    meta: "Certified | Claude API, Claude Code, MCP",
    body: "Prompt engineering, AI agents, evaluation and safety — the working toolkit behind the agent projects.",
    rotate: -1.1,
    pin: "var(--sun)",
  },
  {
    title: "Oracle OCI",
    meta: "AI Foundations + Agentic AI | 2026",
    body: "Cloud-side fundamentals, plus HarvardX CS50 and a long trail of Python, DSA and GenAI coursework.",
    rotate: 2.4,
    pin: "var(--moss)",
  },
  {
    title: "Officer Selection — Army & IAF",
    meta: "Cleared, multiple attempts",
    body: "Five days of leadership, group tasks and decisions under pressure. It taught me more about teams than any course.",
    rotate: -2.8,
    pin: "var(--brick)",
  },
];

export const toolkit: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "JavaScript", "Node.js"],
  },
  {
    label: "Analytics",
    items: [
      "Statistical Analysis",
      "EDA",
      "Forecasting",
      "Predictive Analytics",
      "RCA",
      "Trend Analysis",
      "Data Modeling",
      "Data Quality",
      "Data Governance",
    ],
  },
  {
    label: "ML & AI",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "LangGraph",
      "RAG",
      "AI Agents",
      "ARIMA",
      "Anomaly Detection",
      "LLM Evaluation",
    ],
  },
  {
    label: "BI",
    items: ["Power BI", "DAX", "Power Query", "Tableau", "KPI Dashboards"],
  },
  {
    label: "Data Engineering",
    items: ["PostgreSQL", "Neo4j", "ETL / ELT", "Data Warehousing", "FastAPI", "REST APIs"],
  },
  {
    label: "Cloud & Tools",
    items: ["AWS", "GCP", "Docker", "Git", "CI/CD", "ServiceNow", "Salesforce", "Microsoft 365"],
  },
];

export const about = [
  "I’m a data analyst and ML engineer who likes the unglamorous middle of the problem — the joins that don’t line up, the KPI nobody defined, the anomaly that turns out to be a sensor.",
  "Most of my work lives between analytics and applied AI: forecasting pipelines, anomaly detection, knowledge graphs for explainability, and multi-agent systems with a human kept firmly in the loop.",
  "Physics undergrad at Panjab University, currently working as a Product & Data Analyst, starting an M.Sc. in Data Science & AI at BITS Pilani, and joining DRDO Hyderabad as an AI research intern.",
  "I build things that make an answer defensible, not just impressive.",
];
