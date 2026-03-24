"use client";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { useUser } from "@/contexts/UserContext";

export default function HeaderAuth() {
  // const user = useUser();

  return (
    <div className="hidden shrink-0 items-center gap-1 md:flex md:gap-2">
      <LocaleSwitcher />

      {/* {user ? (
        <Link
          href="/profile"
          className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:py-2 sm:text-sm"
        >
          {user.name || user.email}
        </Link>
      ) : (
        <Link
          href="/auth"
          className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:py-2 sm:text-sm"
        >
          შესვლა
        </Link>
      )} */}
    </div>
  );
}
