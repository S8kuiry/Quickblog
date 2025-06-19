import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Moment from 'moment';
import Loader from '../Components/Loader';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);   // start empty

  // ---- fetch blog ----
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---- fetch comments ----
  const fetchCommentData = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      data.success ? setComment(data.comments) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // run both calls on mount & when `id` changes
  useEffect(() => {
    fetchBlogData();
    fetchCommentData();
  }, [id]);

  // ---- post a new comment ----
  const nameRef = useRef();
  const textRef = useRef();

  const postComment = async () => {
    const pname = nameRef.current?.value.trim();
    const content = textRef.current?.value.trim();

    if (!pname || !content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name: pname,
        content,
      });

      if (data.success) {
        // refresh list after successful post
        toast.success("Comment added for review ")
        fetchCommentData();
        nameRef.current.value = '';
        textRef.current.value = '';
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------- render ---------- */
  return data ? (
    <>
    <Navbar />
      <div className="relative">
        
        <img src={assets.gradientBackground} className="absolute -z-1 -top-[60px] -opacity-50" />

        {/* header */}
        <div className="w-full flex flex-col items-center justify-center mt-[11rem]">
          <p className="text-xs text-primary font-medium">
            Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
          </p>

          <h1 className="text-center font-medium text-4xl py-4 max-w-lg">{data.title}</h1>
          <p className="text-xs text-primary font-medium">{data.subTitle}</p>
          <button className="rounded-full border border-primary bg-primary/6 text-s py-[0.3rem] px-6 text-primary mt-6">
            Micheal Brown
          </button>
        </div>

        {/* body */}
        <div className="md:mx-auto py-10 mt-14 mx-6 max-w-5xl">
          <img src={data.image} alt="" className="rounded-3xl mb-10" />
          <div
            className="rich-text mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* comments */}
        <div className="max-w-3xl mt-12 mb-14 mx-auto flex flex-col ">
          <p className="font-semibold text-lg mb-2">Comments ({comment.length})</p>

          <div className="overflow-y-auto max-h-[450px]  rounded-md pr-3">
            {comment.length === 0 ? (
              <div className="w-full flex items-center justify-center my-4">
                <span className="w-full py-6 px-8 bg-gray-300 flex items-center justify-center rounded-sm">
                  <h1>No Comments</h1>
                </span>
              </div>
            ) : (
              comment.map((c) => (
                <div
                  key={c._id}
                  className="w-full bg-gray-100 rounded-sm my-4 py-4 px-4"
                >
                  <div className="flex items-center gap-2">
                    <img src={assets.user_icon} className="w-[2rem]" alt="User" />
                    <p className="font-medium">{c.name}</p>
                  </div>
                  <div className="w-full flex justify-between items-start py-2">
                    <p className="pl-10 text-sm text-gray-700">{c.content}</p>
                    <p className="text-xs text-gray-400">
                      {Moment(c.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


        {/* add comment */}
        <div className="max-w-3xl mt-12 mb-14 mx-auto flex flex-col">
          <p className="font-semibold text-lg mb-2">Add Your Comment</p>
          <input
            ref={nameRef}
            placeholder="Name"
            className="max-w-xl h-12 border border-gray-500 pl-4"
            required
          />
          <textarea
            ref={textRef}
            placeholder="Comment"
            className="max-w-xl h-64 border border-gray-500 pl-4 mt-8 pt-2"
            required
          />
          <button
            onClick={postComment}
            className="rounded-sm bg-primary my-4 h-10 w-[7rem] text-white"
          >
            Submit
          </button>

          {/* share */}
          <div className="mt-24 mb-26">
            <p className="font-semibold">Share this article on Social Media</p>
            <div className="flex items-center justify-start py-6">
              <span>
                <img src={assets.facebook_icon} alt="facebook" />
              </span>
              <span>
                <img src={assets.twitter_icon} alt="twitter" />
              </span>
              <span>
                <img src={assets.googleplus_icon} alt="gplus" />
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Blog;
