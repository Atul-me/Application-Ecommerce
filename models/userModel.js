import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true //remove white spaces -- increase the loadup speed || save spaces
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true})//add the timestamps when user is created

export default mongoose.model('Users', userSchema)