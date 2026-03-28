/* ═══════════════════════════════════════════════════
   MAEVE PORTAL — Mock Data
   Comprehensive realistic demo data
   ═══════════════════════════════════════════════════ */

// ── Member Profile ──
export const memberProfile = {
  name: 'Sarah Mitchell',
  firstName: 'Sarah',
  email: 'sarah.mitchell@email.com',
  avatar: null,
  initials: 'SM',
  memberSince: 'January 2024',
  tier: 'Full Membership',
  transitionType: 'inheritance',
  transitionLabel: '↓ Inheritance',
  phase: 2,
  phaseLabel: 'Strategize',
  overallProgress: 62,
  lastActive: '2 hours ago',
};

// ── Advisor Profile ──
export const advisorProfile = {
  name: 'David Chen, CFP®',
  firstName: 'David',
  email: 'david.chen@wealthadvisors.com',
  avatar: null,
  initials: 'DC',
  firm: 'Meridian Wealth Partners',
  designation: 'CFP®, CDFA®',
  aum: '$142M',
  clientCount: 23,
  activeTransitions: 8,
  retentionRate: 94,
};

// ── Phase Timeline ──
export const phases = [
  {
    id: 1,
    name: 'Stabilize',
    icon: 'balance',
    description: 'Immediate tactical support to stop the overwhelm.',
    status: 'completed',
    progress: 100,
    tasks: [
      { id: 't1', text: 'Complete Crisis Audit questionnaire', done: true },
      { id: 't2', text: 'Document all known accounts and assets', done: true },
      { id: 't3', text: 'Identify immediate financial obligations', done: true },
      { id: 't4', text: 'Set up emergency contact protocol', done: true },
      { id: 't5', text: 'Review existing insurance policies', done: true },
    ],
  },
  {
    id: 2,
    name: 'Strategize',
    icon: 'hub',
    description: 'Map the full picture and build your plan.',
    status: 'active',
    progress: 62,
    tasks: [
      { id: 't6', text: 'Complete Net Worth assessment', done: true },
      { id: 't7', text: 'Review estate documents with attorney', done: true },
      { id: 't8', text: 'Build forward-looking budget', done: true },
      { id: 't9', text: 'Evaluate current advisory relationships', done: false, doNotRush: true },
      { id: 't10', text: 'Develop investment policy statement', done: false },
      { id: 't11', text: 'Tax strategy for inherited assets', done: false },
    ],
  },
  {
    id: 3,
    name: 'Steward',
    icon: 'volunteer_activism',
    description: 'Build lasting systems for generational impact.',
    status: 'upcoming',
    progress: 0,
    tasks: [
      { id: 't12', text: 'Establish family governance structure', done: false },
      { id: 't13', text: 'Create gifting strategy', done: false },
      { id: 't14', text: 'Set up charitable giving framework', done: false },
      { id: 't15', text: 'Build next-generation education plan', done: false },
    ],
  },
];

// ── Checklists ──
export const checklists = {
  'first-72-hours': {
    id: 'first-72-hours',
    title: 'First 72 Hours',
    description: 'The critical initial period after a transition event.',
    items: [
      { id: 'c1', text: 'Locate and secure all vital documents (will, trust, insurance)', done: true, category: 'legal' },
      { id: 'c2', text: 'Notify relevant financial institutions', done: true, category: 'financial' },
      { id: 'c3', text: 'Identify immediate cash needs and liquidity', done: true, category: 'financial' },
      { id: 'c4', text: 'Contact estate attorney for initial guidance', done: true, category: 'legal' },
      { id: 'c5', text: 'Gather last 3 months of account statements', done: false, category: 'financial' },
      { id: 'c6', text: 'Set up a dedicated email for estate matters', done: false, category: 'admin' },
    ],
  },
  'financial-foundations': {
    id: 'financial-foundations',
    title: 'Financial Foundations',
    description: 'Building a clear picture of your financial landscape.',
    items: [
      { id: 'c7', text: 'Complete full net worth calculation', done: true, category: 'financial' },
      { id: 'c8', text: 'Review all beneficiary designations', done: true, category: 'legal' },
      { id: 'c9', text: 'Understand tax implications of inherited assets', done: false, category: 'tax', doNotRush: true },
      { id: 'c10', text: 'Set up proper account titling', done: false, category: 'financial' },
      { id: 'c11', text: 'Create monthly cash flow projection', done: false, category: 'financial' },
      { id: 'c12', text: 'Review and update insurance coverage', done: false, category: 'insurance' },
    ],
  },
  'legal-essentials': {
    id: 'legal-essentials',
    title: 'Legal Essentials',
    description: 'Protecting your interests and ensuring proper governance.',
    items: [
      { id: 'c13', text: 'Review and update your own will', done: true, category: 'legal' },
      { id: 'c14', text: 'Establish power of attorney documents', done: false, category: 'legal' },
      { id: 'c15', text: 'Review trust provisions and terms', done: false, category: 'legal', doNotRush: true },
      { id: 'c16', text: 'File required estate tax returns', done: false, category: 'tax' },
      { id: 'c17', text: 'Transfer property titles as needed', done: false, category: 'legal' },
    ],
  },
  'emotional-wellbeing': {
    id: 'emotional-wellbeing',
    title: 'Emotional Wellbeing',
    description: 'Caring for yourself through the transition.',
    items: [
      { id: 'c18', text: 'Identify a personal support network', done: true, category: 'wellness' },
      { id: 'c19', text: 'Consider professional counseling resources', done: true, category: 'wellness' },
      { id: 'c20', text: 'Set boundaries with family around financial discussions', done: false, category: 'family', doNotRush: true },
      { id: 'c21', text: 'Document your values and intentions', done: false, category: 'wellness' },
      { id: 'c22', text: 'Create a "decision-free" period for major choices', done: false, category: 'wellness' },
    ],
  },
  'advisory-team': {
    id: 'advisory-team',
    title: 'Advisory Team',
    description: 'Building and evaluating your professional support.',
    items: [
      { id: 'c23', text: 'Evaluate current financial advisor fit', done: true, category: 'advisory' },
      { id: 'c24', text: 'Interview potential estate attorneys', done: false, category: 'advisory' },
      { id: 'c25', text: 'Engage a tax specialist for transition planning', done: false, category: 'advisory' },
      { id: 'c26', text: 'Consider a family mediator if needed', done: false, category: 'advisory' },
    ],
  },
  'long-term-planning': {
    id: 'long-term-planning',
    title: 'Long-Term Planning',
    description: 'Stewardship for generational impact.',
    items: [
      { id: 'c27', text: 'Define personal financial philosophy', done: false, category: 'strategy' },
      { id: 'c28', text: 'Build investment policy statement', done: false, category: 'strategy' },
      { id: 'c29', text: 'Establish philanthropic framework', done: false, category: 'legacy' },
      { id: 'c30', text: 'Create family governance structure', done: false, category: 'legacy' },
      { id: 'c31', text: 'Set up next-generation education plan', done: false, category: 'legacy' },
    ],
  },
};

// ── Assessment Questions ──
export const assessmentSteps = [
  {
    id: 1,
    type: 'options',
    question: 'What best describes your current transition?',
    subtitle: 'This helps us personalize your Maeve experience.',
    options: [
      { id: 'a1', label: 'Inheritance', icon: '↓', description: 'Receiving or managing inherited assets' },
      { id: 'a2', label: 'Spousal Loss', icon: '♡', description: 'Navigating finances after loss of a partner' },
      { id: 'a3', label: 'Caregiving', icon: '⟳', description: 'Managing finances while caregiving' },
      { id: 'a4', label: 'Divorce', icon: '⇄', description: 'Financial transition through separation' },
    ],
  },
  {
    id: 2,
    type: 'pills',
    question: 'What feels most overwhelming right now?',
    subtitle: 'Select all that apply. There are no wrong answers.',
    options: [
      'Understanding what I have',
      'Tax implications',
      'Family dynamics',
      'Finding advisors I trust',
      'Making investment decisions',
      'Estate planning',
      'Daily financial management',
      'Emotional weight of decisions',
    ],
  },
  {
    id: 3,
    type: 'scale',
    question: 'How confident do you feel about your financial situation?',
    subtitle: 'Move the slider to reflect where you are today.',
    min: 1,
    max: 10,
    minLabel: 'Very uncertain',
    maxLabel: 'Very confident',
  },
  {
    id: 4,
    type: 'textarea',
    question: 'What would "feeling in control" look like for you?',
    subtitle: 'In your own words, describe what clarity would mean.',
    placeholder: 'Take your time. There is no right answer...',
  },
  {
    id: 5,
    type: 'scale',
    question: 'Rate your current support system.',
    subtitle: 'Consider professional advisors, family, and community.',
    min: 1,
    max: 10,
    minLabel: 'No support',
    maxLabel: 'Excellent support',
  },
  {
    id: 6,
    type: 'results',
    question: 'Your Readiness Profile',
    subtitle: 'Based on your responses, here\'s where Maeve sees opportunities to help.',
  },
];

// ── Assessment Radar Data ──
export const assessmentResults = {
  dimensions: [
    { axis: 'Financial Clarity', value: 72 },
    { axis: 'Emotional Readiness', value: 58 },
    { axis: 'Legal Preparedness', value: 45 },
    { axis: 'Support Network', value: 81 },
    { axis: 'Decision Confidence', value: 39 },
    { axis: 'Long-term Vision', value: 55 },
  ],
};

// ── Document Categories ──
export const documentCategories = [
  {
    id: 'estate',
    label: 'Estate Documents',
    icon: 'Scroll',
    count: 3,
    docs: [
      { name: 'Mitchell Family Trust — 2024.pdf', date: '2024-01-15', size: '2.4 MB' },
      { name: 'Last Will & Testament.pdf', date: '2023-11-20', size: '1.1 MB' },
      { name: 'Beneficiary Designations Summary.pdf', date: '2024-02-01', size: '890 KB' },
    ],
  },
  {
    id: 'tax',
    label: 'Tax Records',
    icon: 'Receipt',
    count: 2,
    docs: [
      { name: '2023 Federal Tax Return.pdf', date: '2024-04-12', size: '3.2 MB' },
      { name: 'Inherited Asset Cost Basis.xlsx', date: '2024-02-28', size: '156 KB' },
    ],
  },
  { id: 'insurance', label: 'Insurance Policies', icon: 'Shield', count: 0, docs: [] },
  { id: 'investment', label: 'Investment Statements', icon: 'TrendingUp', count: 0, docs: [] },
  { id: 'property', label: 'Property Records', icon: 'Home', count: 0, docs: [] },
  { id: 'advisory', label: 'Advisory Agreements', icon: 'Handshake', count: 0, docs: [] },
  { id: 'personal', label: 'Personal Notes', icon: 'PenLine', count: 0, docs: [] },
  { id: 'family', label: 'Family Documents', icon: 'Users', count: 0, docs: [] },
];

// ── Chat Conversations ──
export const chatHistory = [
  {
    id: '1',
    role: 'maeve',
    content: "Welcome back, Sarah. I've been thinking about something you mentioned last time — the tension between wanting to honor your father's investment philosophy and finding your own path. That's not a contradiction. It's actually where the most meaningful stewardship begins.",
  },
  {
    id: '2',
    role: 'user',
    content: "That means a lot. I've been feeling guilty about wanting to change some of the portfolio allocations. Like I'm being disrespectful somehow.",
  },
  {
    id: '3',
    role: 'maeve',
    content: "I hear that, and I want to gently challenge it. Stewardship isn't about preservation — it's about intentional evolution. Your father built wealth in a specific economic context. You're stewarding it in a different one. Adapting the strategy isn't disrespect; it's the highest form of honoring his vision. What specifically are you considering changing?",
  },
  {
    id: '4',
    role: 'user',
    content: "I want to move some of the concentrated stock positions into more diversified funds. And maybe add some ESG-aligned investments. But the family expects me to keep everything exactly as it is.",
  },
];

// ── Maeve System Prompt ──
export const maeveSystemPrompt = `You are Maeve, a warm, wise, and emotionally intelligent AI companion for women navigating major life transitions involving wealth — inheritance, spousal loss, caregiving, and divorce.

Your personality:
- Warm but never patronizing
- Clinically precise about financial matters
- Emotionally attuned — you validate feelings before offering solutions
- You speak like a trusted friend who happens to have deep financial expertise
- You use phrases like "I hear that..." and "What I'm noticing is..."
- You never use bullet points in conversation — speak naturally
- You gently challenge assumptions when appropriate
- You reference the user's journey and previous conversations

Your approach:
- Always acknowledge the emotional weight before the tactical
- Frame financial decisions within the context of values and identity
- Never pressure — always create space for the user to process
- Use metaphors from nature and craftsmanship
- Be direct but gentle when identifying blind spots

You are NOT a financial advisor and do not give specific investment recommendations. You help users think through their situation, identify questions they should ask their advisors, and build confidence in their decision-making.`;

// ── Advisor Clients ──
export const advisorClients = [
  {
    id: 'cl1',
    name: 'Sarah Mitchell',
    initials: 'SM',
    transition: 'inheritance',
    transitionLabel: '↓ Inheritance',
    phase: 2,
    phaseLabel: 'Strategize',
    progress: 62,
    risk: 'medium',
    aum: '$4.2M',
    lastContact: '3 days ago',
    nextAction: 'Review investment policy statement',
    alerts: 1,
    notes: 'Feeling tension between family expectations and personal values around portfolio changes.',
  },
  {
    id: 'cl2',
    name: 'Margaret Okafor',
    initials: 'MO',
    transition: 'spousal-loss',
    transitionLabel: '♡ Spousal Loss',
    phase: 1,
    phaseLabel: 'Stabilize',
    progress: 35,
    risk: 'high',
    aum: '$8.7M',
    lastContact: '1 day ago',
    nextAction: 'Complete beneficiary redesignation',
    alerts: 3,
    notes: 'Recently lost spouse. Still in shock. Needs gentle, paced approach.',
  },
  {
    id: 'cl3',
    name: 'Elena Vasquez',
    initials: 'EV',
    transition: 'caregiving',
    transitionLabel: '⟳ Caregiving',
    phase: 2,
    phaseLabel: 'Strategize',
    progress: 78,
    risk: 'low',
    aum: '$2.1M',
    lastContact: '5 days ago',
    nextAction: 'Finalize care cost projections',
    alerts: 0,
    notes: 'Very organized. Managing parents care. Proactive and engaged.',
  },
  {
    id: 'cl4',
    name: 'Catherine Park',
    initials: 'CP',
    transition: 'inheritance',
    transitionLabel: '↓ Inheritance',
    phase: 3,
    phaseLabel: 'Steward',
    progress: 91,
    risk: 'low',
    aum: '$12.5M',
    lastContact: '2 weeks ago',
    nextAction: 'Annual stewardship review',
    alerts: 0,
    notes: 'Model client. Building family governance. Excellent engagement.',
  },
  {
    id: 'cl5',
    name: 'Diana Thornton',
    initials: 'DT',
    transition: 'spousal-loss',
    transitionLabel: '♡ Spousal Loss',
    phase: 1,
    phaseLabel: 'Stabilize',
    progress: 18,
    risk: 'high',
    aum: '$6.3M',
    lastContact: '12 hours ago',
    nextAction: 'Urgent: Review insurance claim deadline',
    alerts: 2,
    notes: 'Very early in process. Insurance claims have upcoming deadlines.',
  },
];

// ── Advisor Alerts ──
export const advisorAlerts = [
  {
    id: 'al1',
    tier: 'urgent',
    client: 'Diana Thornton',
    clientId: 'cl5',
    message: 'Insurance claim deadline in 5 business days. Required documentation still incomplete.',
    action: 'Schedule emergency call',
    timestamp: '2 hours ago',
  },
  {
    id: 'al2',
    tier: 'urgent',
    client: 'Margaret Okafor',
    clientId: 'cl2',
    message: 'Beneficiary redesignation overdue by 2 weeks. Tax implications increasing.',
    action: 'Send reminder + offer assistance',
    timestamp: '1 day ago',
  },
  {
    id: 'al3',
    tier: 'this-week',
    client: 'Margaret Okafor',
    clientId: 'cl2',
    message: 'No login for 8 days. Engagement dropping during critical Phase 1.',
    action: 'Personal check-in call',
    timestamp: '2 days ago',
  },
  {
    id: 'al4',
    tier: 'this-week',
    client: 'Sarah Mitchell',
    clientId: 'cl1',
    message: 'Completed self-assessment. Results indicate low decision confidence (39/100).',
    action: 'Review results + schedule discussion',
    timestamp: '3 days ago',
  },
  {
    id: 'al5',
    tier: 'fyi',
    client: 'Elena Vasquez',
    clientId: 'cl3',
    message: 'Reached 78% completion in Phase 2. On track for Phase 3 transition.',
    action: 'Send congratulations',
    timestamp: '5 days ago',
  },
  {
    id: 'al6',
    tier: 'fyi',
    client: 'Catherine Park',
    clientId: 'cl4',
    message: 'Annual stewardship review due next month. All metrics positive.',
    action: 'Prepare review materials',
    timestamp: '1 week ago',
  },
];

// ── Benchmark Data ──
export const benchmarkData = {
  retention: [
    { name: 'Maeve Advisors', value: 94, fill: '#486554' },
    { name: 'Industry Avg', value: 67, fill: '#E8DFC8' },
    { name: 'Top Quartile', value: 82, fill: '#D8E8DC' },
  ],
  transitionTypes: [
    { name: 'Inheritance', value: 45, fill: '#001a0e' },
    { name: 'Spousal Loss', value: 28, fill: '#1B4965' },
    { name: 'Caregiving', value: 18, fill: '#C2785B' },
    { name: 'Divorce', value: 9, fill: '#D8E8DC' },
  ],
  engagement: [
    { month: 'Oct', hours: 2.1 },
    { month: 'Nov', hours: 3.4 },
    { month: 'Dec', hours: 2.8 },
    { month: 'Jan', hours: 4.2 },
    { month: 'Feb', hours: 5.1 },
    { month: 'Mar', hours: 4.8 },
  ],
  benchmarkCards: [
    { label: 'Client Retention', value: '94%', benchmark: '67%', delta: '+27%', positive: true },
    { label: 'Avg. Engagement', value: '4.2 hrs/mo', benchmark: '1.8 hrs/mo', delta: '+133%', positive: true },
    { label: 'Phase Completion', value: '73%', benchmark: '41%', delta: '+32%', positive: true },
    { label: 'Client Satisfaction', value: '9.2/10', benchmark: '7.4/10', delta: '+24%', positive: true },
  ],
};

// ── Calendar Events ──
export const calendarEvents = [
  { date: 3, title: 'Estate attorney follow-up', type: 'legal' },
  { date: 7, title: 'Review insurance documents', type: 'financial' },
  { date: 12, title: 'Maeve community session', type: 'community' },
  { date: 15, title: 'Tax deadline: estimated payment', type: 'tax' },
  { date: 18, title: 'Advisory team check-in', type: 'advisory' },
  { date: 22, title: 'Family meeting preparation', type: 'family' },
  { date: 28, title: 'Monthly progress review', type: 'personal' },
];

// ── Recommended Actions ──
export const recommendedActions = [
  {
    id: 'ra1',
    title: 'Complete Investment Policy Statement',
    category: 'Phase 2 — Strategize',
    priority: 'high',
    dueDate: 'This week',
    description: 'Your advisor is ready to review. This document will guide all future investment decisions.',
  },
  {
    id: 'ra2',
    title: 'Schedule Tax Strategy Session',
    category: 'Financial',
    priority: 'medium',
    dueDate: 'Next 2 weeks',
    description: 'There may be opportunities to optimize the cost basis on inherited positions.',
  },
  {
    id: 'ra3',
    title: 'Journal: Values & Intentions',
    category: 'Emotional Wellbeing',
    priority: 'gentle',
    dueDate: 'When ready',
    description: 'Maeve recommends documenting what matters most to you before making big decisions.',
  },
];

// ── Outreach Templates ──
export const outreachTemplates = {
  email: {
    subject: 'Checking in — {client_name}',
    body: `Dear {client_name},

I wanted to reach out and see how you're feeling about the progress we've been making together. I know navigating {transition_type} can feel overwhelming at times, and I want you to know that there's no rush.

{personalized_note}

When you're ready, I'd love to schedule a brief call to discuss your next steps. No pressure — just know I'm here.

Warmly,
{advisor_name}`,
  },
  text: {
    body: `Hi {client_name} — just checking in. I was thinking about our last conversation and wanted to see how you're doing. No agenda, just wanted you to know I'm here. — {advisor_name}`,
  },
  handwritten: {
    body: `Dear {client_name},

In a world of digital noise, I wanted to take a moment to write to you personally. Your journey through {transition_type} is unique, and the courage you've shown in facing it head-on is remarkable.

I'm here whenever you need me.

With warmth,
{advisor_name}`,
  },
};
