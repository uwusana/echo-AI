/**
 * Master list of dummy meetings for EchoAI.
 * Fields: title, date, duration, summaryStatus, participants, priority, aiScore
 */
export const MEETINGS = [
  {
    id: 1,
    title: "Q1 Product Strategy Sync",
    date: "Mar 28, 2026",
    duration: "47 min",
    summaryStatus: "Complete",
    participants: ["Sarah K.", "Marcus L.", "Elena R.", "James T."],
    priority: "High",
    aiScore: 92,
  },
  {
    id: 2,
    title: "Engineering Sprint Planning",
    date: "Mar 27, 2026",
    duration: "38 min",
    summaryStatus: "Complete",
    participants: ["Marcus L.", "David P.", "Priya S.", "Alex W."],
    priority: "Medium",
    aiScore: 88,
  },
  {
    id: 3,
    title: "Client Onboarding — Acme Corp",
    date: "Mar 27, 2026",
    duration: "61 min",
    summaryStatus: "Processing",
    participants: ["Elena R.", "Chris M.", "Nina V."],
    priority: "High",
    aiScore: 74,
  },
  {
    id: 4,
    title: "Design Review: Dashboard Redesign",
    date: "Mar 26, 2026",
    duration: "35 min",
    summaryStatus: "Complete",
    participants: ["Sarah K.", "Liam O.", "Elena R."],
    priority: "Medium",
    aiScore: 90,
  },
  {
    id: 5,
    title: "Weekly Leadership Sync",
    date: "Mar 25, 2026",
    duration: "52 min",
    summaryStatus: "Complete",
    participants: ["James T.", "Sarah K.", "Chris M.", "Nina V.", "David P."],
    priority: "High",
    aiScore: 95,
  },
  {
    id: 6,
    title: "Sales Pipeline Review",
    date: "Mar 24, 2026",
    duration: "44 min",
    summaryStatus: "Complete",
    participants: ["Chris M.", "Nina V.", "James T."],
    priority: "Medium",
    aiScore: 86,
  },
  {
    id: 7,
    title: "Customer Success QBR — Northwind",
    date: "Mar 23, 2026",
    duration: "58 min",
    summaryStatus: "Complete",
    participants: ["Nina V.", "Elena R.", "Chris M.", "Priya S."],
    priority: "High",
    aiScore: 91,
  },
  {
    id: 8,
    title: "Security & Compliance Audit Prep",
    date: "Mar 22, 2026",
    duration: "41 min",
    summaryStatus: "Complete",
    participants: ["David P.", "Alex W.", "James T."],
    priority: "High",
    aiScore: 89,
  },
  {
    id: 9,
    title: "Marketing Launch Planning",
    date: "Mar 21, 2026",
    duration: "33 min",
    summaryStatus: "Failed",
    participants: ["Liam O.", "Sarah K.", "Chris M."],
    priority: "Low",
    aiScore: 62,
  },
  {
    id: 10,
    title: "Engineering All-Hands",
    date: "Mar 20, 2026",
    duration: "29 min",
    summaryStatus: "Complete",
    participants: [
      "Marcus L.",
      "David P.",
      "Priya S.",
      "Alex W.",
      "Liam O.",
    ],
    priority: "Low",
    aiScore: 84,
  },
];

/** Recent meetings shown on the dashboard home table */
export const RECENT_MEETINGS = MEETINGS;

export const STATS = [
  {
    label: "Total Meetings",
    value: String(MEETINGS.length),
    trend: "+12%",
    trendLabel: "vs last month",
    positive: true,
    icon: "Video",
  },
  {
    label: "AI Summaries",
    value: String(
      MEETINGS.filter((m) => m.summaryStatus === "Complete").length
    ),
    trend: "+8%",
    trendLabel: "vs last month",
    positive: true,
    icon: "Sparkles",
  },
  {
    label: "Action Items",
    value: "37",
    trend: "-3%",
    trendLabel: "vs last month",
    positive: false,
    icon: "ListChecks",
  },
  {
    label: "Hours Saved",
    value: "46h",
    trend: "+18%",
    trendLabel: "vs last month",
    positive: true,
    icon: "Clock",
  },
];

export const AI_INSIGHTS = {
  weeklyProductivity: "+14%",
  weeklyProductivityLabel: "vs last week",
  mostDiscussedTopic: "Q1 Roadmap & Integrations",
  pendingActionItems: 12,
  averageMeetingLength: "42 min",
};
