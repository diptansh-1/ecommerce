import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    // In a real application, you would:
    // 1. Store the email in your database
    // 2. Send a confirmation email
    // 3. Integrate with a newsletter service like Mailchimp
    
    // For now, we'll just simulate a successful subscription
    console.log(`Newsletter subscription: ${email}`);
    
    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
