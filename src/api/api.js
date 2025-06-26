import axios from 'axios';
import { toast } from 'react-hot-toast';

export const api = axios.create({
    baseURL: 'https://dummyjson.com',

});

export const getProducts = async () => {
    const res = await api.get('/products?limit=100');
    return res.data.products;
};



export const handleCart = (item, setCartCount) => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  const isExist = existingCart.some(tavar => tavar.id === item.id);

  if (!isExist) {
    const updatedCart = [...existingCart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Product added to cart!');
    setCartCount(updatedCart.length); 
  } else {
    toast.error('This product is already in the cart!');
  }
};



export const handleWishlist = (item, setHeartCount) => {
  const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isExist = existing.some(product => product.id === item.id);

  if (!isExist) {
    const updated = [...existing, item];
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success('Added to wishlist!');

    if (setHeartCount) {
      setHeartCount(updated.length);
    }

  } else {
    toast.error('Already in wishlist!');
  }
};