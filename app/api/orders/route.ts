import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/order";
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

    // Find orders for the user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
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

    const orderData = await request.json();

    if (!orderData.items || !orderData.totalAmount || !orderData.shippingAddress || !orderData.paymentMethod) {
      return NextResponse.json(
        { error: "Missing required order data" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create new order
    const order = new Order({
      userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      status: "pending",
      paymentMethod: orderData.paymentMethod,
      paymentStatus: "pending",
    });

    await order.save();

    // Add order to user's orders
    await User.findOneAndUpdate(
      { clerkId: userId },
      { $push: { orders: order._id } },
      { upsert: true }
    );

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
