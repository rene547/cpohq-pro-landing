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
  headline: "Loved by 1,000s of Chief People Officers.",
  sub: "Notes, clips, and posts from members, unedited.",
  /* Real attributed quotes from the vetted testimonial sheet (2026-07-09),
     display-ready trims. Pillars: Community / Product & AI / Events. */
  /* avatar "" renders a plain black initials circle (no headshot on file) */
  quotes: [
    { q: "CPOHQ is such a game changer - I tell people about it all the time... I cite it as literally one of the most important tools in my role as Chief People Officer.", name: "Chloe Drew", role: "Chief People Officer, Redox", avatar: "/photos/people/chloe-drew.jpg" },
    { q: "I've spent some time using and really exploring the AI Chief of Staff, and I have to say, it's phenomenal. It's quickly become a tool I can see myself relying on every day.", name: "Laura Florin", role: "Global Head of People Experience, VIDERI", avatar: "/photos/people/laura-florin.jpg" },
    { q: "ELEVATE is hands down the best conference I've attended in my career!", name: "Vikki Caruso", role: "Chief People Officer, Clearcover", avatar: "/photos/people/vikki-caruso.jpg" },
    { q: "This is magical. I can look at this at a glance and understand it 100%.", name: "Tricia Elias", role: "Vantage", avatar: "" },
    { q: "I've invited so many of my CPO colleagues to this space as it has been the best CPO network I've encountered.", name: "Regina Ross", role: "Chief People Officer, Khan Academy", avatar: "/photos/people/regina-ross.jpg" },
    { q: "We're picky about our partners and feel lucky to have found a like-minded team in CPOHQ + Knoetic AI - passionate about their craft, committed to their customers' success, and always pushing what's possible. It's been a game changer for us.", name: "Patsy Mangan", role: "Chief People Officer, Scribd", avatar: "/photos/people/patsy-mangan.jpg" },
    { q: "What Joseph has built with CPOHQ is rare. It's not just a network. It's a room where people show up honestly - off the record, willing to share what's actually working, what's not, and what they're still figuring out.", name: "Michelle Wagner", role: "Ex-CEO/CPO, Mindstrong", avatar: "/photos/people/michelle-wagner.jpg" },
    { q: "After two decades building people functions, I thought I knew what a room full of great People leaders looked like. This redefined it.", name: "Lynee Luque", role: "CPO, NerdWallet", avatar: "/photos/people/lynee-luque.jpg" },
  ],
  /* captions/durations are placeholders like the quotes; swap when Lucas
     delivers the Elevate clips */
  /* videoSrc plays muted on hover (photo stays as the idle poster) */
  photos: [
    { src: "/photos/summit-passion.jpg", alt: "Speaker on stage at a CPOHQ summit", caption: "Summit keynote", duration: "0:38", videoSrc: "" },
    { src: "/photos/summit-hoodies.jpg", alt: "Members at Summit II, The Timeless and the Timely", caption: "Summit II floor", duration: "", videoSrc: "" },
    { src: "/photos/summit-panel.jpg", alt: "Panel on AI and the organization of 2030", caption: "The organization of 2030", duration: "0:10", videoSrc: "/videos/organization-of-2030.mp4" },
    { src: "/photos/summit-welcoming.jpg", alt: "Founder welcoming members on stage", caption: "Opening welcome", duration: "0:10", videoSrc: "/videos/opening-welcome.mp4" },
    { src: "/photos/summit-joseph-mic.jpg", alt: "Session at a CPOHQ summit", caption: "Member Q&A", duration: "", videoSrc: "" },
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

/* ---------- v1 apply form ----------
   Field set mirrors the live cpohq.com application form 1:1 so the wiring
   phase can map straight onto the existing pipeline. Do not rename keys. */

export const applyForm = {
  title: "Apply to join CPOHQ.",
  sub: "Membership is by invitation only, so we'd love to learn more about you and why you're interested in joining.",
  steps: [
    { id: "about", label: "About you" },
    { id: "role", label: "Your role" },
    { id: "systems", label: "Your systems" },
  ],
  fields: {
    firstName: "First name",
    lastName: "Last name",
    workEmail: "Work email",
    personalEmail: "Personal email (just in case)",
    linkedinUrl: "Your LinkedIn profile URL",
    activeCpo: "I am currently an active, full-time CPO",
    professionalLevel: "What is your professional level?",
    reportingLevels:
      "How many reporting levels are between you and the CEO of your organization?",
    hris: "Which HRIS does your company use?",
    ats: "Which ATS does your company use?",
  },
  selectPlaceholder: "Please select",
  multiHint: "Select all that apply.",
  professionalLevels: ["C-Level", "SVP", "VP", "Director", "Other"],
  reportingLevelOptions: [
    "1 (I report directly to the CEO)",
    "2 (I report to someone who reports directly to the CEO)",
    "3 or more",
  ],
  hrisOptions: [
    "ADP Workforce Now",
    "BambooHR",
    "Ceridian Dayforce",
    "Deel",
    "Gusto",
    "HiBob",
    "Justworks",
    "Namely",
    "Oracle Cloud HCM",
    "Paychex",
    "Paycor",
    "Paylocity",
    "Personio",
    "Rippling",
    "SageHR",
    "SAP SuccessFactors",
    "UKG",
    "Workday",
    "Other",
    "None",
  ],
  atsOptions: [
    "Greenhouse",
    "Ashby",
    "Lever",
    "SmartRecruiters",
    "Workday Recruiting",
    "iCIMS Talent Cloud",
    "Oracle Recruiting",
    "SAP Recruiting",
    "Workable",
    "JazzHR",
    "BreezyHR",
    "Jobvite",
    "Other",
    "None",
  ],
  back: "Back",
  next: "Continue",
  submit: "Submit application",
  consent: {
    before: "By applying to CPOHQ, you are agreeing to our ",
    privacyLabel: "Privacy Policy",
    privacyHref: "#",
    between: " and ",
    termsLabel: "Terms of Use",
    termsHref: "#",
    after: ".",
  },
  errors: {
    required: "Please complete this required field.",
    email: "Please enter a valid email address.",
    linkedin: "Please enter a LinkedIn profile URL.",
    selectOne: "Please select at least one option.",
  },
  success: {
    title: "Application received.",
    line: "Thanks for applying to CPOHQ. Every application is reviewed, and we'll be in touch soon.",
    close: "Done",
  },
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
