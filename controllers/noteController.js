const noteModel = require("../models/note.model");
const userModel = require("../models/user.model");

const userNotes = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId).populate("notes");
    if (!user) return res.status(404).send("user does not exist");

    res.render("notes", {user});
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNote = async (req, res) => {
    const {title, description} = req.body;

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).send("note created successfully");
}

module.exports = {userNotes, createNote};
