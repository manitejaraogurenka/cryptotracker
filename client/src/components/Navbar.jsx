import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { navbarActions } from "../store/navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularMenu from "./CircularMenu";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const { selected } = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const menu = ["Home", "Crypto", "About", "Contact us"];

  const handleResize = () => setIsSmallScreen(window.innerWidth <= 900);

  const selectedItem = (itemName) => {
    dispatch(navbarActions.setSelected(itemName));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styled =
    "border-b-2 border-blue-500 rounded-3xl shadow-blue-500 shadow-md text-blue-300 bg-transparent";

  return (
    <header>
      {isSmallScreen ? (
        <CircularMenu selected={selected} selectedItem={selectedItem} />
      ) : (
        <nav
          className="fixed z-[100] w-screen flex bg-transparent justify-between px-6 py-4 items-center text-white select-none overflow-clip"
          data-aos="fade-in"
          data-aos-once="true"
        >
          <div className="font-Orbitron w-fit flex items-center text-2xl font-bold gap-1">
            <img
              src={Logo}
              className="rounded-full w-9"
              alt="Crypto Tracker Logo"
            />
            <span className="bg-opacity-0 bg-white bg-blur-lg backdrop-blur-md backdrop-filter p-2 rounded-full">
              CRYPTO TRACKER
            </span>
          </div>
          <ul className="flex gap-1 font-semibold font-Orbitron bg-opacity-0 bg-white bg-blur-lg backdrop-blur-md backdrop-filter rounded-full py-2 px-4">
            {menu.map((item) => (
              <Link
                key={item}
                smooth
                to={`/#${item.toLowerCase()}`}
                onClick={() => selectedItem(item)}
                aria-label={item}
              >
                <li
                  className={`active:scale-95 py-1.5 px-4 cursor-pointer ${
                    selected === item && styled
                  }`}
                >
                  {item}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
