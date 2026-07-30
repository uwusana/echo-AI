import { MEETINGS } from "@/components/dashboard/home/data";

/**
 * Rich meeting-detail payloads keyed by meeting id.
 * Falls back to a generated detail object for any unknown id.
 */
const DETAIL_OVERRIDES = {
  1: {
    language: "English",
    recordingSize: "84.2 MB",
    processingTime: "2m 14s",
    createdBy: "Sarah K.",
    tags: ["Product", "Strategy", "Q1", "Roadmap", "High Priority"],
    summary: {
      executive:
        "The team aligned on Q1 product priorities, focusing on integrations, AI summary quality, and enterprise readiness. Leadership confirmed budget for two new platform initiatives and deferred the mobile redesign to Q2.",
      discussionPoints: [
        "Prioritize Slack and Google Calendar integrations for the April release.",
        "Raise AI summary confidence threshold to 85% before auto-sharing.",
        "Enterprise SSO remains on track for late Q1.",
        "Defer mobile redesign exploration until after the April launch.",
      ],
      nextSteps: [
        "Marcus to finalize integration scope by Friday.",
        "Elena to draft enterprise SSO milestone plan.",
        "James to circulate revised Q1 OKRs to leadership.",
      ],
    },
    actionItems: [
      {
        id: "a1",
        task: "Finalize Slack & Calendar integration scope",
        assignee: "Marcus L.",
        dueDate: "Apr 3, 2026",
        priority: "High",
        completed: false,
      },
      {
        id: "a2",
        task: "Draft enterprise SSO milestone plan",
        assignee: "Elena R.",
        dueDate: "Apr 4, 2026",
        priority: "High",
        completed: false,
      },
      {
        id: "a3",
        task: "Circulate revised Q1 OKRs",
        assignee: "James T.",
        dueDate: "Mar 31, 2026",
        priority: "Medium",
        completed: true,
      },
      {
        id: "a4",
        task: "Share competitive teardown with product",
        assignee: "Sarah K.",
        dueDate: "Apr 2, 2026",
        priority: "Low",
        completed: false,
      },
    ],
    decisions: [
      {
        id: "d1",
        decision: "Ship integrations before mobile redesign",
        owner: "Sarah K.",
        timestamp: "10:18 AM",
      },
      {
        id: "d2",
        decision: "Raise AI auto-share confidence to 85%",
        owner: "Marcus L.",
        timestamp: "10:34 AM",
      },
      {
        id: "d3",
        decision: "Approve budget for enterprise SSO track",
        owner: "James T.",
        timestamp: "10:51 AM",
      },
    ],
    transcript: [
      {
        id: "t1",
        speaker: "Sarah K.",
        timestamp: "10:02",
        message:
          "Let's start with Q1 priorities. Integrations still feel like the highest leverage bet.",
      },
      {
        id: "t2",
        speaker: "Marcus L.",
        timestamp: "10:05",
        message:
          "Agreed. Slack and Calendar unlock the most daily usage based on last month's interviews.",
      },
      {
        id: "t3",
        speaker: "Elena R.",
        timestamp: "10:12",
        message:
          "Enterprise SSO is close. If we protect the current timeline we can still hit late Q1.",
      },
      {
        id: "t4",
        speaker: "James T.",
        timestamp: "10:21",
        message:
          "I'm comfortable delaying mobile if it protects the April integrations release.",
      },
    ],
    insights: {
      productivityScore: 92,
      aiConfidence: 94,
      sentiment: "Positive",
      sentimentScore: 86,
      speakingBalance: 78,
      engagement: 91,
    },
    attachments: [
      { id: "f1", name: "Q1Strategy.mp3", size: "84.2 MB", type: "audio" },
      { id: "f2", name: "ProductOKRs.pdf", size: "1.4 MB", type: "pdf" },
      { id: "f3", name: "Roadmap.png", size: "620 KB", type: "image" },
    ],
    activity: [
      { id: "act1", label: "Meeting Uploaded", time: "Mar 28 · 11:02 AM" },
      { id: "act2", label: "Summary Generated", time: "Mar 28 · 11:05 AM" },
      { id: "act3", label: "Shared with Team", time: "Mar 28 · 11:40 AM" },
      { id: "act4", label: "Exported PDF", time: "Mar 28 · 2:15 PM" },
    ],
  },
  2: {
    language: "English",
    recordingSize: "61.8 MB",
    processingTime: "1m 48s",
    createdBy: "Marcus L.",
    tags: ["Engineering", "Sprint", "Planning", "Q2", "High Priority"],
    summary: {
      executive:
        "Sprint planning locked a focused set of deliverables around transcript accuracy, meeting detail UX, and reliability improvements. The team committed to a two-week sprint with clear ownership and reduced WIP.",
      discussionPoints: [
        "Improve speaker diarization accuracy on noisy recordings.",
        "Ship the Meeting Details experience with AI summary + action items.",
        "Reduce processing failures on large audio uploads.",
        "Keep the sprint WIP limit to six active tickets.",
      ],
      nextSteps: [
        "Priya to open the Meeting Details tickets today.",
        "Alex to profile upload failure rates by file size.",
        "David to propose diarization quality benchmarks.",
      ],
    },
    actionItems: [
      {
        id: "a1",
        task: "Create Meeting Details implementation tickets",
        assignee: "Priya S.",
        dueDate: "Mar 28, 2026",
        priority: "High",
        completed: true,
      },
      {
        id: "a2",
        task: "Benchmark speaker diarization on noisy samples",
        assignee: "David P.",
        dueDate: "Apr 1, 2026",
        priority: "High",
        completed: false,
      },
      {
        id: "a3",
        task: "Investigate large file upload failures",
        assignee: "Alex W.",
        dueDate: "Mar 31, 2026",
        priority: "Medium",
        completed: false,
      },
      {
        id: "a4",
        task: "Update sprint board WIP limits",
        assignee: "Marcus L.",
        dueDate: "Mar 28, 2026",
        priority: "Low",
        completed: true,
      },
    ],
    decisions: [
      {
        id: "d1",
        decision: "Prioritize Meeting Details UX in this sprint",
        owner: "Marcus L.",
        timestamp: "09:14 AM",
      },
      {
        id: "d2",
        decision: "Cap active sprint tickets at six",
        owner: "Priya S.",
        timestamp: "09:27 AM",
      },
      {
        id: "d3",
        decision: "Treat upload reliability as a P1 theme",
        owner: "Alex W.",
        timestamp: "09:41 AM",
      },
    ],
    transcript: [
      {
        id: "t1",
        speaker: "Marcus L.",
        timestamp: "09:01",
        message:
          "For this sprint I want us laser-focused — Meeting Details, diarization quality, and upload reliability.",
      },
      {
        id: "t2",
        speaker: "Priya S.",
        timestamp: "09:04",
        message:
          "I can break Meeting Details into summary, action items, and insights panels today.",
      },
      {
        id: "t3",
        speaker: "David P.",
        timestamp: "09:11",
        message:
          "Diarization drops hardest on overlapping speech. I'll pull a noisy sample set this week.",
      },
      {
        id: "t4",
        speaker: "Alex W.",
        timestamp: "09:19",
        message:
          "Upload failures spike above 80MB. I can instrument that path and propose a fix.",
      },
    ],
    insights: {
      productivityScore: 88,
      aiConfidence: 91,
      sentiment: "Focused",
      sentimentScore: 82,
      speakingBalance: 84,
      engagement: 89,
    },
    attachments: [
      { id: "f1", name: "SprintPlanning.mp3", size: "61.8 MB", type: "audio" },
      { id: "f2", name: "MeetingNotes.pdf", size: "890 KB", type: "pdf" },
      { id: "f3", name: "Roadmap.png", size: "540 KB", type: "image" },
    ],
    activity: [
      { id: "act1", label: "Meeting Uploaded", time: "Mar 27 · 9:48 AM" },
      { id: "act2", label: "Summary Generated", time: "Mar 27 · 9:50 AM" },
      { id: "act3", label: "Shared with Team", time: "Mar 27 · 10:12 AM" },
      { id: "act4", label: "Exported PDF", time: "Mar 27 · 4:05 PM" },
    ],
  },
};

function buildFallbackDetail(meeting) {
  const shortTitle = meeting.title.split("—")[0].trim().split(":")[0].trim();
  const tags = [
    meeting.priority === "High" ? "High Priority" : meeting.priority,
    "Meeting",
    "AI Summary",
  ];

  return {
    language: "English",
    recordingSize: "48.5 MB",
    processingTime: "1m 32s",
    createdBy: meeting.participants[0] ?? "Unknown",
    tags,
    summary: {
      executive: `EchoAI generated a structured overview of "${meeting.title}". The discussion covered priorities, ownership, and follow-ups aligned to the team's current goals.`,
      discussionPoints: [
        `Reviewed goals related to ${shortTitle}.`,
        "Clarified ownership for outstanding action items.",
        "Aligned on next checkpoints and communication cadence.",
      ],
      nextSteps: [
        `${meeting.participants[0] ?? "Owner"} to circulate notes to attendees.`,
        "Confirm action-item due dates before the next sync.",
        "Revisit open decisions in the following weekly meeting.",
      ],
    },
    actionItems: [
      {
        id: "a1",
        task: `Follow up on outcomes from ${shortTitle}`,
        assignee: meeting.participants[0] ?? "Unassigned",
        dueDate: "Apr 2, 2026",
        priority: meeting.priority,
        completed: meeting.summaryStatus === "Complete",
      },
      {
        id: "a2",
        task: "Share AI summary with attendees",
        assignee: meeting.participants[1] ?? meeting.participants[0] ?? "Unassigned",
        dueDate: "Apr 1, 2026",
        priority: "Medium",
        completed: false,
      },
      {
        id: "a3",
        task: "Schedule follow-up if needed",
        assignee: meeting.participants[2] ?? meeting.participants[0] ?? "Unassigned",
        dueDate: "Apr 5, 2026",
        priority: "Low",
        completed: false,
      },
    ],
    decisions: [
      {
        id: "d1",
        decision: `Proceed with agreed direction from ${shortTitle}`,
        owner: meeting.participants[0] ?? "Unassigned",
        timestamp: "10:20 AM",
      },
      {
        id: "d2",
        decision: "Track action items in EchoAI going forward",
        owner: meeting.participants[1] ?? meeting.participants[0] ?? "Unassigned",
        timestamp: "10:36 AM",
      },
    ],
    transcript: [
      {
        id: "t1",
        speaker: meeting.participants[0] ?? "Speaker",
        timestamp: "10:01",
        message: `Thanks everyone for joining ${shortTitle}. Let's walk through the agenda.`,
      },
      {
        id: "t2",
        speaker: meeting.participants[1] ?? meeting.participants[0] ?? "Speaker",
        timestamp: "10:08",
        message:
          "I can take the first follow-up and make sure notes are shared after this call.",
      },
      {
        id: "t3",
        speaker: meeting.participants[2] ?? meeting.participants[0] ?? "Speaker",
        timestamp: "10:17",
        message:
          "Sounds good. Let's lock owners before we wrap so nothing falls through.",
      },
    ],
    insights: {
      productivityScore: meeting.aiScore,
      aiConfidence: Math.min(98, meeting.aiScore + 3),
      sentiment:
        meeting.aiScore >= 85
          ? "Positive"
          : meeting.aiScore >= 70
            ? "Neutral"
            : "Mixed",
      sentimentScore: Math.max(55, meeting.aiScore - 6),
      speakingBalance: Math.max(60, meeting.aiScore - 8),
      engagement: Math.min(96, meeting.aiScore + 2),
    },
    attachments: [
      {
        id: "f1",
        name: `${shortTitle.replace(/\s+/g, "")}.mp3`,
        size: "48.5 MB",
        type: "audio",
      },
      { id: "f2", name: "MeetingNotes.pdf", size: "720 KB", type: "pdf" },
    ],
    activity: [
      {
        id: "act1",
        label: "Meeting Uploaded",
        time: `${meeting.date} · 9:40 AM`,
      },
      {
        id: "act2",
        label: "Summary Generated",
        time: `${meeting.date} · 9:43 AM`,
      },
      {
        id: "act3",
        label: "Shared with Team",
        time: `${meeting.date} · 10:15 AM`,
      },
    ],
  };
}

export function getMeetingDetail(id) {
  const numericId = Number(id);
  const meeting = MEETINGS.find((item) => item.id === numericId);

  if (!meeting) return null;

  const override = DETAIL_OVERRIDES[numericId] ?? buildFallbackDetail(meeting);

  return {
    ...meeting,
    ...override,
  };
}
