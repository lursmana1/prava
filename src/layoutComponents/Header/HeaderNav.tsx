import { Link } from "@/i18n/navigation";
import { navLinks } from "@/CONSTS/navLinks";

const navLinkClass =
  "shrink-0 rounded-md px-1.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:px-2 sm:text-xs md:px-3 md:py-2 md:text-sm";

export default function HeaderNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="ml-0.5 hidden flex-nowrap items-center gap-0.5 md:ml-2 md:flex md:gap-1"
    >
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className={navLinkClass}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
