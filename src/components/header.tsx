"use client";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-xl">{t("title")}</h1>
      <LocaleSwitcher />
    </div>
  );
}
