import dayjs from "dayjs";
import "dayjs/locale/ka";
import "dayjs/locale/ru";
import "dayjs/locale/en";

const supportedLocales = ["ka", "en", "ru"] as const;

/**
 * Format date with locale. Uses dayjs for proper month/day names per locale.
 * @param date - Date string or Date object
 * @param locale - Locale code (ka, en, ru)
 * @param format - dayjs format string (default: "D MMM YYYY" e.g. "1 Mar 2026")
 */
export function formatDate(
  date: Date | string,
  locale: string = "ka",
  format: string = "D MMM YYYY"
): string {
  const localeKey = supportedLocales.includes(locale as (typeof supportedLocales)[number])
    ? (locale as (typeof supportedLocales)[number])
    : "ka";
  return dayjs(date).locale(localeKey).format(format);
}
