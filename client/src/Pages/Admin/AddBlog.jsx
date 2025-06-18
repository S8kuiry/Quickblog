import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/AppContext';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { axios, token } = useAppContext()

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [isAddBlog, setIsAddBlog] = useState(false)
  const [generate,setGenerate] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // handle blog post submission


  };

  // add blog functionality
  const addBlog = async () => {
    try {
      setIsAddBlog(true)

      const blog = {
        title,
        subTitle,
        category,
        isPublished,
        description: quillRef.current.root.innerHTML
      }
      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)
      const headers = {
        Authorizarion: token,

      }

      const { data } = await axios.post('/api/blog/add', formData, { headers })
      if (data.success) {
        toast.success("Blog Added Succesfully")
        setTitle(null);
        setSubTitle(null)
        setCategory("Startup");
        setIsPublished(false);
        setImage(null);
        quillRef.current.root.innerHTML = ""
        setIsAddBlog(false)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }
  //--------------------- generate content --------------------
  const generteContent = async () => {
    setGenerate(true)
    if (!title) {return toast.error("Please enter a title")};
    try {
      const headers = {
        Authorization: token,
      }
      const {data} = await axios.post('/api/blog/generate',{prompt:title},{headers})
      if(data.success){
        setGenerate(false)

        quillRef.current.root.innerHTML = data.content
      }else{
        toast.error(data.message)
      }
      
    

    } catch (error) {
      toast.error(error.message)

    }

  }

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',

      });
    }
  }, []);

  return (
    <div className="bg-primary/8 w-full h-[175vh] pt-14 pb-2 px-14 overflow-y-scroll flex flex-col justify-start items-start absolute top-0 bottom-[-1px]">
      <form
        onSubmit={onSubmitHandler}
        className="pt-8 text-gray-700 bg-white h-[160vh] w-[68%] flex flex-col items-start justify-start p-6 shadow-md rounded-md"
      >
        <p className="my-2 font-medium">Upload Thumbnail</p>
        <label className="mb-6 cursor-pointer" htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload Thumbnail"
            className="rounded h-16 border"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
            id="image"
          />
        </label>

        <div className="w-full flex flex-col items-start justify-center mb-4">
          <label htmlFor="title" className="font-medium">Blog Title</label>
          <input
            type="text"
            id="title"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            className="w-[66%] pl-2 border border-gray-300 py-[0.7rem] rounded mt-2"
          />
        </div>

        <div className="w-full flex flex-col items-start justify-center mb-4">
          <label htmlFor="subtitle" className="font-medium">Sub Title</label>
          <input
            type="text"
            id="subtitle"
            placeholder="Type here"
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-[66%] pl-2 border border-gray-300 py-[0.7rem] rounded mt-2"
          />
        </div>

        <p className="mt-4 font-medium">Blog Description</p>
        <div className="w-[66%] pt-2 relative h-74 mb-10">
          <div ref={editorRef} className="h-64 border border-gray-300 rounded" />
          <button
            type="button"
            onClick={generteContent}
            className="rounded text-white bg-gray-700 absolute bottom-[-34px] right-2 hover:underline transition-all py-[0.2rem] px-4 text-sm"
          >
            {!generate?"Generate with AI":"Generating...."}
          </button>
        </div>

        <p className="mt-[5rem] mb-2 font-medium">Blog Category</p>
        <select
          name="category"
          className="border border-gray-500 py-2 px-4 rounded mb-4"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {blogCategories.map((itm, idx) => (
            <option key={idx} value={itm}>
              {itm}
            </option>
          ))}
        </select>

        <div className="flex flex-col items-start  justify-start gap-4 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">

            <span>Publish Now</span>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
          </label>

          <button
            type="submit"
            className="rounded py-2 px-6 bg-primary text-white mt-2 hover:bg-primary/80 transition"
            onClick={addBlog}
          >
            {isAddBlog ? "Adding...." : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
