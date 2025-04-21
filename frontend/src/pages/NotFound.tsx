import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 tracking-widest">404</h1>
      <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute text-white mt-[-40px] ml-[-30px]">Page Not Found</div>
      <p className="text-gray-500 mt-6 mb-8 text-lg">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound