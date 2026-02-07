"use client";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";
import { HandCoins } from "lucide-react";

export default function Header() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-xl">{t("title")}</h1>
        <HandCoins />
      </div>
      <LocaleSwitcher />
    </div>
  );
}
