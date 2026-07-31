import api from "@/lib/api";

const STATUS_MAP = {
  uploaded: "Pending",
  processing: "Processing",
  completed: "Complete",
  failed: "Failed",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes) {
  const mins = Number(minutes) || 0;
  return `${mins} min`;
}

function formatBytes(bytes = 0) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDueDate(value) {
  if (!value) return "—";
  return formatDate(value);
}

/**
 * Map API meeting → list/table row shape expected by the UI.
 */
export function mapMeetingListItem(meeting) {
  return {
    id: meeting._id,
    title: meeting.title,
    date: formatDate(meeting.createdAt),
    duration: formatDuration(meeting.duration),
    summaryStatus: STATUS_MAP[meeting.status] ?? "Pending",
    participants: meeting.participants ?? [],
    priority: meeting.priority ?? null,
    aiScore: meeting.productivityScore ?? meeting.aiConfidence ?? 0,
    status: meeting.status,
    tags: meeting.tags ?? [],
    createdAt: meeting.createdAt,
  };
}

/**
 * Map API meeting → detail page shape expected by existing detail components.
 */
export function mapMeetingDetail(meeting) {
  const listFields = mapMeetingListItem(meeting);
  const summaryText =
    typeof meeting.summary === "string" ? meeting.summary.trim() : "";

  return {
    ...listFields,
    language: meeting.language || "English",
    recordingSize: formatBytes(meeting.fileSize),
    processingTime: "—",
    createdBy: meeting.participants?.[0] || "Unknown",
    tags: meeting.tags?.length ? meeting.tags : ["Meeting"],
    summary: {
      executive:
        summaryText ||
        "Summary will appear once AI processing is complete.",
      discussionPoints: summaryText
        ? [summaryText]
        : ["No discussion points available yet."],
      nextSteps: meeting.actionItems?.length
        ? meeting.actionItems.map((item) => item.task).filter(Boolean)
        : ["No next steps available yet."],
    },
    actionItems: (meeting.actionItems ?? []).map((item, index) => ({
      id: item._id || `action-${index}`,
      task: item.task,
      assignee: item.assignee || "Unassigned",
      dueDate: formatDueDate(item.dueDate),
      priority: item.priority || null,
      completed: Boolean(item.completed),
    })),
    decisions: (meeting.keyDecisions ?? []).map((decision, index) => ({
      id: `decision-${index}`,
      decision:
        typeof decision === "string" ? decision : decision?.decision || "",
      owner: meeting.participants?.[0] || "Unassigned",
      timestamp: formatDate(meeting.updatedAt || meeting.createdAt),
    })),
    transcript: meeting.transcript
      ? [
          {
            id: "t1",
            speaker: meeting.participants?.[0] || "Speaker",
            timestamp: "00:00",
            message: meeting.transcript,
          },
        ]
      : [],
    insights: {
      productivityScore: meeting.productivityScore ?? 0,
      aiConfidence: meeting.aiConfidence ?? 0,
      sentiment: meeting.sentiment || "Neutral",
      sentimentScore: meeting.aiConfidence ?? 0,
      speakingBalance: meeting.productivityScore ?? 0,
      engagement: meeting.aiConfidence ?? 0,
    },
    attachments: meeting.originalFileName
      ? [
          {
            id: "f1",
            name: meeting.originalFileName,
            size: formatBytes(meeting.fileSize),
            type: meeting.fileType?.startsWith("video") ? "image" : "audio",
          },
        ]
      : [],
    activity: [
      {
        id: "act1",
        label: "Meeting Uploaded",
        time: `${formatDate(meeting.createdAt)} · Uploaded`,
      },
      ...(meeting.status === "completed" || meeting.summary
        ? [
            {
              id: "act2",
              label: "Summary Generated",
              time: `${formatDate(meeting.updatedAt || meeting.createdAt)} · Processed`,
            },
          ]
        : []),
    ],
  };
}

function getErrorMessage(error, fallback) {
  return error?.message || fallback;
}

/**
 * Fetch all meetings (newest first from API).
 */
export async function getAllMeetings() {
  try {
    const { data } = await api.get("/meetings");
    const meetings = data?.data ?? [];
    return meetings.map(mapMeetingListItem);
  } catch (error) {
    console.error("getAllMeetings:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch meetings"));
  }
}

/**
 * Fetch a single meeting by id.
 */
export async function getMeetingById(id) {
  try {
    const { data } = await api.get(`/meetings/${id}`);
    if (!data?.data) return null;
    return mapMeetingDetail(data.data);
  } catch (error) {
    if (error.status === 404) return null;
    console.error("getMeetingById:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch meeting"));
  }
}

/**
 * Create a meeting via multipart/form-data.
 * Expects FormData with `title` and `recording` fields.
 * @param {FormData} formData
 */
export async function createMeeting(formData) {
  try {
    if (!(formData instanceof FormData)) {
      throw new Error("FormData with a recording file is required");
    }

    if (!formData.get("recording")) {
      throw new Error("Recording file is required");
    }

    const { data: response } = await api.post("/meetings", formData, {
      headers: {
        "Content-Type": undefined,
      },
      timeout: 120000,
    });

    return mapMeetingListItem(response.data);
  } catch (error) {
    console.error("createMeeting:", error);
    throw new Error(getErrorMessage(error, "Failed to create meeting"));
  }
}

/**
 * Partially update a meeting (e.g. priority).
 */
export async function updateMeeting(id, updates = {}) {
  try {
    const { data: response } = await api.patch(`/meetings/${id}`, updates);
    return mapMeetingDetail(response.data);
  } catch (error) {
    console.error("updateMeeting:", error);
    throw new Error(getErrorMessage(error, "Failed to update meeting"));
  }
}
