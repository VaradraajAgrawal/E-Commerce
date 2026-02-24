import { useCart } from "../context/CartProvider";

const CartItem = ({ items }) => {
  const { updateCart, remove } = useCart();

  return (
    <>
      {items.map((item) => {
        const product = item.productId;

        return (
          <div
            key={product._id}
            className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gray-50 rounded-2xl mb-3 shadow-sm text-black"
          >
            {/* Product Image */}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h4>
              <p className="text-sm text-blue-600 font-bold">
                ₹{product.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1">
              <button
                onClick={() => {
                  if (item.quantity === 1) {
                    remove(product._id);
                  } else {
                    updateCart(product._id, item.quantity - 1);
                  }
                }}
                className="w-6 h-6 flex items-center justify-center text-amber-50 hover:bg-gray-100 rounded-md"
              >
                -
              </button>

              <span className="text-sm font-bold min-w-[20px] text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => updateCart(product._id, item.quantity + 1)}
                className="w-6 h-6 flex items-center text-amber-50 justify-center hover:bg-gray-100 rounded-md"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => remove(product._id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              ✕
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CartItem;
