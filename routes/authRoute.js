const express = require("express");
const { login, register, logout } = require("../controllers/authConroller");
const {userNotes} = require("../controllers/noteController");
// const authmiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id/notes", userNotes);

module.exports = router;  