import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderAuth from "./HeaderAuth";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section flex h-12 items-center justify-between gap-2 sm:h-14 md:h-16">
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <HeaderAuth />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}
