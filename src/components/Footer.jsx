import React from 'react';
import { FaFacebookF, FaInstagram, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">Deals</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-300">📞 +1 (555) 123-4567</p>
          <p className="text-gray-300">📍 New York, USA</p>
          <p className="text-gray-300">✉️ support@store.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-xl text-gray-300">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTelegramPlane /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Store.com – All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
