import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/AppContext';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios, token } = useAppContext();

  // ------------------ fetch blogs ----------------------
  const fetchBlogs = async () => {
    if (!token) return; // guard clause for empty token
    try {
      const headers = { Authorization: token };
      const { data } = await axios.get('/api/admin/blogs', { headers });

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching blogs.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]); // add token dependency to ensure refetch after token changes

  // ---------------------- toggle blog status (UI only) ------------------
  const toggleStatus = async (id) => {
    try {
      const headers = {Authorization:token}
      const {data}=await axios.post('/api/blog/toggle-publish',{id:id},{headers})
      if(data.success){
        fetchBlogs()
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  // ---------------------- delete Blogs ------------------
  const deleteBlog = async (id) => {
    const confirmDelete = await new Promise((resolve) => {
      toast.custom((t) => (
        <div className="bg-white shadow-md rounded px-6 py-4 text-gray-800 w-[280px]">
          <p className="mb-4">Are you sure you want to delete this blog?</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false); // Cancel
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true); // Confirm delete
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ));
    });

    if (!confirmDelete) return;

    try {
      const headers = { Authorization: token };
      const { data } = await axios.post('/api/blog/delete', { id }, { headers });

      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs(); // refresh list after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting.");
    }
  };

  return (
    <div className='bg-primary/6 w-full h-[700px] pt-14 px-14 overflow-y-scroll flex flex-col items-start justify-start'>
      <h1 className='text-xl font-semibold text-gray-800'>All Blogs</h1>

      {/* Blog Table */}
      <div className="bg-white w-[70vw] rounded-md shadow-md overflow-auto max-h-[390px] mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left border-b border-gray-300 sticky top-0 bg-white">
              <th className="px-4 py-3">#</th>
              <th className="px-6 py-3">Blog Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-primary/5 transition border-b border-gray-200">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{blog.title}</td>
                  <td className="px-6 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className={`px-6 py-3 text-md font-medium cursor-pointer ${blog.isPublished ? 'text-green-600' : 'text-red-500'}`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                  </td>
                  <td className="px-6 py-3 flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(blog._id)}
                      className="border border-gray-900 text-gray-600 text-sm px-3 py-1 rounded"
                    >
                      {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <img
                      onClick={() => deleteBlog(blog._id)}
                      src={assets.cross_icon}
                      alt="Delete"
                      className="cursor-pointer w-6 ml-2"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500" colSpan={5}>
                  No blogs to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
