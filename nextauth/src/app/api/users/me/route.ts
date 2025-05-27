import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest) {
    //extract data from token
    const userId = await getTokenData(request)
    const user = User.findOne({ _id: userId }).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}