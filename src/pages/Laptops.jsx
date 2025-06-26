import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, handleCart } from '../api/api';
import { CiHeart } from 'react-icons/ci';
import { Link, useOutletContext } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";

const Laptops = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const [wishlist, setWishlist] = useState([]);
  const { setCartCount, setHaertCount } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved.map(i => i.id));
  }, []);

  const toggleWishlist = (item) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isExist = existing.some(i => i.id === item.id);

    let updated;
    if (isExist) {
      updated = existing.filter(i => i.id !== item.id);
    } else {
      updated = [...existing, item];
    }

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlist(updated.map(i => i.id));
    setHaertCount(updated.length);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error loading data.</p>;

  const laptops = data?.filter(item => item.category === 'laptops');

  return (
    <div className="mt-10 w-[80%] mx-auto">
      <ul className='flex gap-5 items-center'>
        <Link to='/'>
          <li className='cursor-pointer text-gray-400'>Home</li>
        </Link>
        <li><FaAngleRight className='text-gray-400' /></li>
        <li className='cursor-pointer text-gray-400'>Laptops</li>
      </ul>

      <div className='py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {laptops?.map(product => (
          <div key={product.id} className="flex flex-col justify-between shadow-md p-4 rounded relative bg-white h-[400px]">

            <CiHeart
              onClick={() => toggleWishlist(product)}
              className={`absolute top-2 right-2 text-2xl cursor-pointer transition ${
                wishlist.includes(product.id)
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            />

            <div>
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain rounded" />
              <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Rating: <span className='text-orange-400'>{product.rating}</span>
              </p>
              <p className="text-gray-800 font-semibold mt-1">${product.price}</p>
            </div>

            <button
              onClick={() => handleCart(product, setCartCount)}
              className="block mt-4 w-[80%] mx-auto py-[12px] bg-black text-white rounded hover:bg-white hover:text-black hover:border transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptops;
