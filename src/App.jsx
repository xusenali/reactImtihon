import { Outlet } from "react-router"
import { api } from "./api/api"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react";


function App() {

  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length;
  });

  const [heartCount, setHaertCount] = useState(() => {
    const heart = JSON.parse(localStorage.getItem('wishlist')) || [];
    return heart.length;
  });

  return (
    <div>
      <Header cartCount={cartCount} heartCount={heartCount}/>
      <Outlet context={{ setCartCount , setHaertCount}} />
      <Footer />
    </div>
  )
}

export default App
