import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // Move your existing home code here
import Login from "./Login"; // Your login component
import Navbar from "../components/Navbar";
import CartSidebar from "../components/cartSideBar";
import Register from "./Register";
import { useState } from "react";
import CheckoutPage from "./CheckoutPage";
import Orders from "./Orders";
import Practise from "./Practise";

const Main = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar and Sidebar stay visible on ALL pages */}
      <Navbar setIsOpen={setIsCartOpen} />
      <CartSidebar
        isOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        setIsOpen={setIsCartOpen}
      />

      {/* This is the area that SWAPS when the URL changes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Prac" element={<Practise />} />
      </Routes>
    </div>
  );
};

export default Main;
