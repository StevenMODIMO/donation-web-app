"use client";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";
import { HandCoins } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("HomePage");

  const isDonatePage = pathname?.endsWith("/donate");

  if (isDonatePage) return null;

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
