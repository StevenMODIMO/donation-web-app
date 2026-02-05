"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";


export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // current locale from URL → /en/... or /fr/...
  const currentLocale = pathname.split("/")[1] || "en";

  function switchLocale(locale: string) {
    if (locale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  // next locale to switch to
  const nextLocale = currentLocale === "en" ? "fr" : "en";

  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => switchLocale(nextLocale)}
    >
      <Languages />
      <span>{currentLocale.toUpperCase()}</span>
    </Button>
  );
}
