import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./authContextt";
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [cartDetail, setCartSetail] = useState({
    totalAmt: 0,
    taxAmt: 0,
    subTotal: 0,
  });
  const safeSetCart = (data) => {
    setCart({
      items: Array.isArray(data?.items) ? data.items : [],
    });
    if (data.totalAmt !== undefined) {
      setCartSetail({
        totalAmt: data.totalAmt,
        subTotal: data.subTotal,
        taxAmt: data.taxAmt,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    api("/api/cart")
      .then(safeSetCart)
      .catch(() => setCart({ items: [] }));
  }, [user]);

  const add = async (productId) => {
    const data = await api("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    safeSetCart(data);
  };

  const updateCart = async (productId, quantity) => {
    const data = await api("/api/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
    safeSetCart(data);
  };

  const remove = async (productId) => {
    const data = await api("/api/cart/remove", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    });
    safeSetCart(data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        add,
        updateCart,
        remove,
        cartDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
