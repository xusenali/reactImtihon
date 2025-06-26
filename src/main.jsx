import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Grocies from './pages/Grocies.jsx'
import Cart from './pages/Cart.jsx'
import Laptops from './pages/Laptops.jsx'
import MensWatches from './pages/MensWatches.jsx'
import MobileAccessories from './pages/MobileAccessories.jsx'
import { Toaster } from 'react-hot-toast';
import Heart from './pages/Heart.jsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'groceries',
        element: <Grocies />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'laptops',
        element: <Laptops />
      },
      {
        path: 'menswatches',
        element: <MensWatches />
      },
      {
        path: 'mobile-accessories',
        element: <MobileAccessories />
      },
      {
        path: 'heart',
        element: <Heart />
      }


    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>
)
