export const services = [
  {
    id: "product-development",
    number: "01",
    title: "Product development",
    summary: "Turn ideas into production-ready products.",
    description:
      "We help teams go from concept to a product people can use — with architecture that can grow, not a prototype that has to be rewritten.",
    examples: [
      "SaaS products",
      "MVPs",
      "Web applications",
      "Mobile applications",
      "Customer portals",
    ],
  },
  {
    id: "business-software",
    number: "02",
    title: "Business software",
    summary: "Replace manual processes with software designed around the business.",
    description:
      "Internal tools should reduce operational load, not add another system to manage. We design platforms around how the business actually works.",
    examples: [
      "Internal platforms",
      "Workflow systems",
      "Dashboards",
      "Business automation",
      "Management systems",
    ],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & automation",
    summary: "Apply AI where it creates meaningful business value.",
    description:
      "We use AI when it improves a real workflow — retrieval, document intelligence, assisted operations — not as decoration on an otherwise ordinary product.",
    examples: [
      "AI applications",
      "LLM integrations",
      "RAG systems",
      "Document intelligence",
      "AI-assisted workflows",
      "Intelligent automation",
    ],
  },
  {
    id: "modernization",
    number: "04",
    title: "Modernization & engineering",
    summary: "Improve and scale existing software.",
    description:
      "When a system is valuable but fragile, we strengthen the foundation: APIs, data, performance, cloud, and the integrations that hold operations together.",
    examples: [
      "Legacy modernization",
      "API development",
      "Database optimization",
      "Cloud migration",
      "Performance engineering",
      "Third-party integrations",
    ],
  },
] as const;
