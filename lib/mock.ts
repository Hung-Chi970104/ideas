import { Doc } from "@/convex/_generated/dataModel"

export interface IdeaScore {
  fit: number
  trend: number
  feasible: number
  niche: number
}

export interface Citation {
  title: string
  url: string
  snippet: string
}

export type MockIdea = Doc<"ideas">


export interface RoadmapWeek {
  week: number
  goal: string
  tasks: string[]
  acceptance: string[]
  links: string[]
  ship: string
}

export interface MockRoadmap {
  id: string
  ideaTitle: string
  weeks: RoadmapWeek[]
}

// export const mockIdeas: MockIdea[] = [
//   {
//     id: "1",
//     title: "AI-Powered Code Review Assistant",
//     who: "Software development teams at startups and mid-size companies",
//     pain: "Manual code reviews are time-consuming, inconsistent, and often miss subtle bugs or security vulnerabilities",
//     whyNow:
//       "AI models have reached sufficient sophistication to understand code context, and remote work has made async code review more critical",
//     tinyScope:
//       "A GitHub app that automatically reviews pull requests and suggests improvements for JavaScript/TypeScript projects",
//     techStack: ["Next.js", "OpenAI API", "GitHub API", "PostgreSQL", "Vercel"],
//     scores: { fit: 9, trend: 8, feasible: 7, niche: 6 },
//     citations: [
//       {
//         title: "The State of Code Review 2024",
//         url: "https://example.com/code-review-report",
//         snippet: "87% of developers report spending too much time on manual code reviews",
//       },
//     ],
//   },
//   {
//     id: "2",
//     title: "Micro-SaaS Analytics Dashboard",
//     who: "Solo entrepreneurs and small SaaS founders",
//     pain: "Google Analytics is overkill and expensive tools like Mixpanel are too complex for simple SaaS metrics",
//     whyNow: "Privacy-first analytics are trending, and micro-SaaS businesses need simple, affordable solutions",
//     tinyScope: "A simple dashboard that tracks key SaaS metrics (MRR, churn, signups) with one-line integration",
//     techStack: ["React", "Node.js", "ClickHouse", "Stripe API", "Tailwind"],
//     scores: { fit: 8, trend: 7, feasible: 9, niche: 8 },
//     citations: [
//       {
//         title: "Micro-SaaS Market Growth",
//         url: "https://example.com/micro-saas-growth",
//         snippet: "Micro-SaaS market expected to grow 23% annually through 2027",
//       },
//     ],
//   },
//   {
//     id: "3",
//     title: "AI Meeting Note Summarizer",
//     who: "Remote teams and consultants who attend multiple client meetings daily",
//     pain: "Taking comprehensive meeting notes while actively participating is difficult, and important action items get lost",
//     whyNow: "Meeting fatigue is at an all-time high, and AI transcription has become highly accurate",
//     tinyScope: "A Zoom/Meet plugin that records, transcribes, and generates action items with assignees",
//     techStack: ["Python", "OpenAI Whisper", "GPT-4", "Zoom SDK", "FastAPI"],
//     scores: { fit: 7, trend: 9, feasible: 6, niche: 7 },
//     citations: [
//       {
//         title: "Remote Work Meeting Statistics",
//         url: "https://example.com/meeting-stats",
//         snippet: "Average knowledge worker spends 23 hours per week in meetings",
//       },
//     ],
//   },
//   {
//     id: "4",
//     title: "No-Code API Builder",
//     who: "Non-technical founders and small businesses needing simple APIs",
//     pain: "Creating basic APIs requires technical knowledge, but many business workflows just need simple data endpoints",
//     whyNow: "No-code movement is mainstream, and businesses increasingly need API integrations",
//     tinyScope: "Visual interface to create REST APIs from spreadsheet data with authentication and rate limiting",
//     techStack: ["Vue.js", "Express.js", "MongoDB", "JWT", "Heroku"],
//     scores: { fit: 6, trend: 8, feasible: 8, niche: 9 },
//     citations: [
//       {
//         title: "No-Code Market Analysis",
//         url: "https://example.com/nocode-market",
//         snippet: "No-code platforms market size expected to reach $65B by 2027",
//       },
//     ],
//   },
//   {
//     id: "5",
//     title: "Local Business Review Responder",
//     who: "Small local businesses (restaurants, salons, repair shops) with limited marketing resources",
//     pain: "Responding to Google/Yelp reviews is time-consuming but critical for reputation management",
//     whyNow: "Online reviews heavily influence local business success, and AI can now generate contextual responses",
//     tinyScope: "Dashboard that monitors reviews across platforms and suggests personalized response templates",
//     techStack: ["React", "Google My Business API", "Yelp API", "OpenAI", "Supabase"],
//     scores: { fit: 8, trend: 6, feasible: 7, niche: 8 },
//     citations: [
//       {
//         title: "Local Business Review Impact Study",
//         url: "https://example.com/review-impact",
//         snippet: "90% of consumers read online reviews before visiting local businesses",
//       },
//     ],
//   },
//   {
//     id: "6",
//     title: "Freelancer Time Tracking with Smart Categorization",
//     who: "Freelancers and consultants juggling multiple clients and projects",
//     pain: "Manual time tracking is tedious and often inaccurate, leading to lost billable hours",
//     whyNow: "Remote work has made time tracking more important, and AI can now categorize activities automatically",
//     tinyScope:
//       "Desktop app that tracks active applications and websites, automatically categorizing time by client/project",
//     techStack: ["Electron", "Python", "SQLite", "Machine Learning", "Stripe"],
//     scores: { fit: 9, trend: 5, feasible: 6, niche: 7 },
//     citations: [
//       {
//         title: "Freelancer Productivity Report",
//         url: "https://example.com/freelancer-productivity",
//         snippet: "Freelancers lose average of 2.5 hours per week to poor time tracking",
//       },
//     ],
//   },
//   {
//     id: "7",
//     title: "Social Media Content Repurposer",
//     who: "Content creators and small marketing teams creating content across multiple platforms",
//     pain: "Adapting content for different social platforms (Twitter, LinkedIn, Instagram) is repetitive and time-consuming",
//     whyNow:
//       "Multi-platform presence is essential for reach, and AI can now understand platform-specific content styles",
//     tinyScope: "Tool that takes one piece of content and automatically reformats it for different social platforms",
//     techStack: ["Next.js", "OpenAI GPT-4", "Social Media APIs", "Redis", "Vercel"],
//     scores: { fit: 7, trend: 8, feasible: 8, niche: 6 },
//     citations: [
//       {
//         title: "Social Media Marketing Trends",
//         url: "https://example.com/social-trends",
//         snippet: "Brands using 3+ social platforms see 287% higher engagement rates",
//       },
//     ],
//   },
//   {
//     id: "8",
//     title: "Email Newsletter A/B Testing Tool",
//     who: "Newsletter creators and email marketers at small to medium businesses",
//     pain: "Most email tools have basic A/B testing, but lack sophisticated analysis of what elements actually drive engagement",
//     whyNow: "Email marketing ROI is still highest among digital channels, and creators need better optimization tools",
//     tinyScope: "Tool that tests subject lines, send times, and content variations with detailed performance analytics",
//     techStack: ["React", "Node.js", "Mailgun API", "PostgreSQL", "Chart.js"],
//     scores: { fit: 6, trend: 7, feasible: 9, niche: 8 },
//     citations: [
//       {
//         title: "Email Marketing ROI Statistics",
//         url: "https://example.com/email-roi",
//         snippet: "Email marketing generates $42 for every $1 spent on average",
//       },
//     ],
//   },
//   {
//     id: "9",
//     title: "AI-Powered Customer Support Ticket Prioritizer",
//     who: "Small SaaS companies and e-commerce businesses with growing support volumes",
//     pain: "Support tickets pile up and it's hard to identify which ones need immediate attention vs. can wait",
//     whyNow:
//       "Customer expectations for fast support are higher than ever, and AI can now understand context and urgency",
//     tinyScope: "Integration with existing support tools that automatically scores and prioritizes incoming tickets",
//     techStack: ["Python", "FastAPI", "OpenAI", "Zendesk API", "PostgreSQL"],
//     scores: { fit: 8, trend: 7, feasible: 7, niche: 7 },
//     citations: [
//       {
//         title: "Customer Support Response Time Study",
//         url: "https://example.com/support-response",
//         snippet: "Companies that respond to support requests within 1 hour are 7x more likely to qualify leads",
//       },
//     ],
//   },
//   {
//     id: "10",
//     title: "Subscription Cancellation Flow Optimizer",
//     who: "SaaS companies experiencing high churn rates",
//     pain: "Most cancellation flows are generic and don't address specific reasons why customers are leaving",
//     whyNow: "Subscription fatigue is real, and companies need smarter retention strategies beyond just discounts",
//     tinyScope:
//       "Embeddable widget that presents personalized retention offers based on cancellation reason and usage patterns",
//     techStack: ["React", "TypeScript", "Stripe API", "Machine Learning", "AWS Lambda"],
//     scores: { fit: 9, trend: 6, feasible: 6, niche: 9 },
//     citations: [
//       {
//         title: "SaaS Churn Rate Analysis",
//         url: "https://example.com/churn-analysis",
//         snippet: "Average SaaS churn rate is 5-7% monthly, costing companies millions in lost revenue",
//       },
//     ],
//   },
// ]

// export function mockRoadmap(ideaId: string): MockRoadmap {
//   const idea = mockIdeas.find((i) => i.id === ideaId)
//   const ideaTitle = idea?.title || "Unknown Idea"

//   return {
//     id: ideaId,
//     ideaTitle,
//     weeks: [
//       {
//         week: 1,
//         goal: "Market Research & Validation",
//         tasks: [
//           "Survey 50 potential users about current pain points",
//           "Analyze 5 competitor solutions and pricing",
//           "Create user persona profiles",
//           "Define core value proposition",
//         ],
//         acceptance: [
//           "Clear understanding of target market size",
//           "Validated problem-solution fit",
//           "Competitive landscape mapped",
//         ],
//         links: ["User survey results", "Competitor analysis doc"],
//         ship: "Market research report with validated assumptions",
//       },
//       {
//         week: 2,
//         goal: "MVP Design & Planning",
//         tasks: [
//           "Create wireframes for core user flows",
//           "Design system and brand identity",
//           "Technical architecture planning",
//           "Set up development environment",
//         ],
//         acceptance: ["Complete user flow wireframes", "Technical stack decided", "Development environment ready"],
//         links: ["Figma wireframes", "Technical architecture doc"],
//         ship: "MVP design mockups and technical plan",
//       },
//       {
//         week: 3,
//         goal: "Core Feature Development",
//         tasks: [
//           "Build user authentication system",
//           "Implement main feature functionality",
//           "Create basic UI components",
//           "Set up database schema",
//         ],
//         acceptance: ["Users can sign up and log in", "Core feature works end-to-end", "Data persistence implemented"],
//         links: ["GitHub repository", "Development deployment"],
//         ship: "Working MVP with core functionality",
//       },
//       {
//         week: 4,
//         goal: "Testing & Refinement",
//         tasks: [
//           "User testing with 10 beta users",
//           "Bug fixes and performance optimization",
//           "Analytics implementation",
//           "Payment integration setup",
//         ],
//         acceptance: ["Major bugs resolved", "User feedback incorporated", "Analytics tracking implemented"],
//         links: ["User testing feedback", "Bug tracking board"],
//         ship: "Polished MVP ready for launch",
//       },
//       {
//         week: 5,
//         goal: "Launch Preparation",
//         tasks: [
//           "Create landing page and marketing site",
//           "Set up customer support system",
//           "Prepare launch content and social media",
//           "Final security and performance review",
//         ],
//         acceptance: ["Marketing site live", "Support system operational", "Launch content ready"],
//         links: ["Marketing site", "Launch checklist"],
//         ship: "Complete launch-ready product and marketing materials",
//       },
//       {
//         week: 6,
//         goal: "Launch & Initial Growth",
//         tasks: [
//           "Public launch and announcement",
//           "Monitor metrics and user feedback",
//           "Customer acquisition campaigns",
//           "Iterate based on early user data",
//         ],
//         acceptance: ["Product successfully launched", "Initial users acquired", "Feedback loop established"],
//         links: ["Launch announcement", "Analytics dashboard"],
//         ship: "Live product with initial user base and growth plan",
//       },
//     ],
//   }
// }
