/**
 * Static dashboard widgets (not meeting list data).
 * Meeting lists are loaded from the API via meetingService.
 */
export const STATS = [
  {
    label: "Total Meetings",
    value: "—",
    trend: "+12%",
    trendLabel: "vs last month",
    positive: true,
    icon: "Video",
  },
  {
    label: "AI Summaries",
    value: "—",
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
