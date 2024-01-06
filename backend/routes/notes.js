const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1 : get all the notes : GET -> /api/notes/fetchallnotes -> login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});


// ROUTE 2 : add a note : POST -> /api/notes/addnote -> login required
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body; 

    // in case errors exist, return a bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // saving a new note
    const note = new Notes({
      title, description, tag, user: req.user.id
    });
    let savedNote = await note.save();
    res.json({savedNote});
  } 
  catch(error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});


// ROUTE 3 : update an existing note : PUT -> /api/notes/updatenote -> login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;  
    
    // in case errors exist, return a bad request and the error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // assign the req data to the new note
    let newNote = {};
    if(title) {
      newNote.title = title;
    }
    if(description) {
      newNote.description = description;
    }
    if(tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note) {
      // the note to be updated does not exist in the database
      return res.status(404).send('Not found');
    }
    if(note.user.toString() !== req.user.id) {
      // the user trying to update is someone else
      return res.status(401).send('Unauthorized access');
    }

    // set the chosen fields of note to those of newNote
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({ note });
  } 
  catch(error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;