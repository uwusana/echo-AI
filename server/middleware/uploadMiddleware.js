const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

const ALLOWED_MIME_TYPES = new Set([
  // Audio
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/aac",
  "audio/ogg",
  "audio/webm",
  // Video
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  "video/x-matroska",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".mp3",
  ".wav",
  ".m4a",
  ".aac",
  ".ogg",
  ".mp4",
  ".mov",
  ".webm",
  ".avi",
  ".mkv",
]);

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function getExtension(originalName = "") {
  const ext = path.extname(originalName).toLowerCase();
  return ext || "";
}

function isAllowedFile(file) {
  const ext = getExtension(file.originalname);
  const mime = (file.mimetype || "").toLowerCase();

  const mimeOk =
    ALLOWED_MIME_TYPES.has(mime) ||
    mime.startsWith("audio/") ||
    mime.startsWith("video/");

  const extOk = !ext || ALLOWED_EXTENSIONS.has(ext);

  return mimeOk && extOk;
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename(_req, file, cb) {
    const ext = getExtension(file.originalname);
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (_req, file, cb) => {
  if (isAllowedFile(file)) {
    cb(null, true);
    return;
  }

  cb(new Error("Only audio and video files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload;
