const express = require("express");
const {createNote, deleteNote, updateNote, showNoteForUpdate} = require("../controllers/noteController");
const authmiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authmiddleware, createNote);
router.get("/:id/delete", authmiddleware, deleteNote);
router.get("/:id/update", authmiddleware, showNoteForUpdate);
router.post("/:id/update", authmiddleware, updateNote);

module.exports = router;  