

import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Header = () => {
    const {setInput,input} = useAppContext()
    const inputRef = useRef()
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (inputRef.current) {
          const value = inputRef.current.value.trim();
          setInput(value);
        }
      };
    
      const onClear = () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setInput('');
      };
    
  return (
    <div className='mx-8 mt-36  sm:mx-16 xl:mx-24 relative'>
        <div className="text-center mt-10 mb-8">
            <div className=' inline-flex items-center justify-center gap-4 px-6 py-1.5 border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI feature Integrated</p>
                <img src={assets.star_icon} alt='star' className='w-2.5' ></img>
            </div>
            <h1 className='text-3xl sm:text-5xl font-semibold  text-gray-700 leading-normal'>Your own <span className='text-primary '>blogging</span><br/> platform</h1>
            
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xz text-gray-500'>This is your space to think out loud , to share what matters ,
                and to write without filters. Whether it's  one word or a thousand,your story starts right here</p>

            <form onSubmit={onSubmitHandler} className='w-full  flex items-center justify-center  border-black my-12 '>
                <input ref={inputRef} className='h-13 w-130 rounded-sm  pl-4 px-0 shadow-lg rounded-l-sm' type='text' placeholder='Search for blogs' required></input>
                <button className='h-13 bg-primary text-white px-9 shadow-lg rounded-r-sm ' type='Submit'>Search</button>
            </form>
            {inputRef.current?.value && inputRef.current.value.trim() !== "" &&(
                <div className="w-full flex items-center justify-center my-4 ">
                    <button onClick={onClear} className='border border-gray-400 rounded-sm py-2 px-2'>Clear Search</button>
                </div>
            )}
        </div>
        <img src={assets.gradientBackground} className='absolute -top-50  -z-3'></img>
      
    </div>
  )
}

export default Header
