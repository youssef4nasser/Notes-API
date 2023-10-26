import mongoose from "mongoose";

export default function connectiondb (){
    mongoose.connect(process.env.DB_ONLINE).then(()=>{
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
}
