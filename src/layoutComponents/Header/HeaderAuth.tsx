import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

export default function HeaderAuth() {
  return (
    <div className="hidden shrink-0 items-center gap-1 md:flex md:gap-2">
      <LocaleSwitcher />

      <Link
        href={`/auth`}
        className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:py-2 sm:text-sm"
      >
        შესვლა
      </Link>
      <Link
        href="/exam"
        className="shrink-0 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 sm:px-4 sm:py-2 sm:text-sm"
      >
        დაიწყე გამოცდა
      </Link>
    </div>
  );
}
