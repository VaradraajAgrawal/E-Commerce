import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/authContextt";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const { cart } = useCart();
  const { logout, user, loading } = useAuth(); // Destructure loading here
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed left-0 top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-8 py-4 flex justify-between items-center">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 italic">MyStore</h1>
      </Link>

      <div className="flex items-center gap-8">
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase">
          <li>
            <Link
              to="/"
              className={isActive("/") ? "text-blue-600" : "text-gray-500"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Orders"
              className={
                isActive("/Orders") ? "text-blue-600" : "text-gray-500"
              }
            >
              Orders
            </Link>
          </li>

          {/* 🛡️ THE FIX: Only show buttons if loading is false */}
          {!loading && (
            <>
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/Login"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Register"
                      className="bg-gray-900 text-white px-5 py-2.5 rounded-full"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={logout}
                    className="text-red-500 font-bold px-4 py-2 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </li>
              )}
            </>
          )}
        </ul>

        {/* Cart Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-3 bg-gray-50 rounded-xl"
        >
          <span>🛒</span>
          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
