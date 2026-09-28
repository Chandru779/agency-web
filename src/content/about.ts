import { site } from "@/lib/site";

const { founder, coFounder, headOfEngineering } = site;

export const people = [
  {
    id: "founder",
    role: "Founder",
    name: founder.name,
    tenure: `${founder.codingYears}+ years coding · ${founder.engineeringYears}+ years engineering`,
    body: "Experience across software engineering, product development, and complex technical systems — GIS, real estate, fintech, and SaaS — from early-stage startups to large-scale production applications. He leads technical direction, product thinking, architecture, and engineering standards, starting from the problem and building the system around it.",
  },
  {
    id: "co-founder",
    role: "Co-founder",
    name: null,
    tenure: `${coFounder.codingYears}+ years coding · ${coFounder.engineeringYears}+ years engineering`,
    body: "Deep engineering experience across e-commerce, banking, multi-cloud systems, and large-scale applications. He contributes to technical strategy, engineering decisions, product development, and systems that are designed to evolve with the business.",
  },
  {
    id: "head-of-engineering",
    role: "Head of Engineering",
    name: null,
    tenure: `${headOfEngineering.techYears}+ years in technology`,
    body: `Previously at ${headOfEngineering.previously.join(", ")}, with experience across product companies and large-scale production systems. He leads engineering execution and helps turn ambitious product ideas into systems that are ready to run.`,
  },
] as const;

export const aiPractice = [
  "Research and technical exploration",
  "Prototyping",
  "Development",
  "Testing",
  "Code review",
  "Documentation",
  "Debugging",
  "Developer productivity",
  "Product experimentation",
] as const;

export const nextWork = [
  "AI-powered products",
  "Intelligent business applications",
  "Automation that removes real operational work",
  "Modern software built around existing business systems",
  "Scalable platforms designed to evolve",
] as const;

export const aboutPhilosophy = [
  {
    title: "Build with purpose",
    description: "We start with the problem, not the technology.",
  },
  {
    title: "Engineer for the future",
    description:
      "We build systems that can evolve, rather than becoming technical debt from day one.",
  },
  {
    title: "Use AI intelligently",
    description: "AI gives us leverage. Engineering judgment gives it direction.",
  },
  {
    title: "Stay curious",
    description:
      "Technology changes quickly. Great engineers keep learning, experimenting, and building.",
  },
  {
    title: "Keep it real",
    description:
      "No unnecessary complexity, and no technology for its own sake. Generated code is not engineering until someone is accountable for it.",
  },
] as const;
