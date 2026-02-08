"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useRegisterDonor } from "@/hooks/registerDonor";
import { useState } from "react";
import { InfoIcon, Cross, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";

export default function DonationForm() {
  const t = useTranslations("Donation");
  const {
    register,
    error,
    loading,
    setError,
    success,
    setSuccess,
    donorMessage,
    setDonorMessage,
  } = useRegisterDonor();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register({ full_name, email, phone_number, message });
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");

    if (success || donorMessage) {
      router.push(`/${locale}/donate`);
    }
  };
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
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-lg">
            {t("donor-info")}
          </CardTitle>
          <CardDescription>{t("tell")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onFocus={() => {
              setError(null);
              setSuccess(null);
              setDonorMessage(null);
            }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <AnimatePresence>
              {donorMessage && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative"
                >
                  <Alert className="bg-green-500 p-4 flex flex-col gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <InfoIcon />
                      <AlertDescription className="text-black text-xs sm:text-base">
                        {donorMessage}
                      </AlertDescription>
                    </div>

                    <Cross
                      className="absolute right-2 top-2 rotate-45 cursor-pointer"
                      onClick={() => setDonorMessage(null)}
                    />

                    <Button
                      className="mt-2"
                      onClick={() => router.push(`/${locale}/donate`)}
                    >
                      Continue to Donation
                    </Button>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Alert className="bg-green-500">
                    <InfoIcon />
                    <AlertDescription className="text-black text-xs sm:text-base">
                      {success}
                    </AlertDescription>
                    <Cross
                      className="absolute right-2 top-2 rotate-45"
                      onClick={() => setSuccess(null)}
                    />
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Alert variant="destructive">
                    <InfoIcon />
                    <AlertDescription className="text-xs sm:text-base">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <Label htmlFor="name">{t("name")}*</Label>
            <Input
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              id="name"
            />
            <Label htmlFor="email">{t("email")}*</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="johndoe26@example.com"
            />
            <Label htmlFor="number">{t("number")}*</Label>
            <Input
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="number"
              placeholder="+2 345-45-3435"
            />
            <Label>{t("message")}</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("token")}
            />
            <Button disabled={loading} className="disabled:bg-mute">
              {t("button-text")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
