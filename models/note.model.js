const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;