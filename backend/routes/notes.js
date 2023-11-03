const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
//Route 1: get all the notes using : POST "/api/notes/fetchallnote".Login required
router.get('/fetchallnote', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})
//Route 2:Add a new Notes using : POST "/api/notes/getuser".Login required
router.post('/addnote', fetchuser, [
    body("title", "Title").isLength({ min: 1 }),
    body("description", "Notes").isLength({ min: 1 }),
], async (req, res) => {
    try {
        const { title, description } = req.body;
        // if there are errors ,Return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, user:req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})
//Route 3:update an existing Notes using : PUT "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description } = req.body;
        //Create a newNotes object
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Jaldi sa baag ja. baag!!!")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})
//Route 4:Delete an existing Notes using : DELETE "/api/notes/deletenote/".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Create a newNotes object
        // const newNote = {}
        // if (title) { newNote.title = title };
        // if (description) { newNote.description = description };
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Jaldi sa baag ja. baag!!!")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "deleted": "this note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})

module.exports = router;