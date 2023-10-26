import express from 'express'
import connectiondb from './Database/connectiondb.js'
import userRouter from './src/modules/user/user.router.js';
import noteRouter from './src/modules/note/post.router.js';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json());

connectiondb()

app.use("/user", userRouter)
app.use("/note", noteRouter)
app.use("*", (req, res, next)=>{
    return res.json({message: "In-valid Routing"})
})

process.on('uncaughtException', ()=>{
    console.log("Uncaught Exception")
})

process.on('unhandledRejection', (error)=>{
    console.log("Eroor", error)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
