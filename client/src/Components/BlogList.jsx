import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from "framer-motion"; // ✅ correct
import BlogCard from './BlogCard';
import { useAppContext } from '../../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!Array.isArray(blogs)) return [];

    const lowerInput = input.trim().toLowerCase();

    // If no input, return all blogs
    if (!lowerInput) {
      return blogs;
    }

    // Otherwise, filter by title or category
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(lowerInput) ||
      blog.category.toLowerCase().includes(lowerInput)
    );

  };

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 my-10 flex-wrap">
        {blogCategories.map((item, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative text-gray-700 font-medium cursor-pointer ${menu === item ? 'px-4 py-1 text-white bg-primary rounded-full' : 'text-gray-500'}`}
            >
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                />
              )}
              {item}
            </button>
          </div>
        ))}
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {
          filteredBlogs()
          .filter(blog => menu === "All" || blog.category === menu)
          .map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        }
      </div>
    </div>
  );
};

export default BlogList;
