

import React from 'react'
import { useRef } from 'react'



const NewsLetter = () => {
    const inputRef = useRef()
    const handleOnSubmit = ()=>{
        
        inputRef.current.value = ""
        
        
    }
    return (
        <div className='width-full flex flex-col items-center justify-start gap-8 my-48 '>
            <h1 className='font-medium text-3xl text-black'>Never Miss a Blog!</h1>
            <p className='text-gray-400 font-medium'>Subscribe to get the new blog,new tech and exclusive news</p>
            <div className="flex items-center justify-center gap:4 w-full">
                <input ref={inputRef} type='text'
                    className='pl-4 border border-black/20
                    w-[30rem] py-2 h-12 outline-none rounded-md rounded-r-none' 
                    placeholder='Enter your email id'
                />
                <button  onClick={handleOnSubmit} type='submit' className=' h-12 bg-primary/80 text-white px-10 py-4 rounded-md rounded-l-none
                 hover:bg-primary transition-all cursor-pointer
                 flex items-center justify-center
                 '>SUBSCRIBE</button>
            </div>

        </div>
    )
}

export default NewsLetter
