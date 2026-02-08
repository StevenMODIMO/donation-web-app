import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { amount, cause } = await req.json();

    if (!amount || !cause) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Donation for ${cause}` },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://donation-web-app-delta.vercel.app/success",
      cancel_url: "https://donation-web-app-delta.vercel.app/cancel",
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency: "usd",
    //   automatic_payment_methods: { enabled: true },
    // });
    // return NextResponse.json({ details: paymentIntent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
