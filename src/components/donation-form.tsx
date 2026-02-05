"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function DonationForm() {
  const t = useTranslations("Donation");
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
          <form className="flex flex-col gap-3">
            <Label htmlFor="name">{t("name")}</Label>
            <Input placeholder="John Doe" id="name" />
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              type="email"
              id="email"
              placeholder="johndoe26@example.com"
            />
            <Label htmlFor="number">{t("number")}</Label>
            <Input
              id="number"
              type="number"
              min={0}
              max={15}
              placeholder="+25-657-594-790"
              className="appearance-none"
            />
            <Label>{t("message")}</Label>
            <Textarea placeholder={t("token")} />
            <Button>{t("button-text")}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
