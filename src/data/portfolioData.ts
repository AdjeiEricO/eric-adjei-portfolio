export type ProjectCategory =
  | 'All Work'
  | 'Graphic Design'
  | 'Data Analytics'
  | 'Social Strategy';

export interface HomeProfile {
  name: string;
  role: string;
  tagline: string;
  introduction: string;
  secondaryBio: string;
  location: string;
  availability: string;
  email: string;
}

export interface AnalyticsStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Work'>;
  secondaryCategory?: Exclude<ProjectCategory, 'All Work'>;
  year: string;
  client: string;
  role: string;
  summary: string;
  challenge: string;
  outcome: string;
  impactMetric: string;
  deliverables: string[];
  imageUrl?: string;
  imageAlt?: string;
  analyticsVariant?: 'retail-sales' | 'social-attribution';
  analyticsHighlights?: AnalyticsStat[];
  spanWide?: boolean;
}

export interface DisciplineItem {
  index: string;
  title: string;
  description: string;
  tools: string;
  accent: 'cobalt' | 'gold' | 'navy';
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  summary: string;
}

export const DEFAULT_HOME_PROFILE: HomeProfile = {
  name: 'Eric Osei Adjei',
  role: 'Social Media Strategist at EKB Studios · Data Analyst & Graphic Designer',
  tagline: 'Turning raw data into clear insights and human-centered visual stories.',
  introduction:
    "Hello, I'm Eric Osei Adjei. I serve as the Social Media Strategist at EKB Studios (ekbstudios.net) while practicing graphic design and data analytics—helping brands, tech communities, and growing businesses communicate clearly and grow with measurable intent.",
  secondaryBio:
    'At EKB Studios, I help shape digital storytelling and audience strategy across human-centered technology and creative initiatives including EKB Tech Nexus, EKB Graphix, EKB Nexus Connects, and Mental Epiphany—alongside independent design and analytics projects.',
  location: 'Cape Coast & Accra, Ghana',
  availability: 'EKB Studios & Select Freelance',
  email: 'ericoseiadjei970@gmail.com',
};

export const PORTFOLIO_METRICS = [
  {
    label: 'Studio Role',
    value: 'EKB Studios',
    context: 'Social Media Strategist',
    accent: 'cobalt' as const,
  },
  {
    label: 'Core Disciplines',
    value: '3 Focus Areas',
    context: 'Social · Design · Data',
    accent: 'gold' as const,
  },
  {
    label: 'Graphic Design Works',
    value: '4 Featured',
    context: 'Events, Retail & Campus',
    accent: 'navy' as const,
  },
  {
    label: 'Analytics Case Studies',
    value: '2 Projects',
    context: 'SQL, Excel & Dashboards',
    accent: 'sky' as const,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'golden-crown-hair-campaign',
    title: 'Golden Crown Hair — Brand Promo',
    category: 'Graphic Design',
    secondaryCategory: 'Social Strategy',
    year: '2026',
    client: 'Golden Crown Hair (Lagos, Nigeria)',
    role: 'Graphic Designer & Promotional Layout Artist',
    summary:
      'Commercial social media promotional flyer highlighting luxury wig collections, core salon services, and nationwide delivery.',
    challenge:
      'Present a flagship product shot alongside four distinct hair textures, a five-item service menu, and contact details without overwhelming mobile shoppers.',
    outcome:
      'Structured a warm neutral visual hierarchy with framed product thumbnails, clear service grouping, and an unmistakable nationwide delivery callout optimized for Instagram and WhatsApp sharing.',
    impactMetric: 'Multi-product retail layout built for mobile social feeds',
    deliverables: ['Commercial Flyer', 'Product Grid Layout', 'Social Ad Creative'],
    imageUrl: '/assets/aistudio/20260522_143034_a683c5c8.jpg',
    imageAlt:
      'Golden Crown Hair promotional graphic featuring luxury wig collections, service list, and Lagos contact details',
    spanWide: false,
  },
  {
    id: 'beholding-to-become-convocation',
    title: 'Beholding to Become — Event Flyer',
    category: 'Graphic Design',
    year: '2026',
    client: "Encounter Jesus Ministry Int'l & Partners",
    role: 'Lead Graphic Designer',
    summary:
      'Atmospheric multi-speaker ministry convocation poster uniting three guest ministers, custom typographic title treatment, and venue logistics.',
    challenge:
      'Harmonize portraits from three different photo sources into one cohesive composition while keeping the theme scripture, venue, date, and livestream handles legible at a glance.',
    outcome:
      'Applied consistent monochrome tonal grading across all speakers over a deep indigo backdrop, paired with luminous title typography and an anchored footer strip for time, date, and social channels.',
    impactMetric: 'Unified 3-speaker composite for print & livestream promotion',
    deliverables: ['Event Key Visual', 'Portrait Retouching', 'Social Livestream Banner'],
    imageUrl: '/assets/aistudio/20260507_065206_7a87a63d.jpg',
    imageAlt:
      "Beholding to Become event flyer for Encounter Jesus Ministry Int'l featuring three speakers and May 2026 event details",
    spanWide: false,
  },
  {
    id: 'retail-sales-cohort-analysis',
    title: 'Retail Sales & Customer Cohort Analysis',
    category: 'Data Analytics',
    year: '2026',
    client: 'Applied Data Analytics Case Study',
    role: 'Data Analyst (Excel, SQL & Dashboarding)',
    summary:
      'Exploratory analysis of 12 months of e-commerce order logs to identify revenue seasonality, top-margin categories, and 90-day repeat buyer retention.',
    challenge:
      'Raw transaction exports contained duplicate SKUs, missing customer region tags, and ungrouped discount codes that obscured true net revenue trends.',
    outcome:
      'Cleaned 14,800+ order records using SQL and Excel, built monthly cohort retention tables, and surfaced that Q4 bundle promotions drove 34% higher repeat order rates within 60 days.',
    impactMetric: '14,820 orders cleaned · +34% repeat-buyer retention in bundle cohorts',
    deliverables: ['Data Cleaning (SQL)', 'Pivot & Cohort Tables', 'Executive KPI Summary'],
    analyticsVariant: 'retail-sales',
    analyticsHighlights: [
      { label: 'Records Audited', value: '14,820' },
      { label: 'Net Revenue Tracked', value: '$184.6K' },
      { label: '90-Day Repeat Rate', value: '38.4%' },
    ],
    spanWide: true,
  },
  {
    id: 'oguaa-hall-welcome-campaign',
    title: 'Welcome Back to Campus — Mr. Sage',
    category: 'Graphic Design',
    secondaryCategory: 'Social Strategy',
    year: '2026',
    client: 'University of Cape Coast · Oguaa Hall',
    role: 'Campaign Designer & Visual Strategist',
    summary:
      'Student leadership welcome-back poster for Mr. Sage (Oguaa Hall Library Chairperson ’26), balancing institutional crest guidelines with approachable campus energy.',
    challenge:
      'Communicate an academic library initiative while making the candidate relatable and recognizable across student WhatsApp statuses and campus noticeboards.',
    outcome:
      'Combined bold blue-and-gold Oguaa Hall colors, clean editorial quote framing, stacked book illustration accents, and structured campaign hashtags for consistent campus recall.',
    impactMetric: 'High-contrast campus campaign visual across print & WhatsApp',
    deliverables: ['Campaign Poster', 'Portrait Compositing', 'Hashtag Messaging'],
    imageUrl: '/assets/aistudio/20260429_074218_74d8c356.jpg',
    imageAlt:
      'Welcome Back to Campus campaign poster for Mr. Sage, Oguaa Hall Library Chairperson 26 at University of Cape Coast',
    spanWide: false,
  },
  {
    id: 'citsa-safe-journey-greeting',
    title: 'Safe Journey Back Home — CITSA UCC',
    category: 'Graphic Design',
    secondaryCategory: 'Social Strategy',
    year: '2026',
    client: 'CITSA · University of Cape Coast',
    role: 'Graphic Designer',
    summary:
      'End-of-semester goodwill poster for the Computer Science and Information Technology Students’ Association Executive Secretary.',
    challenge:
      'Reflect the tech-focused personality of Computer Science & IT students while keeping a warm, formal association sign-off.',
    outcome:
      'Paired UCC and CITSA institutional crests with patterned golden backgrounds, tech-inspired message copy, and a crisp bottom executive nameplate for Frimpong Amazia.',
    impactMetric: 'Association-wide end-of-semester digital greeting',
    deliverables: ['Association Graphic', 'Typography Hierarchy', 'Social Share Asset'],
    imageUrl: '/assets/aistudio/20260715_141747_231f65e2.jpg',
    imageAlt:
      'Safe Journey Back Home poster for Frimpong Amazia, CITSA Executive Secretary at University of Cape Coast',
    spanWide: false,
  },
  {
    id: 'social-content-attribution-study',
    title: 'Social Media Content & Engagement Attribution',
    category: 'Data Analytics',
    secondaryCategory: 'Social Strategy',
    year: '2026',
    client: 'Applied Marketing Analytics Case Study',
    role: 'Data Analyst & Social Media Strategist',
    summary:
      'Cross-platform audit of 180 social posts comparing static flyers, educational carousels, and short-form video to optimize reach and click-through rate.',
    challenge:
      'Small brands often post daily without knowing which content formats or posting windows actually generate profile visits and direct inquiries.',
    outcome:
      'Structured post performance data by format, hook type, and day-of-week; discovered educational carousels earned 2.4x higher save rates and Tuesday/Thursday evening slots outperformed mornings by 29%.',
    impactMetric: '180 posts benchmarked · 2.4x higher save rate on carousel guides',
    deliverables: ['Engagement Funnel Analysis', 'Format Benchmarking', 'Content Calendar Strategy'],
    analyticsVariant: 'social-attribution',
    analyticsHighlights: [
      { label: 'Posts Analyzed', value: '180' },
      { label: 'Avg. Engagement Lift', value: '+41.2%' },
      { label: 'Top Format Save Rate', value: '6.8%' },
    ],
    spanWide: true,
  },
];

export const DISCIPLINES: DisciplineItem[] = [
  {
    index: '01.',
    title: 'Data Analysis & Reporting',
    description:
      'Cleaning messy datasets, writing structured queries, and translating trends into clear charts and plain-English recommendations that teams can act on.',
    tools: 'Excel · SQL · Power BI · Python (Pandas) · Data Cleaning',
    accent: 'cobalt',
  },
  {
    index: '02.',
    title: 'Graphic Design & Visual Communication',
    description:
      'Designing high-contrast promotional flyers, event posters, campus campaign visuals, and brand collateral tailored for both print and mobile social feeds.',
    tools: 'Adobe Photoshop · Illustrator · Canva · Typography · Layout Grids',
    accent: 'gold',
  },
  {
    index: '03.',
    title: 'Social Media Strategy',
    description:
      'Planning content calendars, aligning visual creatives with audience hooks, and tracking reach, saves, and conversion metrics to guide growth.',
    tools: 'Content Strategy · Audience Insights · Campaign Analytics · Copywriting',
    accent: 'navy',
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Social Media Strategist',
    organization: 'EKB Studios (ekbstudios.net)',
    organizationUrl: 'https://ekbstudios.net',
    location: 'Ghana, West Africa',
    summary:
      'Leading social media strategy, community engagement, and content planning for EKB Studios—amplifying human-centered technology and creative programs across EKB Tech Nexus, EKB Graphix, EKB Nexus Connects, and Mental Epiphany.',
  },
  {
    period: '2025 — Present',
    role: 'Data Analytics Track & Applied Case Studies',
    organization: 'Independent Study & Portfolio Labs',
    location: 'Ghana',
    summary:
      'Building hands-on data cleaning, SQL querying, spreadsheet modeling, and KPI dashboarding projects focused on retail sales and social media performance.',
  },
  {
    period: '2023 — Present',
    role: 'Freelance Graphic Designer & Campus Campaign Creative',
    organization: 'Independent Practice · UCC (Oguaa Hall & CITSA)',
    location: 'Cape Coast & Accra',
    summary:
      'Designing event flyers, commercial brand promos, student leadership posters, and digital campaign assets reaching audiences across campus and commercial channels.',
  },
];
