import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { connect } from "@/db/dbConfig";
import { error } from "console";
import jwt from "jsonwebtoken"


connect()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const{email, password} = reqBody

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                message:"User does not exist"
            }, {status: 400})
        }
        //check if password is correct
        const validatePassword = await bcryptjs.compare(password,user.password)
        if(!validatePassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})

        const response = NextResponse.json({message:"User logged in successfully"},{status:201})

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}