"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  ka: "ქარ",
  en: "EN",
  ru: "RU",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as typeof locale });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={`
            rounded-md px-2 py-1 text-xs font-semibold transition
            ${
              loc === locale
                ? "bg-black text-amber-50"
                : "text-black/70 hover:bg-black/5"
            }
          `}
        >
          {localeLabels[loc] ?? loc}
        </button>
      ))}
    </div>
  );
}
