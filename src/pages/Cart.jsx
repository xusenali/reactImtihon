import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { setCartCount } = useOutletContext();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartWithQty = storedCart.map(item => ({ ...item, quantity: item.quantity || 1 }));
        setCartItems(cartWithQty);
    }, []);

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const increaseQty = (id) => {
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const decreaseQty = (id) => {
        const updated = cartItems.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCartItems(updated);
        updateLocalStorage(updated);
    };


    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));

        if (setCartCount) {
            setCartCount(updated.length);
        }
    };


    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = 50;
    const shipping = 29;
    const total = subtotal + tax + shipping;

    return (
        <div className="py-12 px-4 md:px-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-6">🛒 Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="bg-white p-10 rounded-lg text-gray-500 text-center shadow">
                            Your cart is empty
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-4 rounded-lg shadow">
                                    <div className="flex items-center gap-4">
                                        <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <h3 className="font-medium text-base">{item.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button onClick={() => decreaseQty(item.id)} className="text-gray-600"><FaMinus /></button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <button onClick={() => increaseQty(item.id)} className="text-gray-600"><FaPlus /></button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                        <FaRegTrashAlt
                                            onClick={() => removeItem(item.id)}
                                            className="cursor-pointer text-xl text-red-500 hover:text-red-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border bg-white rounded-lg p-6 h-fit shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>${tax}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-white hover:text-black hover:border transition">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
