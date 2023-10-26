import express from 'express'
import { deleteUser, gatAllUsers, getUserProfile, logIn, searchNameAge, searchWithAge, signUp, updateUser } from './user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', signUp)
userRouter.post('/login', logIn)
userRouter.put('/update/:id', updateUser)
userRouter.delete('/delete/:id', deleteUser)
userRouter.get('/search', searchNameAge)
userRouter.get('/searchWithAge', searchWithAge)
userRouter.get('/allUsers', gatAllUsers)
userRouter.get('/getUserProfile/:id', getUserProfile)

export default userRouter
