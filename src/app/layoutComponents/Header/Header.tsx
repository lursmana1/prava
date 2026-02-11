import Link from "next/link";

const Header = () => {
  return (
    <header className=" bg-amber-50 sticky top-0 z-9">
      <div className="section w-full h-16 flex justify-between items-center">
        <Link href="/" className="text-black">
          Prava.ge
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/" className="text-black">
                kontakti: 568785378
              </Link>
            </li>
            <li>
              <Link href="/subject" className="text-black">
                გამოცდა(საკითხების არჩევა)
              </Link>
              <Link href={"/exam"} className="text-black">
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
