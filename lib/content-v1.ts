import logosJson from "./logos.json";

export type Logo = { name: string; file: string };

export const logos: Logo[] = logosJson as Logo[];

export const hero = {
  headline: "The #1 platform giving 3,000+ Chief People Officers and their teams AI superpowers.",
  // Alternate for Joseph to react to; shown in some variants.
  headlineAlt: "AI superpowers for the world's best people leaders.",
  sub: "The private community where the world's best people leaders build AI-native companies.",
  emailPlaceholder: "Work email",
  cta: "Join",
  microcopy: "Membership is CPO-only.",
  stat: 3000,
};

export const investorBanner = {
  line: "Backed by the world's best investors.",
};

export const logoBar = {
  line: "Current and former CPOs from",
};

export const highlights = [
  {
    id: "community",
    title: "Community",
    line: "Confidential conversations with the top 1% of people leaders.",
  },
  {
    id: "chief-of-staff",
    title: "AI Chief of Staff",
    line: "An AI chief of staff that already knows your world.",
  },
  {
    id: "agents",
    title: "Team of AI agents",
    line: "A team of AI agents for your entire people org.",
  },
];

export const loveWall = {
  headline: "The most loved community in HR.",
  sub: "Notes, clips, and posts from members, unedited.",
  // Placeholder quotes. Lucas is sending 15 attributed quotes; swap 1:1.
  quotes: [
    { q: "CPOHQ is the first Slack I open in the morning and the last one I close.", name: "Placeholder Name", role: "CPO, Series C fintech" },
    { q: "I asked a comp question at 9am and had four benchmark files by lunch.", name: "Placeholder Name", role: "Chief People Officer, public SaaS" },
    { q: "The AI chief of staff drafted my board update before I remembered it was due.", name: "Placeholder Name", role: "CPO, healthcare" },
    { q: "This community is the single highest leverage membership I have.", name: "Placeholder Name", role: "CHRO, enterprise software" },
    { q: "Nothing else comes close for honest conversations about the hard stuff.", name: "Placeholder Name", role: "CPO, marketplace" },
    { q: "I have hired three executives through relationships made here.", name: "Placeholder Name", role: "Chief People Officer, AI startup" },
    { q: "The benchmarks alone paid for themselves in one negotiation.", name: "Placeholder Name", role: "VP People, growth stage" },
    { q: "It feels like having 3,000 chiefs of staff on call.", name: "Placeholder Name", role: "CPO, consumer" },
    { q: "Our whole people team runs on the playbooks we found here.", name: "Placeholder Name", role: "CHRO, logistics" },
    { q: "The summit was the best two days I have spent all year.", name: "Placeholder Name", role: "CPO, developer tools" },
  ],
  photos: [
    { src: "/photos/summit-passion.jpg", alt: "Speaker on stage at a CPOHQ summit" },
    { src: "/photos/summit-hoodies.jpg", alt: "Members at Summit II, The Timeless and the Timely" },
    { src: "/photos/summit-panel.jpg", alt: "Panel on AI and the organization of 2030" },
    { src: "/photos/summit-welcoming.jpg", alt: "Founder welcoming members on stage" },
    { src: "/photos/summit-joseph-mic.jpg", alt: "Session at a CPOHQ summit" },
  ],
};

export const community = {
  id: "community",
  headline: "Build an AI-native company alongside 3,000+ CPOs.",
  sub: "The rooms where people leaders compare notes before the rest of the market catches up.",
  points: [
    {
      title: "Confidential conversations.",
      line: "Zero-leak spaces to ask what you can't ask anywhere else.",
    },
    {
      title: "Thousands of benchmarks.",
      line: "Comp, org design, and AI adoption data straight from peers.",
    },
    {
      title: "Proprietary playbooks.",
      line: "The strategies top people leaders are actually running.",
    },
  ],
};

export const chiefOfStaff = {
  id: "chief-of-staff",
  headline: "Meet your AI chief of staff.",
  sub: "It reads your world and works like it's been in the room all along.",
  points: [
    {
      title: "Briefs you every morning.",
      line: "The three things that matter, ranked, before your first meeting.",
    },
    {
      title: "Drafts the work that eats your week.",
      line: "Updates, decks, and follow-ups, ready for your pass.",
    },
    {
      title: "Knows your org.",
      line: "Your goals, your team, and what's slipping.",
    },
  ],
  mock: {
    greeting: "Good morning, Dana.",
    subline: "I handled the noise. Here's what's left.",
    todos: [
      { label: "Review comp bands for the ML org", tag: "P0", source: "Board prep" },
      { label: "Approve the Q3 engagement survey", tag: "P1", source: "Slack" },
      { label: "Draft note on the reorg announcement", tag: "P1", source: "Gmail" },
    ],
  },
};

export const agents = {
  id: "agents",
  headline: "A swarm of AI agents for your people team.",
  sub: "Every workflow in the people org, with an agent on it.",
  points: [
    {
      title: "Instant talent cards.",
      line: "A full picture of any leader you're evaluating, in seconds.",
    },
    {
      title: "Analytics in plain English.",
      line: "Ask people questions the way you'd ask a person.",
    },
    {
      title: "Agents that fit your team.",
      line: "They work the way your people org already does.",
    },
  ],
};

export const security = {
  headline: "Enterprise-grade security. Community-grade trust.",
  points: [
    // NOTE: confirm actual certifications with Lucas/Joseph before ship.
    { title: "SOC 2 Type II and ISO 27001.", line: "Audited controls, not promises." },
    { title: "Your data stays yours.", line: "Never sold and never used to train models." },
    { title: "Locked down by default.", line: "Encryption in transit and at rest, SSO, and strict access controls." },
  ],
  badges: ["SOC 2 TYPE II", "ISO 27001", "GDPR", "CCPA"],
};

export const talkToUs = {
  headline: "Ready to see what 3,000 CPOs already know?",
  sub: "Join the community, or talk to us about your team.",
  primary: "Join CPOHQ",
  secondary: [
    { label: "Talk to a founder", href: "#" },
    { label: "Get a demo for your team", href: "#" },
  ],
};

export const footer = {
  nav: [
    { label: "Community", href: "#community" },
    { label: "AI Chief of Staff", href: "#chief-of-staff" },
    { label: "Agents", href: "#agents" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],
  line: "© CPOHQ. All rights reserved.",
};
