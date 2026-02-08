"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/payment-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function StripeProvider() {
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret:
            "pi_3SyUYcFqTPUDqxz61CIbrRGs_secret_2jDL1PyOijFtB1T5d0tFyS9bu",
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
}
