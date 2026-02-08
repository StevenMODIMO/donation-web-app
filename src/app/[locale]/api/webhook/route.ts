import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text(); // required raw body
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Since you're NOT storing users,
    // you could just log, send email, trigger something, etc.
    console.log("Payment successful:", {
      sessionId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email,
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
