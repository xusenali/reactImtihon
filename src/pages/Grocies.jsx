import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, handleCart, handleWishlist } from '../api/api';
import { CiHeart } from 'react-icons/ci';
import { FaAngleRight } from 'react-icons/fa';
import { Link, useOutletContext } from 'react-router';

const Grocies = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const { setCartCount, setHaertCount } = useOutletContext();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(storedWishlist.map(item => item.id));
    }, []);

    if (isLoading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">Error loading data.</p>;

    const groceries = data?.filter(item => item.category === 'groceries');

    const handleWishlistClick = (product) => {
        handleWishlist(product, setHaertCount);
        const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(updatedWishlist.map(item => item.id));
    };

    return (
        <div className="mt-10 w-[80%] mx-auto">
            <ul className="flex gap-5 items-center mb-5">
                <Link to="/">
                    <li className="cursor-pointer text-gray-400">Home</li>
                </Link>
                <li><FaAngleRight className="text-gray-400" /></li>
                <li className="cursor-pointer text-gray-400">Groceries</li>
            </ul>

            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groceries?.map(product => (
                    <div key={product.id} className="shadow-md p-4 rounded relative bg-white flex flex-col justify-between">
                        <CiHeart
                            onClick={() => handleWishlistClick(product)}
                            className={`absolute top-2 right-2 text-2xl cursor-pointer transition ${wishlistItems.includes(product.id)
                                    ? 'text-red-500'
                                    : 'text-gray-400 hover:text-red-500'
                                }`}
                        />

                        <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain rounded" />
                        <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Rating: <span className="text-orange-400">{product.rating}</span></p>
                        <p className="text-gray-800 font-semibold mt-1">${product.price}</p>

                        <button
                            onClick={() => handleCart(product, setCartCount)}
                            className="block mx-auto mt-4 w-[80%] py-[12px] bg-black text-white rounded hover:bg-white hover:text-black hover:border transition"
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Grocies;
