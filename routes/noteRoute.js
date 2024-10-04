const express = require("express");
const {createNote} = require("../controllers/noteController");
const authmiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authmiddleware, createNote);

module.exports = router;  