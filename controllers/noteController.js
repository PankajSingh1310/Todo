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
    
    const user = req.user;             
    const userExist = await userModel.findOne({email: user.email}).select("-password");

    userExist.notes.push(note._id);
    await userExist.save();

    res.redirect(`/api/user/${userExist._id}/notes`);
}

module.exports = {userNotes, createNote};
