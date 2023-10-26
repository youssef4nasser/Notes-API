import express from 'express'
import { addNote, deleteNote, getAllNotes, getAllNotesPopulated, sortNoteDescending, updateNote } from './note.controller.js';

const noteRouter = express.Router();

noteRouter.post("/addNote", addNote)
noteRouter.delete("/deleteNote/:id", deleteNote)
noteRouter.put("/updateNote/:id", updateNote)
noteRouter.get("/getallNotes", getAllNotes)
noteRouter.get("/getAllNotesPopulated", getAllNotesPopulated)
noteRouter.get("/sortNoteDescending", sortNoteDescending)

export default noteRouter
