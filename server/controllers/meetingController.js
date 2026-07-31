const Meeting = require("../models/Meeting");
const path = require("path");
const { extractMediaMetadata } = require("../services/mediaMetadata");
const { processMeeting } = require("../services/meetingProcessor");

/**
 * GET /meetings
 * Fetch all meetings, newest first.
 */
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    console.error("getAllMeetings error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
      error: error.message,
    });
  }
};

/**
 * GET /meetings/:id
 * Fetch a single meeting by ID.
 */
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    console.error("getMeetingById error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch meeting",
      error: error.message,
    });
  }
};

/**
 * POST /meetings
 * Create a meeting from multipart/form-data with a single "recording" file.
 */
const createMeeting = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Recording file is required. Upload a file using the 'recording' field.",
      });
    }

    const originalFileName = req.file.originalname;
    const storedFileName = req.file.filename;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;
    const absolutePath = req.file.path;

    const titleFromBody = req.body?.title?.trim();
    const titleFromFile = path.parse(originalFileName).name;
    const title = titleFromBody || titleFromFile || "Untitled Meeting";

    const metadata = await extractMediaMetadata({
      filePath: absolutePath,
      mimeType: fileType,
      fileSize,
    });

    const meeting = await Meeting.create({
      title,
      originalFileName,
      storedFileName,
      fileType: metadata.mimeType || fileType,
      fileSize: metadata.fileSize ?? fileSize,
      duration: metadata.duration,
      participants: [],
      language: null,
      languageConfidence: null,
      status: "uploaded",
      priority: null,
      transcript: "",
      summary: "",
      actionItems: [],
      keyDecisions: [],
      tags: [],
      sentiment: "",
      productivityScore: null,
      aiConfidence: null,
    });

    // Kick off AI processing without blocking the upload response.
    setImmediate(() => {
      processMeeting(meeting._id).catch((error) => {
        console.error(
          `[createMeeting] Unhandled processMeeting error for ${meeting._id}:`,
          error.message
        );
      });
    });

    return res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (error) {
    console.error("createMeeting error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create meeting",
      error: error.message,
    });
  }
};

/**
 * PATCH /meetings/:id
 * Partially update a meeting (e.g. priority).
 */
const updateMeeting = async (req, res) => {
  try {
    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body || {}, "priority")) {
      const { priority } = req.body;
      const allowed = ["low", "medium", "high", "critical"];

      if (priority === null || priority === "" || priority === undefined) {
        updates.priority = null;
      } else if (allowed.includes(priority)) {
        updates.priority = priority;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid priority value",
        });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      data: meeting,
    });
  } catch (error) {
    console.error("updateMeeting error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update meeting",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
};
