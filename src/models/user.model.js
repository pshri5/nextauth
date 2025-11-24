import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true,"Please provide a username"],
        unique: true
    },
    email:{
        type: String,
        required: [true,"Please provide email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Please provide password"]
    }
},{timestamps: true})

const User = mongoose.model("User",userSchema)
export default User