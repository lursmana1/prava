import { Link } from "@/i18n/navigation";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-blue-600 hover:opacity-80 sm:text-base md:gap-2 md:text-lg"
    >
      <div className="h-6 w-6 shrink-0 rounded-lg bg-blue-600 sm:h-7 sm:w-7 md:h-8 md:w-8" />
      <span className="hidden sm:inline">prava.ge</span>
    </Link>
  );
}
