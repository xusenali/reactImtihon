import React, { useEffect, useState } from 'react';
import { getProducts, handleCart } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { CiHeart } from "react-icons/ci";
import { FaLaptop, FaClock, FaMobileAlt, FaAppleAlt } from "react-icons/fa";
import { Link, useOutletContext } from 'react-router';

const Home = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const [wishlist, setWishlist] = useState([]);
    const { setCartCount, setHaertCount } = useOutletContext();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(stored.map(i => i.id));
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

    const topProducts = data?.filter(item => item.rating > 4);

    return (
        <div>
            <div className='img w-full h-150'></div>

            <div className='w-[80%] mx-auto py-10 mt-20'>
                <h1 className='text-4xl mb-5'>Browse By Category</h1>
                <ul className="flex gap-5 overflow-x-auto custom-scroll">
                    <Link to="/groceries">
                        <li className="w-40 flex flex-col items-center gap-1 bg-gray-100 text-sm px-4 py-3 rounded shadow hover:bg-gray-200 cursor-pointer">
                            <FaAppleAlt className="text-xl" />
                            <span className="text-xs">groceries</span>
                        </li>
                    </Link>

                    <Link to="/laptops">
                        <li className="w-40 flex flex-col items-center gap-1 bg-gray-100 text-sm px-4 py-3 rounded shadow hover:bg-gray-200 cursor-pointer">
                            <FaLaptop className="text-xl" />
                            <span className="text-xs">laptops</span>
                        </li>
                    </Link>

                    <Link to="/menswatches">
                        <li className="w-40 flex flex-col items-center gap-1 bg-gray-100 text-sm px-4 py-3 rounded shadow hover:bg-gray-200 cursor-pointer">
                            <FaClock className="text-xl" />
                            <span className="text-xs">mens-watches</span>
                        </li>
                    </Link>

                    <Link to="/mobile-accessories">
                        <li className="w-40 flex flex-col items-center gap-1 bg-gray-100 text-sm px-4 py-3 rounded shadow hover:bg-gray-200 cursor-pointer">
                            <FaMobileAlt className="text-xl" />
                            <span className="text-xs">mobile-accessories</span>
                        </li>
                    </Link>
                </ul>
            </div>

            <div className='w-[80%] mx-auto'>
                <h1 className='text-4xl'>Top Products</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                    {topProducts?.map(item => (
                        <div key={item.id} className="shadow-md p-4 rounded relative flex flex-col justify-between h-[400px] bg-white">

                            <CiHeart
                                onClick={() => toggleWishlist(item)}
                                className={`absolute top-2 right-2 text-2xl cursor-pointer transition ${wishlist.includes(item.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                    }`}
                            />

                            <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-contain rounded" />
                            <h3 className="mt-2 font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-gray-600 my-3">Rating: <span className='text-orange-400'>{item.rating}</span></p>
                            <p className="text-sm text-blue-500 font-medium">${item.price}</p>

                            <button
                                onClick={() => handleCart(item, setCartCount)}
                                className="block mx-auto mt-3 w-[80%] p-[10px] bg-black text-white rounded hover:text-black hover:bg-white hover:border transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
