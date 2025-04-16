import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find user by Clerk ID
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    await connectToDatabase();

    // Find user by Clerk ID or create a new one
    let user = await User.findOne({ clerkId: userId });

    if (user) {
      // Update existing user
      Object.assign(user, data);
      await user.save();
    } else {
      // Create new user
      user = new User({
        clerkId: userId,
        ...data,
      });
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 500 }
    );
  }
}
