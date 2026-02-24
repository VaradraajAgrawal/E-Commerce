import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import { api } from "../services/api";
const CheckoutPage = () => {
  const { cart, cartDetail, setCart } = useCart();
  const handleClick = async () => {
    api("/order", {
      method: "POST",
    });
    setCart({ items: [] });
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-black">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Shipping + Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-0">
              <h2 className="text-xl font-semibold mb-6 text-black">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 border rounded-lg md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="p-3 border rounded-lg md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="p-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Payment Method
              </h2>

              <div className="flex items-center gap-3 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                <span className="font-medium text-blue-700">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-black">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.items.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  cart.items.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.productId.title} × {item.quantity}
                      </span>
                      <span className="font-medium text-black">
                        ₹{item.productId.price * item.quantity}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-3 text-black">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartDetail.subTotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{cartDetail.taxAmt}</span>
                </div>

                <div className="flex justify-between text-xl font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₹{cartDetail.totalAmt}</span>
                </div>
              </div>

              {/* Action Button (logic comes later) */}
              <button
                onClick={() => handleClick()}
                disabled={cart.items.length === 0}
                className="w-full bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl mt-8 transition"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
