const mongoose = require("mongoose");

const actionItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    assignee: {
      type: String,
      default: "",
      trim: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const meetingSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    originalFileName: {
      type: String,
      required: [true, "Original file name is required"],
      trim: true,
    },
    storedFileName: {
      type: String,
      default: "",
      trim: true,
    },
    fileType: {
      type: String,
      default: "",
      trim: true,
    },
    fileSize: {
      type: Number,
      default: 0,
      min: [0, "File size cannot be negative"],
    },

    // Meeting Details
    duration: {
      type: Number,
      default: null,
      min: [0, "Duration cannot be negative"],
    },
    participants: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: null,
      trim: true,
    },
    languageConfidence: {
      type: Number,
      default: null,
      min: [0, "Language confidence must be between 0 and 100"],
      max: [100, "Language confidence must be between 0 and 100"],
    },
    priority: {
      type: String,
      default: null,
      validate: {
        validator(value) {
          return (
            value == null ||
            ["low", "medium", "high", "critical"].includes(value)
          );
        },
        message: "{VALUE} is not a valid priority",
      },
    },

    // Processing Status
    status: {
      type: String,
      enum: {
        values: ["uploaded", "processing", "completed", "failed"],
        message: "{VALUE} is not a valid meeting status",
      },
      default: "uploaded",
      index: true,
    },

    // AI Data
    transcript: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    actionItems: {
      type: [actionItemSchema],
      default: [],
    },
    keyDecisions: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },

    // AI Insights
    sentiment: {
      type: String,
      default: "",
      trim: true,
    },
    productivityScore: {
      type: Number,
      default: null,
      min: [0, "Productivity score must be between 0 and 100"],
      max: [100, "Productivity score must be between 0 and 100"],
    },
    aiConfidence: {
      type: Number,
      default: null,
      min: [0, "AI confidence must be between 0 and 100"],
      max: [100, "AI confidence must be between 0 and 100"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

meetingSchema.index({ createdAt: -1 });
meetingSchema.index({ title: "text", summary: "text", tags: "text" });

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
