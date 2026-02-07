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

export default function DonationForm() {
  const t = useTranslations("Donation");
  const { register, error, loading, setError, setLoading } = useRegisterDonor();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register({ full_name, email, phone_number, message });
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-lg">
            {t("donor-info")}
          </CardTitle>
          <CardDescription>{t("tell")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onFocus={() => setError(null)}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            {error && <div>{error}</div>}
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              id="name"
            />
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="johndoe26@example.com"
            />
            <Label htmlFor="number">{t("number")}</Label>
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
    </div>
  );
}
