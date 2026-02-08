export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

//import StripeProvider from "@/components/stripe-provider";
import DonationForm from "./donation-form";

export default function Donate() {
  return (
    <div className="my-6 max-w-md mx-auto">
      <DonationForm />
    </div>
  );
}
