const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffprobeStatic = require("ffprobe-static");
const { parseFile } = require("music-metadata");

ffmpeg.setFfprobePath(ffprobeStatic.path);

/**
 * Round duration seconds → minutes with one decimal place.
 * @param {number} seconds
 * @returns {number|null}
 */
function secondsToMinutes(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  return Math.round((seconds / 60) * 10) / 10;
}

function isAudioMime(mimeType = "") {
  return mimeType.startsWith("audio/");
}

function isVideoMime(mimeType = "") {
  return mimeType.startsWith("video/");
}

/**
 * Extract duration (seconds) from an audio file via music-metadata.
 * @param {string} filePath
 * @returns {Promise<number|null>}
 */
async function extractAudioDurationSeconds(filePath) {
  const metadata = await parseFile(filePath);
  const seconds = metadata?.format?.duration;
  return Number.isFinite(seconds) ? seconds : null;
}

/**
 * Extract duration (seconds) from a video (or general media) file via ffprobe.
 * @param {string} filePath
 * @returns {Promise<number|null>}
 */
function extractVideoDurationSeconds(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (error, metadata) => {
      if (error) {
        reject(error);
        return;
      }

      const seconds = Number(metadata?.format?.duration);
      resolve(Number.isFinite(seconds) ? seconds : null);
    });
  });
}

/**
 * Extract media metadata for an uploaded recording.
 *
 * @param {object} options
 * @param {string} options.filePath - Absolute path to the stored file
 * @param {string} [options.mimeType] - MIME type from Multer
 * @param {number} [options.fileSize] - File size in bytes
 * @returns {Promise<{ duration: number|null, fileSize: number|null, mimeType: string, source: string }>}
 */
async function extractMediaMetadata({
  filePath,
  mimeType = "",
  fileSize = null,
} = {}) {
  const resolvedMime = mimeType || "";
  const result = {
    duration: null,
    fileSize: Number.isFinite(fileSize) ? fileSize : null,
    mimeType: resolvedMime,
    source: "none",
  };

  if (!filePath) {
    return result;
  }

  try {
    let durationSeconds = null;

    if (isAudioMime(resolvedMime)) {
      durationSeconds = await extractAudioDurationSeconds(filePath);
      result.source = "music-metadata";
    } else if (isVideoMime(resolvedMime)) {
      durationSeconds = await extractVideoDurationSeconds(filePath);
      result.source = "ffprobe";
    } else {
      // Fallback: try audio parser, then ffprobe
      try {
        durationSeconds = await extractAudioDurationSeconds(filePath);
        result.source = "music-metadata";
      } catch {
        durationSeconds = await extractVideoDurationSeconds(filePath);
        result.source = "ffprobe";
      }
    }

    result.duration = secondsToMinutes(durationSeconds);
    return result;
  } catch (error) {
    console.error(
      `extractMediaMetadata failed for ${path.basename(filePath)}:`,
      error.message
    );
    result.duration = null;
    result.source = "failed";
    return result;
  }
}

module.exports = {
  extractMediaMetadata,
  secondsToMinutes,
};
