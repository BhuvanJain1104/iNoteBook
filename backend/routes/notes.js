const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: GET All the notes of the user Using : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});








// ROUTE 2: ADD a new  note Using : POST "/api/notes/addnote".Login Required
router.post("/addnote", fetchUser, [
  body("title").isLength({ min: 3 }).withMessage("Enter a Valid Title"),
  body("description").isLength({ min: 5 }).withMessage("Description should be of minimum 5 characters"),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // If there are errors return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id

    })
    const savedNote = await note.save()

    res.json(savedNote);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});



// ROUTE 3: UPDATE an exsisting note Using : PUT "/api/notes/updatenote".Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    // Find the note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("ERROR: Not Found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("NOT ALLOWED") }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})




// ROUTE 3: UPDATE an exsisting note Using : DELETE "/api/notes/deletenote".Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it 
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("ERROR: Not Found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("NOT ALLOWED") }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "SUCCESS": "NOTE ! Deleted Successfully", DeletedNote: note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})
module.exports = router;
