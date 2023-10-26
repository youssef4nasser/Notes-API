import { userModel } from "../../../Database/models/user.model.js";

export const signUp = async (req, res)=>{
    try{
        const {firstName, lastName, userName, email, password, age, gender, phone} = req.body;
        const user = await userModel.findOne({
            $or: [
                {email: email},
                {phone: phone},
                {userName: userName}
            ]
        })
        if(user){
            if(user.email == email) return res.json({message: "email already exist"})
            if(user.phone == phone) return res.json({message: "phone already exist"})
            if(user.userName == userName) return res.json({message: "userName already exist"})
        }
        await userModel.create({
            firstName, lastName, userName, email, password, age, gender, phone
        })
        return res.json({message: 'success', user})
    }catch(err){
        res.json({ error: "Error in signUp", err });
    }
}

export const logIn = async (req, res)=>{
    try {
        const {email, phone, userName, password} = req.body;
        const user = await userModel.findOne({
            $or: [
                {email},
                {phone},
                {userName}
            ],
            password
        })
        if(!user){
            return res.json({message: 'user not found chek the email and password'})
        }
        return res.json({message: 'success'})
    } catch (error) {
        res.json({ error: "Error in logIn", error });
    }
}

export const updateUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const {firstName, lastName, email, userName, password, phone} = req.body;
        const user = await userModel.findOne({
            $or: [
                {email: email},
                {phone: phone},
                {userName: userName}
            ]
        })
        if(user){
            if(user.email == email) return res.json({message: "email already exist"})
            if(user.phone == phone) return res.json({message: "phone already exist"})
            if(user.userName == userName) return res.json({message: "userName already exist"})
        }
        if (!user) {
            return res.json({ error: 'User not found' });
        }
        await userModel.updateOne({_id: id}, {firstName, lastName, email, password, phone})
        return res.json({message:"success"})
    }catch(err){
        res.json({ error: "Error in updateUser", err });
    }
}

export const deleteUser = async (req, res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.findById(id)
        if(!user) {
            return res.json({message:"In-valid Id"})
        }
        console.log(user._id)
        await userModel.deleteOne({_id: user._id})
        return res.json({message:"success"})
    }catch(err){
        res.json({ error: "Error in deleteUser", err });
    }
}

export const searchNameAge = async (req, res)=>{
    try{
        const {startWith, age} = req.body;
        const users = await userModel.find({
            firstName: { $regex: `^${startWith}`, $options: 'i' },
            age: { $lt: age }
        });
        return res.json({message: "success", users})
    }catch(err){
        res.json({ error: "Error in searching name and age", err });
    }
}

export const searchWithAge = async (req, res)=>{
    try{
        const {minAge, maxAge} = req.body;
        const users = await userModel.find({
            age: { $gte: minAge, $lte: maxAge }
        });
        return res.json({message: "success", users})
    }catch(err){
        console.error("Error in searching with Age", err);
    }
}

export const gatAllUsers = async (req, res) => {
    try{
        let users = await userModel.find({})
        return res.json({message: "success", users})
    } catch(err){
        return res.status(500).send('Server Error')
    }
}

// 8- get user profile with user notes
export const getUserProfile = async (req, res) => {
    try {
        const userProfile = await userModel.findById(req.params.id).populate('notes');
        if (!userProfile) {
          return res.json({ error: 'User not found' });
        }
        return res.json({message: "success", userProfile});
      } catch (error) {
        res.json({ error: 'Failed to get user profile' });
      }
}