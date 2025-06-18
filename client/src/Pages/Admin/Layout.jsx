import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';

const Layout = () => {
  const navigate = useNavigate();
  const {setToken,token} = useAppContext()
  const logout = ()=>{
    navigate('/');
    setToken(null); // clear context state
  localStorage.removeItem('token'); // remove from storage
  axios.defaults.headers.common["Authorization"] = null; // remove from axios
   // redirect to login or homepage

  }

  return (
    <div className="w-full relative min-h-screen bg-white font-sans">

      {/* Top Navbar */}
      <div className="w-full flex items-center justify-between absolute top-[-38px] left-0 right-0
        bg-white border-b border-primary/15 py-2 px-6 z-50 shadow shadow-r-lg">
        <img onClick={()=>navigate('/')} src={assets.logo} className="w-[11rem]" alt="Logo" />
        <button onClick={logout} className="rounded-full bg-primary py-2 px-6 text-white hover:bg-primary/90 transition-all">
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div
        className="fixed top-[4.5rem] bottom-0 left-0 w-[17rem] 
          border-r border-primary/15 bg-white rounded-br-lg 
          shadow-lg z-40 flex flex-col"
      >
        <nav className="flex flex-col py-4 px-2 gap-1 text-gray-700">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-3 px-5 py-6 rounded-lg hover:bg-primary/10 hover:text-primary transition-all shadow shadow-b-lg">
            <img src={assets.home_icon} alt="Dashboard" className="w-6" />
            <span className="text-base font-medium">Dashboard</span>
          </button>

          <button onClick={() => navigate('/admin/listblog')} className="flex items-center gap-3 px-5 py-6 rounded-lg hover:bg-primary/10 hover:text-primary transition-all shadow shadow-b-lg">
            <img src={assets.list_icon} alt="Blog Lists" className="w-6" />
            <span className="text-base font-medium">Blog Lists</span>
          </button>

          <button onClick={() => navigate('/admin/addblog')} className="flex items-center gap-3 px-5 py-6 rounded-lg hover:bg-primary/10 hover:text-primary transition-all shadow shadow-b-lg">
            <img src={assets.add_icon} alt="Add Blogs" className="w-6" />
            <span className="text-base font-medium">Add Blogs</span>
          </button>

          <button onClick={() => navigate('/admin/comments')} className="flex items-center gap-3 px-5 py-6 rounded-lg hover:bg-primary/10 hover:text-primary transition-all shadow shadow-b-lg">
            <img src={assets.comment_icon} alt="Comments" className="w-6" />
            <span className="text-base font-medium">Comments</span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="ml-[15rem] mt-[3.1rem] p-6 h-[100vh] w-full bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
