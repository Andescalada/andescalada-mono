import whiteLogo from "assets/svg/logo_blanco.svg?url";
import Link from "next/link";
import { useState } from "react";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

const Navbar = () => {
  const [menuIsOpen, setOpenMenu] = useState(false);
  return (
    <nav className="text-white bg-transparent px-2 sm:px-4 py-2.5 dark:bg-transparent  w-full z-20 top-0 left-0 bg-gradient-to-r from-brand-primaryA  to-brand-primaryB">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <img
            src={whiteLogo}
            className="h-10 mr-3 sm:h-10 m-3 md:m-0"
            alt="Andescalada Logo"
          />
        </Link>
        <div className="flex">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-brand-primaryA focus:outline-none "
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {menuIsOpen && (
          <div className="flex md:hidden absolute right-10 top-16 z-50">
            <ul className="flex flex-col bg-white text-black p-4 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              {[
                { title: "Inicio", href: "/" },
                { title: "Conoce más", href: "/nosotros" },
                { title: "Equipo", href: "/nosotros" },
                { title: "Blog", href: "$" },
              ].map((item) => (
                <NavbarItem key={item.title} {...item} />
              ))}
            </ul>
          </div>
        )}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            {[
              { title: "Inicio", href: "/" },
              { title: "Conoce más", href: "/nosotros" },
              { title: "Equipo", href: "/nosotros" },
              { title: "Blog", href: "$" },
            ].map((item) => (
              <NavbarItem key={item.title} {...item} />
            ))}
          </ul>
          <div className="flex">
            <a
              title="facebook"
              href="https://facebook.com/andescalada"
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoFacebook size={30} fill="white" />
            </a>
            <a
              title="instagram"
              href="https://instagram.com/andescalada"
              target="_blank"
              rel="noreferrer"
              className="ml-2"
            >
              <IoLogoInstagram size={30} fill="white" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavbarItem = ({ title, href = "#" }: { title: string; href: string }) => (
  <li>
    <a
      href={href}
      className="block py-2 pl-3 pr-4 md:text-lg md:font-light rounded md:bg-transparent md:p-0 "
      aria-current="page"
    >
      <p>{title}</p>
    </a>
  </li>
);
