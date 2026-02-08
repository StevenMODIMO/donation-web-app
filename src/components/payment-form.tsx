"use client";
import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  return (
    <div>
      <header>
        <h1>PaymentForm</h1>
      </header>
      <PaymentElement />
    </div>
  );
}
