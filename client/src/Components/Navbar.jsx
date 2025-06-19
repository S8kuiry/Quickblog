import React from 'react';
import { assets } from '../assets/assets.js';
import { useAppContext } from '../../context/AppContext.jsx';

const Navbar = () => {
  const {navigate,token} = useAppContext()

  return (
    <div className="w-full absolute top-[-0rem] bg-transparent  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
        />

        {/* Login Button */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center justify-center bg-primary rounded-full text-white text-lg py-2 px-8 gap-2 cursor-pointer"
        >
          {token?'Dashboard':'Login'}
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
