import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 bg-opacity-20 text-black py-4">
      <div className="container mx-auto flex flex-col items-center">
       <div>
       <div className="flex mb-4">
          <span className="text-2xl font-bold">Todo App</span>
        </div>
        <div className="mb-4">
          <p className="text-sm">Built with React and Tailwind CSS</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Todo App</p>
        </div>
       </div>
       <div></div>
      </div>
    </footer>
  );
};

export default Footer;
