import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { FaBars, FaTimes } from "react-icons/fa";
import useOnline from "../hooks/useOnlineStatus";
import { useSelector } from "react-redux";
import { getCartCount } from "./cart/cartSlice";
import NavItem from "./NavItem";
import HoverCart from "./cart/HoverCart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu visibility
  const [isCartHovered, setIsCartHovered] = useState(false);
  const timeoutId = useRef(null);

  const isOnline = useOnline();
  const cartCount = useSelector(getCartCount);
  const userName = useSelector((state) => state.user.userName);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsCartHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setIsCartHovered(false), 200);
  };

  return (
    <header className="fixed z-50 flex h-16 w-full items-center justify-between bg-white px-4 font-bold text-black shadow-md sm:justify-evenly md:px-10">
      <Link
        to="/"
        className="xs:text-xl whitespace-nowrap text-lg font-bold tracking-widest sm:text-2xl md:text-3xl"
        aria-label="Home"
      >
        Fast Food Co.
      </Link>

      {/* Mobile navigation (visible on small screens only) */}
      <div className="flex items-center justify-between space-x-4 md:hidden">
        {/* Mobile cart icon with cart count */}
        <NavLink
          to="/cart"
          className="flex items-center space-x-1"
          aria-label="Cart"
        >
          <span className="text-sm font-medium">
            {cartCount > 0 ? cartCount : ""}
          </span>
          <HiShoppingCart size={20} />
        </NavLink>

        {/* Hamburger menu toggle button */}
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Desktop navigation (visible on medium and larger screens) */}
      <nav className="relative hidden pr-8 md:flex">
        {/* Main navigation links */}
        <div className="flex items-center justify-between space-x-4 whitespace-nowrap lg:space-x-7">
          {/* Online status indicator */}
          <p className="flex items-center">{isOnline ? "🟢" : "🔴"}</p>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
          <NavItem to="/grocery">Grocery</NavItem>
          <NavItem to="/offers">Offers</NavItem>
          <NavItem to="/help">Help</NavItem>
          <span className="uppercase">{userName}</span>
        </div>

        {/* Cart icon with hover dropdown (only on desktop) */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NavLink
            to="/cart"
            className="flex items-center space-x-2 px-4 hover:text-orange-500 md:px-4"
            aria-label="Cart"
          >
            <span className="font-bold">{cartCount > 0 ? cartCount : ""}</span>
            <HiShoppingCart size={20} />
          </NavLink>

          {/* Cart preview dropdown on hover */}
          {isCartHovered && cartCount > 0 && (
            <div
              className="absolute right-4 top-12 border-t-2 border-t-orange-500 bg-white p-2 shadow-lg md:right-20 md:top-11"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HoverCart setIsCartHovered={setIsCartHovered} />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile full-screen menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center bg-black py-16 md:hidden">
          {/* Close button for mobile menu */}
          <button
            onClick={toggleMenu}
            className="absolute right-5 top-5 text-3xl text-white"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Mobile nav links */}
          <ul className="flex flex-col items-center space-y-8 text-xl text-white">
            <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
            <NavItem to="/" onClick={toggleMenu}>
              Home
            </NavItem>
            <NavItem to="/contact" onClick={toggleMenu}>
              Contact Us
            </NavItem>
            <NavItem to="/grocery" onClick={toggleMenu}>
              Grocery
            </NavItem>
            <NavItem to="/offers" onClick={toggleMenu}>
              Offers
            </NavItem>
            <NavItem to="/help" onClick={toggleMenu}>
              Help
            </NavItem>
            <span className="uppercase">{userName}</span>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
