import React, { useState, useEffect } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs:0,comments:0,drafts:0,recentBlogs:[]
  });
 const [blogs,setBlogs] = useState([])


  const {token,axios} = useAppContext()

  //fetching dashboard data
  const getDashboard = async ()=>{
    try {
      const headers ={
        Authorization:token
      }
      const {data} = await axios.post('/api/admin/dashboard',{headers})
      if(data.success){
        setBlogs(data.dashboardData.recentBlogs)
        setDashboardData(data.dashboardData)
      }
      
    } catch (error) {
      toggleStatus.error(error.message)
      
    }

  }
 
  useEffect(() => {
    getDashboard()
   
    
  }, token);

  //------------ Toggle Status ------------------
  const toggleStatus = async (id) => {
    try {
      const headers = {Authorization:token}
      const {data}=await axios.post('/api/blog/toggle-publish',{id:id},{headers})
      if(data.success){
        getDashboard()
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
      
    }
  };
  //---------------------- delete data -------------------------
  
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
  
    // ⛔️ If user cancels, do nothing
    if (!confirmDelete) return;
  
    // ✅ Only runs if user confirmed
    try {
      const headers = { Authorization: token };
      const { data } = await axios.post('/api/blog/delete', { id }, { headers });
  
      if (data.success) {
        toast.success("Blog deleted successfully");
        getDashboard();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  


  return (
    <div className="bg-primary/6 w-full h-[760px]  pt-14 pb-2 px-14 overflow-y-scroll">
      
      {/* Summary Cards */}
      <div className="flex items-center justify-start w-full gap-4">
        <div className="w-[250px] h-[105px] bg-white shadow-md flex items-center gap-4 rounded-md px-4">
          <img src={assets.dashboard_icon_1} className="w-16" alt="Blog Icon" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{dashboardData.blogs}</h1>
            <p className="text-lg text-gray-500">Blogs</p>
          </div>
        </div>
        <div className="w-[250px] h-[105px] bg-white shadow-md flex items-center gap-4 rounded-md px-4">
          <img src={assets.dashboard_icon_2} className="w-16" alt="Comments Icon" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{dashboardData.comments}</h1>
            <p className="text-lg text-gray-500">Comments</p>
          </div>
        </div>
        <div className="w-[250px] h-[105px] bg-white shadow-md flex items-center gap-4 rounded-md px-4">
          <img src={assets.dashboard_icon_3} className="w-16" alt="Drafts Icon" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{dashboardData.drafts}</h1>
            <p className="text-lg text-gray-500">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Header */}
      <div className="w-full flex items-center justify-start my-6 pt-4">
        <img src={assets.dashboard_icon_4} className="mr-4 w-6" alt="Latest Blogs Icon" />
        <h1 className="text-xl text-gray-500">Latest Blogs</h1>
      </div>

      {/* Blog Table */}
      <div className="bg-white max-w-5xl  rounded-md shadow-md overflow-auto max-h-[390px] mt-4 relative">
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
            {dashboardData.recentBlogs.length > 0 && blogs.map((blog, index) => (
              <tr key={blog._id} className="hover:bg-primary/5 transition border-b border-gray-200">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-6 py-3">{blog.title}</td>
                <td className="px-6 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className={`px-6 py-3 text-md font-medium ${blog.isPublished ? 'text-green-600' : 'text-red-500'}`}>
                  {blog.isPublished ? 'Published' : 'Unpublished'}
                </td>
                <td className="px-6 py-3 flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => toggleStatus(blog._id)}
                    className="border border-gray-900 text-gray-600 text-sm px-3 py-1 rounded"
                  >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <img onClick={()=>deleteBlog(blog._id)} src={assets.cross_icon}  alt="Delete" className="cursor-pointer w-8 " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
