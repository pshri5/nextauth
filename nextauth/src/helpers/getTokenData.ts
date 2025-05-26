import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getTokenData(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
    } catch (error: any) {
        throw new Error(error.message)
    }
}