import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "en", "ru"],
  defaultLocale: "ka",
  localePrefix: "always",
  /** Use defaultLocale (ka) for new visitors instead of Accept-Language. */
  localeDetection: false,
});
