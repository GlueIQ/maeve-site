/* ═══════════════════════════════════════════════════
   THE LONG VIEW — Podcast Data
   A Maeve Production
   ═══════════════════════════════════════════════════ */

const PODCAST_NAME = "The Long View";

/* ── Social Proof Numbers (SINGLE SOURCE OF TRUTH) ── */
const PODCAST_META = {
  name: PODCAST_NAME,
  tagline: "Real conversations about the moments that change everything.",
  episodeCount: 24,
  listenerCount: "4,200",
  listenerCountHero: "4,200+",
  youtubeSubscribers: "2.1K",
  youtubeTotalViews: "48K",
  applePodcastsRating: "4.9",
  applePodcastsRatingCount: "312",
  cadence: "Bi-weekly",
  day: "Tuesday",
  duration: "30–45 min",
  launchDate: "February 2025",
  launchCity: "Charleston, SC",
  applePodcastsUrl: "#",
  youtubeUrl: "#",
  spotifyUrl: "#",
  amazonMusicUrl: "#",
  iheartUrl: "#",
  pocketCastsUrl: "#",
};

/* ── Hosts ── */
const HOSTS = {
  a: {
    name: "Margaux Bellamy",
    role: "Co-founder, Maeve · CFP®, CDFA®",
    shortRole: "Co-founder & CFP®",
    age: "Early fifties",
    appearance: "Curly blonde hair, relaxed but polished",
    bio: `I navigated my mother's estate while raising two teenagers and pivoting out of a twenty-year career in institutional wealth management. The system wasn't built for the people going through it — the ones sitting in conference rooms at 2 PM on a Tuesday because someone died. I built Maeve because I wanted to be the person I needed during the hardest three years of my life. This podcast is the conversation I wish I'd had on those long drives to the attorney's office.`,
    pullQuote: `"The best financial plan in the world means nothing if you can't sleep at night. We start with the human, not the spreadsheet."`,
    pullQuoteEpisode: "Ep. 10",
    linkedin: "#",
    instagram: "#",
    portraitAlt: "Margaux Bellamy — warm, editorial portrait",
  },
  b: {
    name: "Tessa Kincaid",
    role: "Co-founder, Maeve · JD, CLU®",
    shortRole: "Co-founder & JD",
    age: "Early forties",
    appearance: "Brown hair, glasses, sharp and research-driven",
    bio: `I'm the one who reads the 400-page tax code revisions so our listeners don't have to. Before Maeve, I spent twelve years in estate and elder law, watching brilliant women defer the most important financial decisions of their lives because nobody explained them in plain language. I ask the questions on this show that my clients were always afraid to ask — and I make sure the answers are actually useful. If a guest can't explain it clearly, I'll keep asking until they can.`,
    pullQuote: `"There's no such thing as a stupid question when someone's entire financial future hangs on the answer."`,
    pullQuoteEpisode: "Ep. 15",
    linkedin: "#",
    instagram: "#",
    portraitAlt: "Tessa Kincaid — sharp, editorial portrait",
  },
};

/* ── Content Pillars ── */
const PILLARS = {
  wealth:     { label: "Wealth Foundation",    color: "#D4C5B0", bg: "rgba(212, 197, 176,0.12)" },
  legal:      { label: "Legal Navigation",     color: "#1B4965", bg: "rgba(27,73,101,0.10)" },
  care:       { label: "Care Planning",        color: "#6B8F71", bg: "rgba(107,143,113,0.12)" },
  emotional:  { label: "Emotional Resilience", color: "#C2785B", bg: "rgba(194,120,91,0.12)" },
  family:     { label: "Family Dynamics",      color: "#8B6F8E", bg: "rgba(139,111,142,0.12)" },
  legacy:     { label: "Legacy & Identity",    color: "#001a0e", bg: "rgba(0,26,14,0.08)" },
};

/* ── Episodes (newest first for display, chronological data) ── */
const EPISODES = [
  {
    number: 24,
    title: "Stepped Up: The Tax Rule That Could Change Everything You Inherit",
    description: "There's a provision in the tax code that most heirs don't know about until it's too late. We break down the stepped-up cost basis rule — what it means, when it applies, and how one conversation with the right advisor can protect a significant portion of what you've inherited.",
    pillar: "wealth",
    duration: 41,
    date: "2026-03-17",
    dateFormatted: "March 17, 2026",
    mostListened: false,
    guest: "David Chen, Estate Tax Attorney, Whitmore & Associates",
    chapters: [
      { time: "0:00", title: "Cold Open" },
      { time: "3:14", title: "The Rule Nobody Explains" },
      { time: "18:42", title: "Listener Question" },
      { time: "31:05", title: "What to Ask Your Advisor" },
      { time: "38:20", title: "Maeve's Take" },
    ],
    extras: "Listener Q&A · Companion tool: Inheritance Tax Worksheet · Guest: David Chen, Whitmore & Associates",
  },
  {
    number: 23,
    title: "The Emergency Binder: What Your Family Needs If Something Happens Tomorrow",
    description: "We built a template live on air. Every account number, every policy, every password, every wish — organized in one place. This episode is equal parts practical and emotional, because the act of building this binder forces conversations most families avoid.",
    pillar: "care",
    duration: 39,
    date: "2026-02-11",
    dateFormatted: "February 11, 2026",
    mostListened: false,
    guest: null,
  },
  {
    number: 22,
    title: "Finding the Right Team: How to Vet Advisors When the Stakes Are Personal",
    description: "Your mother's financial advisor is not automatically yours. Tessa walks through the twelve questions you should ask any advisor before handing them your trust — and the three red flags that should send you out the door.",
    pillar: "legal",
    duration: 31,
    date: "2025-12-09",
    dateFormatted: "December 9, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 21,
    title: "The Gift Tax, the Estate Tax, and the Conversation Tax",
    description: "Three taxes — two of which are real and one we invented for the emotional toll of talking about money with people you love. Margaux and Tessa break down the mechanics and the feelings, because you can't plan around what you can't name.",
    pillar: "legacy",
    duration: 44,
    date: "2025-11-11",
    dateFormatted: "November 11, 2025",
    mostListened: true,
    guest: null,
  },
  {
    number: 20,
    title: "Home Equity Is Not a Retirement Plan (Unless It Is)",
    description: "For many women over fifty, their home is their largest asset — and their most emotionally complex one. We dig into reverse mortgages, downsizing math, and the question nobody wants to answer: what is this house actually for?",
    pillar: "wealth",
    duration: 36,
    date: "2025-10-28",
    dateFormatted: "October 28, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 19,
    title: "The Second Chapter: Redefining Purpose After Loss",
    description: "What happens after the paperwork is filed and the estate is settled? Margaux gets personal about the identity crisis that follows caregiving, and a listener shares the moment she realized she'd been someone's daughter for so long she forgot who else she was.",
    pillar: "emotional",
    duration: 42,
    date: "2025-10-14",
    dateFormatted: "October 14, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 18,
    title: "Remarriage, Blended Families, and the Estate Plan That Forgot Someone",
    description: "Second marriages are beautiful. Second-marriage estate plans are minefields. We talk through QTIP trusts, beneficiary designation mistakes, and the conversation you need to have before the wedding — not after.",
    pillar: "family",
    duration: 38,
    date: "2025-09-30",
    dateFormatted: "September 30, 2025",
    mostListened: false,
    guest: "Dr. Sandra Okafor, Family Systems Therapist",
  },
  {
    number: 17,
    title: "What Your Mother Never Told You About Money (Because Nobody Told Her)",
    description: "A generational deep-dive into financial literacy, or the lack of it. Why so many women arrive at inheritance unprepared — not because they're incapable, but because the system was never designed to include them in the conversation.",
    pillar: "legacy",
    duration: 45,
    date: "2025-09-16",
    dateFormatted: "September 16, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 16,
    title: "The Caregiver's Financial Blind Spot",
    description: "Caregivers lose an average of $304,000 in lifetime earnings. That's not a statistic — it's a retirement plan that quietly vanishes. Tessa crunches the numbers and offers three strategies for protecting yourself while protecting someone else.",
    pillar: "care",
    duration: 40,
    date: "2025-09-02",
    dateFormatted: "September 2, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 15,
    title: "Trusts Aren't Just for the Ultra-Wealthy: A Myth-Busting Episode",
    description: "Revocable, irrevocable, testamentary, living — the word 'trust' does a lot of heavy lifting. Tessa breaks down which ones actually matter for estates under $5 million, and why your neighbor's estate plan isn't a template for yours.",
    pillar: "legal",
    duration: 33,
    date: "2025-08-19",
    dateFormatted: "August 19, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 14,
    title: "The Identity After: Rebuilding When Your Role Disappears",
    description: "You were the caregiver. The executor. The one who held it together. Now the estate is settled and the house is sold and nobody needs you to be strong anymore. This is the episode about what comes next — and why it's harder than anyone warns you.",
    pillar: "emotional",
    duration: 48,
    date: "2025-08-05",
    dateFormatted: "August 5, 2025",
    mostListened: true,
    guest: "Dr. Adrienne Holt, Grief & Transition Psychologist",
  },
  {
    number: 13,
    title: "When Your Sibling Becomes Your Business Partner: Shared Inheritance",
    description: "You didn't choose a business partner — your parents did. How to navigate shared property, divided assets, and the emotional math of 'equal' vs. 'fair' when siblings inherit together.",
    pillar: "family",
    duration: 35,
    date: "2025-07-22",
    dateFormatted: "July 22, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 12,
    title: "Medicare, Medicaid, and the Gap Nobody Explains",
    description: "The five-year lookback. The asset threshold. The spousal impoverishment rule. These aren't just policy terms — they're the difference between keeping and losing everything your family built. A listener's real story anchors this critical episode.",
    pillar: "care",
    duration: 41,
    date: "2025-07-08",
    dateFormatted: "July 8, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 11,
    title: "The Family Meeting Nobody Wants to Have (But Everyone Needs)",
    description: "A step-by-step guide to calling the meeting, setting the agenda, and surviving it. Margaux shares the framework she uses with her own family — including the one rule that changed everything: no decisions at the first meeting.",
    pillar: "family",
    duration: 37,
    date: "2025-06-24",
    dateFormatted: "June 24, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 10,
    title: "Suddenly Single at 58: What the Spreadsheets Don't Tell You",
    description: "Whether through death or divorce, becoming financially solo after decades of partnership is disorienting. This episode is for the woman staring at a stack of accounts she didn't know existed, wondering where to start.",
    pillar: "wealth",
    duration: 43,
    date: "2025-06-10",
    dateFormatted: "June 10, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 9,
    title: "The Executor's Burden: What It Actually Means to Be Named",
    description: "Being named executor is not an honor. It's a job — one with legal liability, emotional weight, and a timeline that nobody prepares you for. Tessa walks through the first 90 days and the mistakes that cost families the most.",
    pillar: "legal",
    duration: 39,
    date: "2025-05-27",
    dateFormatted: "May 27, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 8,
    title: "When the Money Is Real but Nothing Else Is: Grief and Inheritance",
    description: "The check clears and the grief doesn't. A deeply human conversation about the guilt, the relief, and the strange vertigo of receiving wealth from loss. Margaux shares her own story for the first time on air.",
    pillar: "emotional",
    duration: 46,
    date: "2025-05-13",
    dateFormatted: "May 13, 2025",
    mostListened: true,
    guest: null,
  },
  {
    number: 7,
    title: "Who Gets the House? Real Talk About Real Estate in Estates",
    description: "The family home is never just real estate. It's memory and identity and sometimes the single biggest financial decision of an inheritance. How to think about keeping it, selling it, or sharing it — without losing each other.",
    pillar: "legacy",
    duration: 42,
    date: "2025-04-29",
    dateFormatted: "April 29, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 6,
    title: "Long-Term Care Isn't Long-Term Away: A Planning Primer",
    description: "The average cost of a private room in a nursing facility is $108,000 per year. That number should scare you — and then it should motivate you. A frank conversation about LTC insurance, self-insurance, and the math most families avoid.",
    pillar: "care",
    duration: 36,
    date: "2025-04-15",
    dateFormatted: "April 15, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 5,
    title: "The Conversation Nobody Had: Estate Planning for the Sandwich Generation",
    description: "You're raising kids and caring for parents. Your estate plan needs to account for both directions. Margaux and Tessa map out the unique planning challenges of the generation caught in the middle — and the one document most families forget.",
    pillar: "family",
    duration: 44,
    date: "2025-04-01",
    dateFormatted: "April 1, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 4,
    title: "Power of Attorney Is Not a Suggestion: The Documents That Matter Now",
    description: "Healthcare proxy. Durable power of attorney. Living will. These aren't theoretical — they're the documents that determine who speaks for you when you can't. We explain each one in plain English, with a downloadable checklist.",
    pillar: "legal",
    duration: 32,
    date: "2025-03-18",
    dateFormatted: "March 18, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 3,
    title: "The 72-Hour Rule: What Not to Decide in the First Three Days",
    description: "In the first 72 hours after a major transition — a death, a diagnosis, a sudden financial shock — your brain is not your friend. This episode is a permission slip to slow down, and a practical guide to the only three things you actually need to do right now.",
    pillar: "emotional",
    duration: 38,
    date: "2025-03-04",
    dateFormatted: "March 4, 2025",
    mostListened: true,
    guest: null,
  },
  {
    number: 2,
    title: "Your Mother's Financial Advisor Is Not Automatically Yours",
    description: "He's known your family for thirty years. He sent flowers. He's not necessarily the right person to manage your inheritance. How to evaluate existing relationships and know when it's time to find your own team.",
    pillar: "wealth",
    duration: 41,
    date: "2025-02-18",
    dateFormatted: "February 18, 2025",
    mostListened: false,
    guest: null,
  },
  {
    number: 1,
    title: "The Weight of the Envelope: What No One Tells You About Inheriting",
    description: "Our very first episode. Margaux and Tessa introduce themselves, the show, and the question that started it all: why does inheriting wealth feel so much heavier than earning it? A conversation about guilt, gratitude, and the gap between.",
    pillar: "wealth",
    duration: 34,
    date: "2025-02-04",
    dateFormatted: "February 4, 2025",
    mostListened: false,
    guest: null,
  },
];

/* ── Listener Reviews ── */
const REVIEWS = [
  {
    stars: 5,
    title: "Finally, someone who gets it",
    body: "I lost my husband eighteen months ago and inherited everything we'd built together — which sounds like a blessing until you're sitting alone with a brokerage statement you've never seen before. Episode 10 — 'Suddenly Single at 58' — made me feel seen for the first time since the funeral. Margaux speaks like a friend who happens to know exactly what to do next.",
    author: "Patricia M.",
    location: "Phoenix, AZ",
    platform: "Apple Podcasts",
  },
  {
    stars: 5,
    title: "I cried in my car — and then I made a plan",
    body: "I listened to 'The 72-Hour Rule' the week my mother went into hospice. I pulled over and sobbed, and then I made a list. That episode gave me permission to stop performing competence and just breathe. I've listened to every episode since.",
    author: "Diane K.",
    location: "Wilmington, DE",
    platform: "Apple Podcasts",
  },
  {
    stars: 5,
    title: "The podcast I wish existed five years ago",
    body: "When my father passed, I had no framework, no vocabulary, and no one explaining the tax implications in plain English. Five years and a lot of expensive mistakes later, I found The Long View. I'm sharing it with every woman I know who's approaching this stage of life.",
    author: "Margaret T.",
    location: "Naperville, IL",
    platform: "Apple Podcasts",
  },
  {
    stars: 5,
    title: "Two women who actually understand complexity",
    body: "Margaux brings the warmth and Tessa brings the precision. Together they create something I haven't found anywhere else — real financial intelligence that doesn't talk down to you. I learn something actionable every single episode.",
    author: "Susan R.",
    location: "Portland, OR",
    platform: "YouTube",
  },
  {
    stars: 5,
    title: "I sent 'The Executor's Burden' to my sister",
    body: "My sister was just named executor of our aunt's estate and had no idea what she'd agreed to. I texted her 'The Executor's Burden' episode and she called me two hours later and said, 'Why didn't anyone explain this before I signed?' Essential listening.",
    author: "Joan L.",
    location: "Savannah, GA",
    platform: "Apple Podcasts",
  },
  {
    stars: 5,
    title: "Smart, warm, and never condescending",
    body: "I've tried other finance podcasts and they either dumb it down or assume you have an MBA. The Long View treats me like an intelligent adult who just hasn't encountered these topics before. The tone is perfect — serious when it needs to be, human always.",
    author: "Barbara H.",
    location: "Scottsdale, AZ",
    platform: "YouTube",
  },
  {
    stars: 5,
    title: "Changed how I think about my mother's estate",
    body: "After listening to 'The Conversation Nobody Had,' I finally called my mother and asked if she had an estate plan. She didn't. We made an appointment together the next week. This podcast doesn't just inform — it moves you to act. I'm so grateful it exists.",
    author: "Christine W.",
    location: "Richmond, VA",
    platform: "Apple Podcasts",
  },
];

/* ── Companion Tools ── */
const COMPANION_TOOLS = [
  {
    name: "First 72 Hours Checklist",
    description: "The only three things you need to do — and the twenty things that can wait. A triage tool for the moment everything changes.",
    fromEpisode: 3,
    available: true,
  },
  {
    name: "Executor's Roadmap",
    description: "A 90-day step-by-step guide for anyone named executor. Legal obligations, timeline, and the calls to make first.",
    fromEpisode: 9,
    available: true,
  },
  {
    name: "LTC Cost Estimator Framework",
    description: "Estimate long-term care costs by state and facility type. Understand the gap between what insurance covers and what you'll need.",
    fromEpisode: 6,
    available: false,
  },
  {
    name: "Family Emergency Binder Template",
    description: "Every account, every policy, every password, every wish — organized in one place. Built live on Episode 23.",
    fromEpisode: 23,
    available: false,
  },
  {
    name: "Transition Readiness Self-Assessment",
    description: "A 15-minute diagnostic that reveals your preparedness across five critical dimensions of life transition.",
    fromEpisode: 14,
    available: false,
  },
  {
    name: "Sandwich Generation Survival Kit",
    description: "Planning templates for families navigating care in both directions — raising children while supporting aging parents.",
    fromEpisode: 5,
    available: false,
  },
];

/* ── Waveform Bar Heights (seeded pseudo-random for consistency) ── */
function generateWaveformBars(count, seed) {
  const bars = [];
  let s = seed || 42;
  for (let i = 0; i < count; i++) {
    s = (s * 16807 + 7) % 2147483647;
    const normalized = (s % 1000) / 1000;
    // Create organic variation: mostly medium with some peaks and valleys
    const base = 0.25;
    const variance = 0.65;
    let height = base + (variance * (0.5 + 0.5 * Math.sin(i * 0.4 + normalized * 3.14)));
    // Add some randomness
    height += (normalized - 0.5) * 0.3;
    height = Math.max(0.1, Math.min(1.0, height));
    bars.push(height);
  }
  return bars;
}

const WAVEFORM_BARS = generateWaveformBars(52, 42);

/* ── Listener Avatars for Social Proof ── */
const LISTENER_AVATARS = [
  { initials: "SM", color: "#D4C5B0" },
  { initials: "JR", color: "#1B4965" },
  { initials: "AL", color: "#6B8F71" },
  { initials: "KP", color: "#C2785B" },
  { initials: "DW", color: "#8B6F8E" },
];

/* ── Global Export ── */
const PILLAR_LABEL_MAP = {
  wealth: "Wealth Transition",
  legal: "Legal Navigation",
  care: "Caregiving",
  emotional: "Emotional Intelligence",
  family: "Legacy Planning",
  legacy: "Identity & Reinvention",
};

window.PODCAST_DATA = {
  podcastName: PODCAST_NAME,
  tagline: PODCAST_META.tagline,
  socialProof: {
    listeners: 4200,
    appleRatings: PODCAST_META.applePodcastsRatingCount,
    rating: PODCAST_META.applePodcastsRating,
    youtubeSubscribers: PODCAST_META.youtubeSubscribers,
    youtubeTotalViews: PODCAST_META.youtubeTotalViews,
  },
  episodes: EPISODES.map(ep => ({
    number: ep.number,
    title: ep.title,
    description: ep.description,
    pillar: PILLAR_LABEL_MAP[ep.pillar] || ep.pillar,
    duration: ep.duration + " min",
    date: ep.dateFormatted,
    mostListened: ep.mostListened,
    guest: ep.guest,
  })),
  chapterMarkers: EPISODES[0].chapters
    ? EPISODES[0].chapters.map(c => ({ time: c.time, title: c.title }))
    : [],
  hosts: [
    {
      name: HOSTS.a.name,
      role: HOSTS.a.role,
      bio: HOSTS.a.bio,
      pullQuote: HOSTS.a.pullQuote.replace(/^"|"$/g, ''),
      quoteSource: HOSTS.a.pullQuoteEpisode,
    },
    {
      name: HOSTS.b.name,
      role: HOSTS.b.role,
      bio: HOSTS.b.bio,
      pullQuote: HOSTS.b.pullQuote.replace(/^"|"$/g, ''),
      quoteSource: HOSTS.b.pullQuoteEpisode,
    },
  ],
  reviews: REVIEWS,
  companionTools: COMPANION_TOOLS.map(t => ({
    name: t.name,
    description: t.description,
    episodeTag: "From EP " + t.fromEpisode,
    available: t.available,
  })),
  waveformFn: function (index, seed) {
    const s = typeof seed === 'string' ? seed.charCodeAt(0) * 7 + 42 : seed || 42;
    const bars = generateWaveformBars(100, s);
    return bars[index % bars.length];
  },
  avatars: LISTENER_AVATARS,
};
