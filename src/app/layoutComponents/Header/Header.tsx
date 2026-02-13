import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-amber-50/90 backdrop-blur">
      <div className="section flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-black hover:opacity-80"
        >
          Prava.ge
        </Link>

        {/* Mobile toggle (pure CSS) */}
        <input id="nav-toggle" type="checkbox" className="peer hidden" />

        {/* Hamburger button */}
        <label
          htmlFor="nav-toggle"
          className="cursor-pointer select-none rounded-md p-2 text-black hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:hidden"
          aria-label="Open menu"
        >
          {/* icon */}
          <span className="block h-0.5 w-6 bg-black" />
          <span className="mt-1.5 block h-0.5 w-6 bg-black" />
          <span className="mt-1.5 block h-0.5 w-6 bg-black" />
        </label>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            <li>
              <a
                href="tel:+995568785378"
                className="rounded-md px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
              >
                კონტაქტი: 568 785 378
              </a>
            </li>
            <li>
              <Link
                href="/subject"
                className="rounded-md px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
              >
                გამოცდა (საკითხების არჩევა)
              </Link>
            </li>
            <li>
              <Link
                href="/exam"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-amber-50 hover:opacity-90"
              >
                სწრაფი ტესტი
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu panel */}
        <nav className="absolute left-0 right-0 top-16 hidden border-b border-black/10 bg-amber-50 md:hidden peer-checked:block">
          <ul className="section flex flex-col gap-1 py-3">
            <li>
              <a
                href="tel:+995568785378"
                className="block rounded-md px-3 py-3 text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
              >
                კონტაქტი: 568 785 378
              </a>
            </li>
            <li>
              <Link
                href="/subject"
                className="block rounded-md px-3 py-3 text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
              >
                გამოცდა (საკითხების არჩევა)
              </Link>
            </li>
            <li>
              <Link
                href="/exam"
                className="block rounded-md bg-black px-3 py-3 text-sm font-semibold text-amber-50 hover:opacity-90"
              >
                სწრაფი ტესტი
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
