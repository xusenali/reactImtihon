import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { handleCart } from "../api/api";

const Heart = () => {
  const [wishlist, setWishlist] = useState([]);
  const { setCartCount, setHaertCount } = useOutletContext(); // ← kontekstdan olish

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setHaertCount(updated.length); // ← count yangilanadi
  };

  const addToCart = (item) => {
    handleCart(item, setCartCount); // ← cartga qo‘shish
  };

  return (
    <div className="py-12 px-4 md:px-10 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">💖 Wishlist</h2>

        {wishlist.length === 0 ? (
          <div className="bg-white p-10 rounded-lg text-gray-500 text-center shadow">
            Your wishlist is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md relative flex flex-col justify-between h-[400px]"
              >
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                  title="Remove"
                >
                  <FaRegTrashAlt />
                </button>

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3 rounded"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">${item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-auto bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Heart;
