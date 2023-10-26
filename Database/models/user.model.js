import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: String,
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    phone: {
        type: String,
        unique: true,
        require: true
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note' }]
})

export const userModel = mongoose.model('user', userSchema)