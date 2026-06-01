import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user) {
            return NextResponse.json({error: 'User not found'}, {status: 400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: 'Email verified succesfully', success: true});

    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({error: message}, {status: 500});
    }
}