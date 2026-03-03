import { useState } from "react";
import { useCart } from "../context/CartProvider";
import { useEffect } from "react";
const HomePage = () => {
  const { add } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const newdata = await res.json();
        setProducts(newdata.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    loadProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <main className="pt-24 px-8 pb-12 m-0">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            New Arrivals
          </h2>
          <p className="text-gray-500 mt-2">
            Check out the latest tech gadgets.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow  text-black border-0 p-2 rounded-2xl"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 border-0 object-cover rounded-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold mt-1">${product.price}</p>
                <button
                  onClick={() => add(product._id)}
                  className="w-full mt-4 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
