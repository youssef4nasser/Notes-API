import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})

export const noteModel = mongoose.model('note', noteSchema)

