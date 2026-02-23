"use client";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

const navLinkClass =
  "shrink-0 rounded-md px-1.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:px-2 sm:text-xs md:px-3 md:py-2 md:text-sm";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section flex h-12 items-center justify-between gap-2 sm:h-14 md:h-16">
        {/* Left: Logo + Nav */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-blue-600 hover:opacity-80 sm:text-base md:gap-2 md:text-lg"
          >
            <div className="h-6 w-6 shrink-0 rounded-lg bg-blue-600 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            <span className="hidden sm:inline">prava.ge</span>
          </Link>
          <nav className="ml-0.5 flex flex-nowrap items-center gap-0.5 overflow-x-auto scroll-smooth md:ml-2 md:gap-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
            <Link href="/exam" className={navLinkClass}>
              სიმულაცია
            </Link>
            <Link href="/subjectpicker" className={navLinkClass}>
              თემები
            </Link>
            <Link href="#" className={navLinkClass}>
              ლიდერბორდი
            </Link>
            <Link href="#faq" className={navLinkClass}>
              FAQ
            </Link>
          </nav>
        </div>

        {/* Right: Login + CTA + Locale */}
        <div className="flex shrink-0 flex-nowrap items-center gap-1 sm:gap-2">
          <Link
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
            className={`${navLinkClass} hidden sm:inline-block`}
          >
            შესვლა
          </Link>
          <Link
            href="/exam"
            className="shrink-0 rounded-xl bg-blue-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700 sm:px-3 sm:text-xs md:px-4 md:py-2 md:text-sm"
          >
            <span className="hidden sm:inline">დაიწყე უფასო სიმულაცია</span>
            <span className="sm:hidden">დაიწყე</span>
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
