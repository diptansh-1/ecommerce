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

    return NextResponse.json({ wishlist: user.wishlist || [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
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

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by Clerk ID
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create new user if not found
      user = new User({
        clerkId: userId,
        email: "placeholder@example.com", // This would be replaced with actual email from Clerk
        wishlist: [],
      });
    }

    // Add product to wishlist if not already there
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    return NextResponse.json({ wishlist: user.wishlist }, { status: 200 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
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

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter((id: number) => id !== productId);
    await user.save();

    return NextResponse.json({ wishlist: user.wishlist }, { status: 200 });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}
