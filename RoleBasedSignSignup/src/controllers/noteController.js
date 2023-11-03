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

const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve notes' });
    }
}


module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
}