const express = require('express');
const {createNote,updateNote,deleteNote,getNotes,getMyNotes} = require('../controllers/noteController')

const auth = require('../middleware/auth')
const noteRouter = express.Router();

//get all notes
//admin route

//user route
noteRouter.post('/',auth,createNote);
noteRouter.put('/:id',auth, updateNote);
noteRouter.delete('/:id',auth, deleteNote)
noteRouter.get('/',auth,getMyNotes)


module.exports = noteRouter;