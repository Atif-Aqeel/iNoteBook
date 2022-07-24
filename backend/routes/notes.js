const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");


//ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }) //find() function to get all the notes
        res.json(notes)
    } catch (error) {
        console.error(error.messages);
        res.status(500).send("Internal Server Error...")

    }
})


//ROUTE 2: Add a notes using: POST "/api/auth/addnote" . Login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter description - atleast 5 characters ").isLength({ min: 5 }),
], async (req, res) => {
    try {
        //de-structuring technique
        const { title, description, tag } = req.body;

        //if there are errors, then return bad request(400) & the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //if not exit then create a New Note 
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        // save a note and send it to display
        const saveNote = await note.save();
        res.json(saveNote)

    } catch (error) {
        console.error(error.messages);
        res.status(500).send("Internal Server Error...")
    }
})

//ROUTE 3: Update an existing note using: PUT "/api/auth/updatenote" . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //de-structuring technique, takes all these from body by request
        const { title, description, tag } = req.body;

        //Create a newNote Object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the Note to be updated and update it
        let note = await Note.findById(req.params.id); // it takes id from --> '/updatenote/:id'
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //To check either given user access his notes or tryng to access someone other note
        // note.user.toString() gives id of user and check with !==
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.messages);
        res.status(500).send("Internal Server Error...")
    }
})


//ROUTE 4: Delete an existing note using: DELETE "/api/auth/deletenote" . Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //Find the Note to be deleted and delete it
        let note = await Note.findById(req.params.id); // it takes id from --> '/updatenote/:id'
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow Deleteion only if user owns this Note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted ", note: note });
    } catch (error) {
        console.error(error.messages);
        res.status(500).send("Internal Server Error...")
    }
})


module.exports = router

//callback functions
// app.get('/', (req, res) => {
//     res.send('Hello Atif\'s World!')
//   });