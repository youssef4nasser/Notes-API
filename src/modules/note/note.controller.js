import { noteModel } from "../../../Database/models/note.model.js";
import { userModel } from "../../../Database/models/user.model.js";

export const addNote = async (req, res)=>{
    try{
        const {title, content, createdBy} = req.body;
        const user = await userModel.findById(createdBy)
        if(!user) return res.json({message: "user not found"})
        const note = await noteModel.create({title, content, createdBy})
        user.notes.push(note._id);
        await user.save();
        return res.json({message: "success", note})
    }catch(err){
        res.json({message:"error in adding a new note", err});
    }
}

// delete note
export const deleteNote = async (req, res)=>{
    try{
        const { id } = req.params;
        const { createdBy } = req.body;
        const note = await noteModel.findOne({ _id: id });
        if (!note) return res.json({ message: 'note not found' });
    
        if (note.createdBy != createdBy) return res.json({ message: 'Unauthorized' });
    
        await noteModel.deleteOne({ _id: note._id });
    
        const user = await userModel.findById(note.createdBy);
        user.notes.pull(id);
        await user.save();
    
        return res.json({ message: 'note deleted successfully' });
    }catch(err){
        res.json({message:"Error in deleting the note", err});
    }
}

// update note
export const updateNote = async (req, res)=>{
    try{
        const { id } = req.params;
        const { title, content, createdBy } = req.body;
        const note = await noteModel.findOne({ _id: id });
        if (!note) return res.json({ message: 'note not found' });
        if (note.createdBy != createdBy) return res.json({ message: 'Unauthorized' });
    
        await noteModel.updateOne(
            {_id: id},
            {title, content}
        )
        return res.json({ message: 'note updated successfully' });
    }catch(err){
        res.json({message:"Error in updating the note", err});
    }
}

// get all notes
export const getAllNotes = async (req, res)=>{
    try{
        const notes = await noteModel.find().populate("createdBy", "firstName lastName email phone");
        return res.json({message:"success", notes})
    }catch(err){
        res.json({message:"error getting all notes" , err});
    }
}

// get All notes Populated
export const getAllNotesPopulated = async (req, res)=>{
    try{
        const notes = await noteModel.find().populate({
            path: 'createdBy',
            select: 'firstName lastName age gender email phone'
        });
        return res.json({message:"success", notes})
    }catch(err){
        res.json({message:"error getting all notes populated" , err});
    }
}

// sort note descending (By date)
export const sortNoteDescending = async (req, res)=>{
    try{
        const notes = await noteModel.find().sort({createdAt: -1})
        return res.json({message:"success", notes})
    }catch(err){
        res.json({message:"error sorting notes by date" , err});
    }
}
