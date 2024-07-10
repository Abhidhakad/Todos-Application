import React from 'react';

const Button = ({children,bgcolor}) => {
  return (
    <button className={`${bgcolor?bgcolor:"bg-blue-500"} bg-opacity-75 text-black font-semibold hover:bg-blue-700 py-2 px-4 rounded-md shadow-md focus:outline-none focus:border-none focus:border-blue-300 transition duration-300 ease-in-out
    `}>
      {children}
    </button>
  );
};

export default Button;
