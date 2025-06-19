import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home.jsx'
import Blog from '../src/Pages/Blog.jsx'
import Layout from './Pages/Admin/Layout.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import AddBlog from './Pages/Admin/AddBlog.jsx'
import ListBlog from './Pages/Admin/ListBlog.jsx'
import Comments  from './Pages/Admin/Comments.jsx'
// App.jsx
import Login from "./Pages/Login.jsx";
import 'quill/dist/quill.snow.css'; // ✅ Important: must be imported
import {Toaster} from 'react-hot-toast'
import { useAppContext } from '../context/AppContext.jsx'
const App = () => {
  const {token} = useAppContext()
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/blog/:id'element={<Blog/>} />
        <Route path='/admin' element={token?<Layout/>:<Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addblog' element={<AddBlog/>}/>
          <Route path='listblog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>


        </Route>

      </Routes>
      
    </div>
  )
}

export default App
