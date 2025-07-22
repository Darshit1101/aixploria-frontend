import React from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white px-4">

      <div className="z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded hover:bg-green-600 transition"
        >
          <House strokeWidth={1.5} size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
