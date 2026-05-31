import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select('-password');
        return NextResponse.json({
            message: 'User found',
            data: user
        });
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({error: message}, {status: 400});
    }
}