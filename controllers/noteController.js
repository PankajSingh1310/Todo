const noteModel = require("../models/note.model");
const userModel = require("../models/user.model");

const userNotes = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel
      .findById(userId)
      .populate("notes")
      .select("-password");
    if (!user) return res.status(404).send("user does not exist");

    res.render("notes", { user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = req.user;
    const userExist = await userModel
      .findOne({ email: user.email })
      .select("-password");

    const note = await noteModel.create({
      title,
      description,
      createdBy: userExist._id,
    });

    userExist.notes.push(note._id);
    await userExist.save();

    res.redirect(`/api/user/${userExist._id}/notes`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await noteModel.findOneAndDelete({
      _id: req.params.id,
    });

    const user = req.user;
    const userExist = await userModel
      .findOne({ email: user.email })
      .select("-password");

    await userModel.updateMany(
      { notes: req.params.id },
      { $pull: { notes: req.params.id } }
    );

    res.redirect(`/api/user/${userExist._id}/notes`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const showNoteForUpdate = async (req, res) => {
  try {
    const noteID = req.params.id;
    const note = await noteModel.findOne({ _id: noteID });
    res.render("update", { note });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const noteID = req.params.id;

    const deletedNote = await noteModel.findOneAndUpdate(
      { _id: noteID },
      { title, description }
    );

    res.redirect(`/api/user/${deletedNote.createdBy}/notes`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userNotes,
  createNote,
  deleteNote,
  updateNote,
  showNoteForUpdate,
};
