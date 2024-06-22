import React, { useState } from "react";
import "../styles/CircularMenu.css";
import { HashLink as Link } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { navbarActions } from "../store/navbarSlice";
import Logo from "../assets/Logo.png";

const CircularMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const dispatch = useDispatch();
  const selectedItem = (itemName) => {
    dispatch(navbarActions.setSelected(itemName));
  };

  const menuItems = [
    { name: "Contact us", link: "/#contact", circleClass: "circle-one" },
    { name: "About", link: "/#about", circleClass: "circle-four" },
    { name: "Crypto", link: "/#crypto", circleClass: "circle-three" },
    { name: "Home", link: "/#home", circleClass: "circle-five" },
  ];

  return (
    <>
      <div className="absolute top-4 left-4 z-50 select-none">
        <div className="font-Orbitron w-fit text-white flex items-center text-xl font-bold gap-1">
          <img src={Logo} alt="Logo" className="w-12 rounded-full" />
          <span className="bg-opacity-0 bg-white bg-blur-lg backdrop-blur-md backdrop-filter px-2 rounded-2xl">
            CRYPTO
            <br /> TRACKER
          </span>
        </div>
      </div>

      <div>
        <button
          className={`bars ${menuOpen ? "active" : ""}`}
          id="nav-action"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar barspan"></span>
        </button>
      </div>

      <nav id="nav" className={`${menuOpen ? "visible" : ""}`}>
        <ul className="font-Orbitron text-md" onClick={toggleMenu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`shape-circle ${item.circleClass}`}
              onClick={() => selectedItem(item.name)}
            >
              <Link smooth to={item.link} aria-label={item.name}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CircularMenu;
