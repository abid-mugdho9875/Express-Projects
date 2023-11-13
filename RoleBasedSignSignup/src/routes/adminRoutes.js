const express = require('express');
const {createNote,updateNote,deleteNote,getAllNotes,updateAllNotes,deleteAllNotes} = require('../controllers/noteController')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')



const adminRouter = express.Router();

//get all notes
//admin route

//user route
adminRouter.use(isAdmin)
adminRouter.post('/',createNote);
adminRouter.put('/', updateAllNotes);
adminRouter.get('/',getAllNotes);
adminRouter.delete('/', deleteAllNotes)
module.exports = adminRouter