export const availableForWork = true;

export const site = {
  name: "Variz",
  title: "Variz — Automation Engineer",
  description:
    "n8n workflows, AI automation & Chrome extensions. Open to work.",
  url: "https://variz.vercel.app",
  email: "variz.auto@gmail.com",
  location: "Chandigarh, India",
  education: "",
  resume: "/resume.pdf",
  bookMeet: "https://cal.com/variz19",
  twitterHandle: "@varizsinghxh",
  footer: "Built with n8n & caffeine ☕",
};

export const frontEnd = [
  "React",
  "Next.js",
  "Shadcn",
  "SCSS",
  "Tailwind",
  "Framer Motion",
  "Recoil",
  "Tanstack Query",
];

export const backEnd = ["Node.js", "Hono.js", "Express.js", "NPM"];

export const services = [
  "Cloudflare Workers",
  "Docker",
  "Appwrite",
  "Supabase",
  "Prisma ORM",
  "Postman",
  "Postgres",
  "MongoDB",
];

export const automation = [
  "n8n",
  "Chrome Extension APIs",
  "Webhooks",
  "REST/GraphQL APIs",
];

export const hero = {
  name: "Variz",
  role: "Automation Engineer",
  tagline:
    "I build systems that run without me. n8n workflows, Chrome extensions, AI automation.",
  bio: "Building n8n workflows, AI pipelines & Chrome extensions that eliminate repetitive work. Open to work.",
  quote: "Why do it manually when you can script it?",
  morphingTexts: ["workflows", "extensions", "AI agents", "pipelines"],
  ctaPrimary: { label: "Catch up", href: "https://cal.com/variz19" },
  ctaSecondary: {
    label: "Resume",
    href: "/resume.pdf",
  },
};

export const projects = [
  {
    category: "Content Automation",
    title: "Timelapse Auto Publisher — Saves 15h/week for creators",
    src: "/assets/nxttp.webp",
    github: "https://github.com/VARIZ19/n8n-automations",
    demo: "https://variz.vercel.app",
    tags: ["n8n", "Groq AI", "Google Drive", "Buffer", "Instagram"],
    problem:
      "Creators spent 15+ hours/week manually uploading timelapses, writing captions, and cross-posting to Instagram and Twitter.",
    solution:
      "GDrive upload triggers Groq AI caption generation via LLM chain, then auto-publishes as Instagram Reel and cross-posts to Twitter via Buffer.",
    result: "Zero manual steps — saves 15h/week for content creators.",
  },
  {
    category: "DevOps Automation",
    title: "GDrive → Deploy → LinkedIn — Full pipeline, zero manual steps",
    src: "/assets/project1.png",
    github: "https://github.com/VARIZ19/n8n-automations",
    demo: "https://variz.vercel.app",
    tags: ["n8n", "GitHub", "Vercel", "Groq AI", "LinkedIn"],
    problem:
      "Getting from a local file to a live site and a LinkedIn post meant manual commits, deploys, and copywriting every time.",
    solution:
      "File save triggers GitHub commit, Vercel deploy, Groq AI LinkedIn post generation, and auto-publish.",
    result: "From local file to live site to social — completely hands-free.",
  },
  {
    category: "Personal Branding",
    title: "GitHub → LinkedIn Bot — Every commit = passive LinkedIn post",
    src: "/assets/project2.png",
    github: "https://github.com/VARIZ19/n8n-automations",
    demo: "https://variz.vercel.app",
    tags: ["GitHub Actions", "Claude API", "Webhooks", "LinkedIn"],
    problem:
      "Developers skip LinkedIn because writing a professional post for every commit takes too long.",
    solution:
      "GitHub Actions webhook on push → Claude reads the commit → writes LinkedIn post → auto-publishes.",
    result: "Passive personal branding on every commit without lifting a finger.",
  },
  {
    category: "Sales Automation",
    title: "WhatsApp Lead Bot — Qualify, log, and follow up automatically",
    src: "/assets/chart.png",
    github: "https://github.com/VARIZ19/n8n-whatsapp-lead-bot",
    demo: "https://github.com/VARIZ19/n8n-whatsapp-lead-bot",
    tags: ["n8n", "Claude API", "Notion", "Google Sheets", "WhatsApp"],
    problem:
      "Inbound WhatsApp leads piled up with no qualification, logging, or follow-up system.",
    solution:
      "WhatsApp inquiry → Claude qualifies lead (scores 1–10) → logs to Notion + Sheets → instant reply → 7-day auto follow-up.",
    result: "Every lead qualified, logged, and nurtured without manual CRM work.",
  },
  {
    category: "Financial Automation",
    title: "Auto Invoice + Follow-up — Never chase payments manually",
    src: "/assets/nxttp.webp",
    github: "https://github.com/VARIZ19/n8n-auto-invoice-followup",
    demo: "https://github.com/VARIZ19/n8n-auto-invoice-followup",
    tags: ["n8n", "Claude API", "Gmail", "Google Sheets"],
    problem:
      "Freelancers manually generated invoices and chased clients when payments were overdue.",
    solution:
      "Project done → Claude generates invoice → Gmail delivery → Sheets log → auto-reminds at 7 and 14 days if unpaid.",
    result: "Invoices sent and payment reminders handled automatically.",
  },
  {
    category: "Marketing Automation",
    title: "Reddit Trends → Content — Full content calendar on autopilot",
    src: "/assets/project1.png",
    github: "https://github.com/VARIZ19/n8n-reddit-to-content",
    demo: "https://github.com/VARIZ19/n8n-reddit-to-content",
    tags: ["n8n", "Claude API", "Reddit API", "Buffer"],
    problem:
      "Building a content calendar required hours of trend research and drafting across platforms.",
    solution:
      "Scrapes Reddit hot posts → Claude generates LinkedIn post + Twitter thread → schedules via Buffer.",
    result: "Full content calendar on autopilot without manual research.",
  },
  {
    category: "Productivity Automation",
    title: "AI Meeting Notes Bot — Never write meeting notes again",
    src: "/assets/project2.png",
    github: "https://github.com/VARIZ19/n8n-meeting-notes-bot",
    demo: "https://github.com/VARIZ19/n8n-meeting-notes-bot",
    tags: ["n8n", "Groq Whisper", "Claude API", "Slack", "Gmail"],
    problem:
      "Teams wasted time transcribing meetings and extracting action items by hand.",
    solution:
      "Audio → Groq Whisper transcribes → Claude extracts action items + decisions → posts to Slack + emails summary.",
    result: "Meeting notes, action items, and summaries delivered automatically.",
  },
  {
    category: "Sales Automation",
    title: "AI Cold Email Writer — Hyper-personalised outreach at scale",
    src: "/assets/chart.png",
    github: "https://github.com/VARIZ19/n8n-cold-email-writer",
    demo: "https://github.com/VARIZ19/n8n-cold-email-writer",
    tags: ["n8n", "Proxycurl", "Claude API", "LinkedIn"],
    problem:
      "Cold emails sounded like templates because personalisation took too long per lead.",
    solution:
      "LinkedIn URL → Proxycurl scrapes profile → Claude writes hyper-personalised cold email under 100 words.",
    result: "Outreach sounds human, not templated — at scale.",
  },
];

export const Socials = [
  {
    name: "github",
    href: "https://github.com/VARIZ19",
    logo: "/icons/github.svg",
    className: "dark:invert",
  },
  {
    name: "x.com",
    href: "https://x.com/varizsinghxh",
    logo: "/icons/x.svg",
    className: "dark:invert p-1",
  },
  {
    name: "gmail",
    href: "mailto:variz.auto@gmail.com",
    logo: "/icons/gmail.svg",
    className: "",
  },
  {
    name: "whatsapp",
    href: "https://wa.me/919779805755",
    logo: "/icons/whatsapp.svg",
    className: "p-1.5",
  },
  {
    name: "linkedIn",
    href: "https://linkedin.com/in/varijsingh",
    logo: "/icons/linkdin.svg",
    className: "dark:invert",
  },
];
