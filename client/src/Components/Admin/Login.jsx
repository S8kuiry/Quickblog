

import React, { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'

import toast from 'react-hot-toast'


const Login = () => {
    const {axios,setToken} = useAppContext()
    const [email,setEmail] = useState("admin@gmail.com")
    const [password,setPassword] = useState("123456789")
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} =await axios.post('/api/admin/login',{email,password})
            if(data.success){
                setToken(data.token)
                localStorage.setItem('token',data.token)
                axios.defaults.headers.common["Authorization"] = data.token
            }else{
                toast.error(data.message)
                
            }

            
        } catch (error) {
            toast.error(error.message)
            
        }
    }
  return (
    <div className='w-full fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center'>    
        <form className=' w-[390px] rounded-md shadow-2xl border border-primary/50 h-[440px]
        flex flex-col items-center justify-start py-4 px-4
        '>
            <h1 className='text-3xl font-bold mt-6'><span className='text-primary/90'>Admin</span> Login</h1>
            <p className='px-6 text-center font-[400] '>Enter Your Credentials to access the admin panel</p>

            <div className="w-[90%] px-2 flex flex-col items-start justify-center mt-10 border-b border-gray-300 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)]">
                <p className='text-gray-500'>Email</p>
                <input onChange={(e) => setEmail(e.target.value)}  type='email' className='w-full h-[3rem] pl-2 text-gray-500' value={"admin@gmail.com"}></input>
            </div>
            <div className="w-[90%] px-2 flex flex-col items-start justify-center mt-4  border-b border-gray-300 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)]">
                <p className='text-gray-500'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)}  type='password' className='w-full h-[3rem] pl-2 text-gray-500' value={"123456789"}></input>
            </div>

            <button onClick={handleSubmit} className='w-[90%] py-4 px-4 my-6 bg-primary text-white rounded-sm'>Login</button>
        
        </form>
      
    </div>
  )
}

export default Login
