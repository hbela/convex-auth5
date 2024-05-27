import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/img/logoipsum-227.svg";
//import MobileLogo from "../../public/airbnb-mobile.webp";
import UserButton from "./user-button";
//import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-32 hidden lg:block" />
        </Link>

        {/* <SearchModalCompnent /> */}

        <UserButton />
      </div>
    </nav>
  );
}
