export const processSteps = [
  {
    number: "01",
    title: "Discover",
    summary: "Understand the business, users, and problem.",
    detail:
      "We start with context: who the software is for, what is failing today, and which constraints actually matter. This is where we separate symptoms from the problem worth solving.",
  },
  {
    number: "02",
    title: "Define",
    summary: "Clarify scope, requirements, and success criteria.",
    detail:
      "We turn discovery into a shared definition of done — what we will build, what we will not, and how we will know the work succeeded. Clear scope is how we keep delivery honest.",
  },
  {
    number: "03",
    title: "Architect",
    summary: "Design the technical and product foundation.",
    detail:
      "We design for the product you need now, with a structure that can absorb change. Architecture, data, and interfaces are decided with tomorrow's growth in mind — without overbuilding today.",
  },
  {
    number: "04",
    title: "Build",
    summary: "Develop, test, and iterate.",
    detail:
      "Implementation is visible: regular progress, working software, and feedback loops. We test as we go so quality is part of delivery, not a phase at the end.",
  },
  {
    number: "05",
    title: "Launch",
    summary: "Deploy and monitor the product.",
    detail:
      "Shipping is not a handoff of unowned code. We deploy with monitoring, operational basics, and a plan for what happens in the first days after users arrive.",
  },
  {
    number: "06",
    title: "Grow",
    summary: "Improve, maintain, and scale.",
    detail:
      "The most valuable software continues after launch. We stay on as an engineering partner to improve, maintain, and extend the system as the business changes.",
  },
] as const;
