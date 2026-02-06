import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-16  bg-amber-50 sticky top-0 z-9">
      <h1>PRAVA CHABARET</h1>
      <nav>
        <ul>
          <li>
            <Link href="/" className="text-black">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
