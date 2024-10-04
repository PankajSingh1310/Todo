const noteModel = require("../models/note.model");
const userModel = require("../models/user.model");

const userNotes = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId).populate("notes");
    if (!user) return res.status(404).send("user does not exist");

    res.render("notes");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = userNotes;
