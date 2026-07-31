const Meeting = require("../models/Meeting");

const SIMULATED_AI_DELAY_MS = 3000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Asynchronous AI processing pipeline for a meeting.
 *
 * Current behavior (placeholder):
 * 1. Mark status as "processing"
 * 2. Simulate AI work
 * 3. Mark status as "completed"
 *
 * Future replacement points (Whisper + Gemini):
 * - Transcribe audio/video with Whisper → meeting.transcript
 * - Detect language → meeting.language + meeting.languageConfidence
 * - Generate summary / action items / insights with Gemini
 * - Extract participants from diarization
 *
 * @param {string|import("mongoose").Types.ObjectId} meetingId
 */
async function processMeeting(meetingId) {
  const id = String(meetingId);

  console.log(`[meetingProcessor] Starting AI pipeline for meeting ${id}`);

  try {
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      console.warn(`[meetingProcessor] Meeting not found: ${id}`);
      return;
    }

    // Step 1 — mark as processing
    meeting.status = "processing";
    await meeting.save();
    console.log(`[meetingProcessor] status=processing meeting=${id}`);

    // Step 2 — simulate AI work (replace with Whisper + Gemini)
    // TODO: Whisper transcription
    // TODO: Gemini summary / action items / insights
    console.log(
      `[meetingProcessor] Simulating AI work for ${SIMULATED_AI_DELAY_MS}ms (meeting=${id})`
    );
    await sleep(SIMULATED_AI_DELAY_MS);

    // Step 3 — mark as completed (no summary generation yet)
    const updated = await Meeting.findByIdAndUpdate(
      id,
      { $set: { status: "completed" } },
      { new: true }
    );

    if (!updated) {
      console.warn(
        `[meetingProcessor] Meeting missing after processing: ${id}`
      );
      return;
    }

    console.log(`[meetingProcessor] status=completed meeting=${id}`);
  } catch (error) {
    console.error(
      `[meetingProcessor] Pipeline failed for meeting ${id}:`,
      error.message
    );

    try {
      await Meeting.findByIdAndUpdate(id, { $set: { status: "failed" } });
      console.log(`[meetingProcessor] status=failed meeting=${id}`);
    } catch (updateError) {
      console.error(
        `[meetingProcessor] Failed to mark meeting ${id} as failed:`,
        updateError.message
      );
    }
  }
}

module.exports = {
  processMeeting,
};
