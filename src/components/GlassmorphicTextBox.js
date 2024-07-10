import React from 'react';

const GlassmorphicTextBox = () => {
  return (
    <div className=' bg-gray-700'
    // className="bg-gradient-to-t from-gray-800 via-gray-700 to-transparent p-8"
    >
      <div className="max-w-md mx-auto rounded-md overflow-hidden bg-white bg-opacity-20 shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Glassmorphic Text Box</h1>
        <p className="text-gray-300 mb-4">
          This is a simple text box with a glassmorphic effect created using Tailwind CSS.
        </p>
        <textarea
          className="w-full h-40 p-4 bg-opacity-40 bg-gray-600 text-white rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your text here..."
        />
      </div>
    </div>
  );
};

export default GlassmorphicTextBox;
