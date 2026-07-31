const express = require("express");

const {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
} = require("../controllers/meetingController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

function handleUpload(req, res, next) {
  upload.single("recording")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum upload size is 500 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "File upload failed",
    });
  });
}

router.get("/", getAllMeetings);
router.get("/:id", getMeetingById);
router.post("/", handleUpload, createMeeting);
router.patch("/:id", updateMeeting);

module.exports = router;
