const noteModel = require("../models/note");

const createNote = async (req, res) =>{
    const {title, description} = req.body;
    const newNote = new noteModel({
        title:title,
        description:description,
        userId: req.userId
    });
    try {
        await newNote.save()
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something went wrong'})
    }
    

}
const updateNote = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const { title, description } = req.body;
   

    try {
         const updateNote = await noteModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        res.status(200).json(updateNote);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({});
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve notes' });
    }
}
const deleteAllNotes = async (req, res) => {
    try {
        await noteModel.deleteMany({ userId: req.userId });

        res.status(200).json({ message: 'All notes have been deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
const updateAllNotes = async (req, res) => {
    const { title, description } = req.body;

    try {
        await noteModel.updateMany({ userId: req.userId }, { title, description });

        res.status(200).json({ message: 'All notes have been updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
const getMyNotes = async (req, res) => {
    const userId = req.userId;
  
    try {
      // Fetch notes from the database based on the user's ID
      const notes = await noteModel.find({ userId: userId });
  
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve user\'s notes' });
    }
  };



module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getAllNotes,
    deleteAllNotes,
    updateAllNotes,
    getMyNotes
}