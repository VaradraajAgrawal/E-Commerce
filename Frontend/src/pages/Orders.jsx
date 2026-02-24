import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContextt";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await api("/order");
        // Ensure we are working with an array even if backend sends a single object
        const dataAsArray = Array.isArray(res) ? res : [res];
        setOrderData(dataAsArray);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center min-w-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-100/50 border border-gray-100 max-w-sm w-full text-center">
          {/* Animated Icon Container */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <span className="text-4xl animate-bounce">🔐</span>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Please log in to view your order history and track your active
            deliveries.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/Login")}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-white text-gray-600 py-4 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          {/* Inner Pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-gray-400 font-medium tracking-widest uppercase text-[10px]">
          Retrieving your orders
        </p>
      </div>
    );
  }

  if (!orderData || orderData.length === 0) {
    return (
      <div className="pt-40 text-center min-w-screen">
        <h2 className="text-2xl text-center font-semibold text-gray-600">
          No orders found yet!
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 underline mt-2 text-center"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Logic for splitting orders
  const latestOrder = orderData[0];
  const previousOrders = orderData.slice(1); // All orders except the first one

  return (
    <div className="min-h-screen bg-gray-50 min-w-screen pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 🏆 Section 1: Latest Order (Detailed View) */}
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
          Latest Order
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Order ID
                </p>
                <h1 className="text-lg font-mono font-bold text-gray-800">
                  {latestOrder?._id}
                </h1>
              </div>
              <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                {latestOrder?.status}
              </span>
            </div>

            {latestOrder?.items?.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl shadow-sm"
                />
                <div className="flex-1 text-black">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">
                  ₹{item.price?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                Payment Info
              </h2>
              <div className="space-y-3 text-sm text-black">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{latestOrder?.subTotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax</span>
                  <span>₹{latestOrder?.taxAmt?.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center font-bold text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-xl text-blue-600">
                    ₹{latestOrder?.totalAmt?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 Section 2: Previous Orders (List View) */}
        {previousOrders.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-gray-300 w-2 h-8 rounded-full"></span>
              Order History
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-black">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {previousOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-blue-50/50 transition-colors cursor-default"
                    >
                      <td className="px-6 py-4 font-mono text-sm text-blue-600">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 rounded-md">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        ₹{order.totalAmt?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
