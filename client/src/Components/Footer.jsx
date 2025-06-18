import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../../context/AppContext';


const Footer = () => {

    

    return (
        <footer className='w-full bg-primary/10 py-8 px-[7rem] text-sm text-gray-600 absolute bottom-[-60]'>
            <div className="flex flex-col md:flex-row flex-wrap justify-between gap-12 max-w-7xl mx-auto pt-2">
                
                {/* Logo & Description */}
                <div className="flex flex-col w-full md:w-[22rem]">
                    <img src={assets.logo} className='w-36 mb-4' alt="Logo" />
                    <p className='leading-relaxed'>
                        Discover insights, trends, and practical advice through our thoughtfully written blog posts. Stay inspired and informed with QuickBlog.
                    </p>
                </div>

                {/* Blog Navigation */}
                <div className="flex flex-col gap-3 min-w-[10rem]">
                    <h2 className='font-semibold text-gray-800 mb-2'>Explore</h2>
                    <ul className='space-y-1 text-gray-600 hover:text-gray-800 transition-all'>
                        <li className='hover:text-primary cursor-pointer'>Latest Posts</li>
                        <li className='hover:text-primary cursor-pointer'>Categories</li>
                        <li className='hover:text-primary cursor-pointer'>Popular Reads</li>
                        <li className='hover:text-primary cursor-pointer'>Archives</li>
                        <li className='hover:text-primary cursor-pointer'>Write for Us</li>
                    </ul>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-3 min-w-[10rem]">
                    <h2 className='font-semibold text-gray-800 mb-2'>Support</h2>
                    <ul className='space-y-1 text-gray-600 hover:text-gray-800 transition-all'>
                        <li className='hover:text-primary cursor-pointer'>Help Center</li>
                        <li className='hover:text-primary cursor-pointer'>Privacy Policy</li>
                        <li className='hover:text-primary cursor-pointer'>Terms of Service</li>
                        <li className='hover:text-primary cursor-pointer'>Report an Issue</li>
                        <li className='hover:text-primary cursor-pointer'>Contact Us</li>
                    </ul>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-3 min-w-[10rem]">
                    <h2 className='font-semibold text-gray-800 mb-2'>Follow Us</h2>
                    <ul className='space-y-1 text-gray-600 hover:text-gray-800 transition-all'>
                        <li className='hover:text-primary cursor-pointer'>Instagram</li>
                        <li className='hover:text-primary cursor-pointer'>Twitter</li>
                        <li className='hover:text-primary cursor-pointer'>Facebook</li>
                        <li className='hover:text-primary cursor-pointer'>You Tube</li>
                    </ul>
                </div>
            </div>

            {/* Divider and Copyright */}
            <div className='border-t border-gray-300 mt-10 pt-4'>
                <p className='text-center text-gray-500 text-xs'>
                    © 2025 QuickBlog — All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
