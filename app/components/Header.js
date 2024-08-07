import Link from "next/link";
const Header = () => {
  return (
    <div className="flex flex-row w-full h-25 fixed text-white bg-black justify-between">
      <h1 className="p-3">AI assistant</h1>
      <Link
        className="p-3 hover:text-black hover:bg-white"
        href="https://my-personal-website-lemon.vercel.app/"
      >
        Home
      </Link>
    </div>
  );
};

export default Header;
