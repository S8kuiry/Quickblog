import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      {/* Spinning Gradient Ring */}
      <div className="w-16 h-16 mb-4 relative">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300 opacity-30"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text with Animated Dots */}
      <div className="text-lg font-semibold flex space-x-1">
        <span>Loading</span>
        <span className="animate-bounce delay-100">.</span>
        <span className="animate-bounce delay-200">.</span>
        <span className="animate-bounce delay-300">.</span>
      </div>
    </div>
  );
};

export default Loader;
