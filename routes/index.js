const express = require("express");
const { createUpload, getAllUpload } = require("../controllers/uploadControl");
const router = express.Router();

// GET all route in homepage
router.get("/", getAllUpload);

// POST upload form
router.post("/photo", createUpload);

module.exports = router;
