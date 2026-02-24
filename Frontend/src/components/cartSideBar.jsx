import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import CartItem from "./CartItems";
const CartSideBar = ({ isOpen, setIsOpen }) => {
  const { cart, cartDetail } = useCart();
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate("/Checkout");
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-110 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            {cart.items.length <= 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty.
              </p>
            ) : (
              <CartItem items={cart.items} />
            )}
          </div>

          {/* 3. Order Summary Section */}
          {cart.items.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartDetail.subTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%)</span>
                <span>${cartDetail.taxAmt}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>${cartDetail.totalAmt}</span>
              </div>

              <button
                onClick={() => handleCheck()}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSideBar;
