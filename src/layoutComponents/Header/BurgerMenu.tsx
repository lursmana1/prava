"use client";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { navLinks } from "@/CONSTS/navLinks";
import { useUser } from "@/contexts/UserContext";
import { useState, useEffect } from "react";

const navLinkClass =
  "rounded-md px-3 py-2.5 text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors";

export default function BurgerMenu() {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const openMenu = () => setMenuOpen(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => (menuOpen ? closeMenu() : openMenu())}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-slate-100 md:hidden"
      >
        <span
          className={`block h-0.5 w-6 rounded-full bg-slate-700 transition-all duration-200 ${
            menuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 rounded-full bg-slate-700 transition-all duration-200 ${
            menuOpen ? "opacity-0 scale-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 rounded-full bg-slate-700 transition-all duration-200 ${
            menuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {menuOpen && (
        <>
          <div
            className={`fixed inset-0 top-12 sm:top-14 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
            onClick={closeMenu}
          />
          <nav
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className={`fixed left-0 right-0 top-12 sm:top-14 z-50 border-b border-slate-200 bg-white shadow-lg md:hidden ${
              isClosing ? "burger-menu-exit" : "burger-menu-enter"
            }`}
          >
            <div className="section flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  {user ? (
                    <Link
                      href="/profile"
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      {user.name || user.email}
                    </Link>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      შესვლა
                    </Link>
                  )}
                  <div className="mt-3">
                    <LocaleSwitcher />
                  </div>
                </div>

                <Link
                  href="/exam"
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  დაიწყე უფასო სიმულაცია
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
