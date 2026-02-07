"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function AnonymousDonation() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      exit={{ scale: 0 }}
    >
      <Card className="max-w-xl mx-auto shadow-md">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold text-center">
            Give quietly. Change lives deeply.
          </CardTitle>

          <CardDescription className="text-center text-base leading-relaxed">
            Your kindness doesn’t need a name to make an impact. With an
            anonymous donation, your support reaches those in need while your
            identity remains completely private.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Your donation is received safely and securely</li>
            <li>• No personal details are shared with the recipient</li>
            <li>• Your generosity still creates real impact</li>
          </ul>

          <p className="mt-4 text-center font-medium">Do good… quietly.</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push(`/${locale}/donate`)}>
            Continue to Donation
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
