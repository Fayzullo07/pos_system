import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { login } = await req.json();
    await connectMongoDB()

    try {


        const user = await User.find({ login }).select("_id");

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Ann error occurred while registering the user." }, { status: 500 })
    }
}

