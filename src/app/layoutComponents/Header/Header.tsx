import Link from "next/link";

const Header = () => {
  return (
    <header className=" bg-amber-50 sticky top-0 z-9">
      <div className="section w-full h-16 flex justify-between items-center">
        <h2>Prava.ge</h2>
        <nav>
          <ul>
            <li>
              <Link href="/" className="text-black">
                kontakti: 568785378
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
