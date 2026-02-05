import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Donate from "@/components/donate";

export default function Home() {
  const t = useTranslations("Hero");
  return (
    <div className="lg:flex">
      <div className="flex flex-col gap-4 md:items-center lg:w-[50%] lg:bg-gray-50 py-12 lg:p-12 lg:border-r">
        <h1 className="text-7xl text-center font-bold md:text-9xl">
          {t("title")}
        </h1>
        <p className="text-sm md:text-base md:text-center">
          {t("description")}
        </p>
        <Button className="font-semibold text-center">{t("motto")}</Button>
      </div>
      <Donate />
    </div>
  );
}
