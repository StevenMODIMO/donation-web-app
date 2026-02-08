"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";

export default function DonationForm() {
  const [cause, setCause] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/${locale}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cause, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(true);
        window.location.href = data.url;
        return;
      } else {
        setError(data.message || data.error);
      }
    } catch (error: any) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Donate Now</CardTitle>
          <CardDescription>Donate to a cause of your choice</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={handleSubmit}
            onFocus={() => setError(null)}
          >
            <Label id="cause">Choose a cause</Label>
            <Select value={cause} onValueChange={(value) => setCause(value)}>
              <SelectTrigger className="w-60 sm:w-100">
                <SelectValue placeholder="Choose a cause" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Natural Disasters">
                    Natural Disasters
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label id="amount" className="">
              <Coins />
              <span>Amount (converted to cents)</span>
            </Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button disabled={loading} className="disabled:bg-muted">
              Donate
            </Button>
          </form>
          {message && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex gap-2 items-center sm:justify-center py-4"
            >
              <span className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
              <span className="text-xs sm:text-base">
                Hang tight, redirecting to secure checkout…
              </span>
            </motion.div>
          )}
        </CardContent>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-fit mx-auto"
            >
              <Alert className="text-red-500 p-2 mx-auto flex flex-col gap-3 items-center">
                <div className="flex items-center gap-2">
                  <InfoIcon />
                  <AlertDescription className="text-red-500 text-xs sm:text-base">
                    {error}
                  </AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <CardFooter className="flex flex-col gap-3 text-xs sm:text-sm text-muted-foreground">
          <p className="text-center">
            Test mode only — no real charges will occur. Use fake cards below.
          </p>

          <div className="flex flex-col gap-2 w-full">
            {[
              { brand: "Visa", number: "4242 4242 4242 4242" },
              { brand: "Mastercard", number: "5555 5555 5555 4444" },
              { brand: "UnionPay", number: "6200 0000 0000 0005" },
            ].map((card) => (
              <button
                key={card.number}
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(card.number.replace(/\s/g, ""))
                }
                className="flex items-center justify-between border rounded-md px-3 py-2 hover:bg-muted transition"
              >
                <span>
                  {card.brand} • {card.number}
                </span>
                <span className="text-[10px]">Copy</span>
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] sm:text-xs">
            Use any future expiry date and any 3‑digit CVC.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
