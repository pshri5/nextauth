import { connect } from "@/db/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export async function POST (req:NextRequest){
    try {
        const reqBody = await req.json()
        const {username,email,password} = reqBody
        if(!username||!email||!password){
            return NextResponse.json({message:"Please provide the credentials"},{status:400})
        }
        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        //hash password
        const salt = await bcryptjs.gensalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message:"User created successfully",
            success: true,
            savedUser

        },{status:201})

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}