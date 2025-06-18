import React, { useEffect, useState } from 'react';
import { assets, comments_data } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  /* grab axios + token from context */
  const { axios, token } = useAppContext();

  /* ---------- fetch all comments ---------- */
  const fetchComments = async () => {
    if (!token) return;                     // guard until token is ready
    try {
      const { data } = await axios.get('/api/admin/comments', {
        headers: { Authorization: token },  // add Bearer … if backend expects it
      });

      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------- delete a comment ---------- */
  const deleteComments = async (id) => {
    const confirmed = await new Promise((resolve) => {
      toast.custom((t) => (
        <div className="bg-white shadow-md rounded px-6 py-4 text-gray-800 w-[280px]">
          <p className="mb-4">Are you sure you want to delete this comment?</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ));
    });

    if (!confirmed) return;

    try {
      const { data } = await axios.post(
        '/api/admin/delete-comments',
        { id },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        toast.success('Comment deleted successfully');
        fetchComments();                    // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------- approve a comment ---------- */
  const approveComments = async (id) => {
    const confirmed = await new Promise((resolve) => {
      
      toast.custom((t) => (
        <div className="bg-white shadow-md rounded px-6 py-4 text-gray-800 w-[280px] bg-green-100">
          <p className="mb-4">{filter === "Not Approve"?"Are you sure you want to do this?":"Are you sure you want to do this"}</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              yes
            </button>
          </div>
        </div>
      ));
    });

    if (!confirmed) return;

    try {
      const { data } = await axios.post(
        '/api/admin/approve-comment',
        { id },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        toast.success(`${filter === "Not Approve"?'Comment approved successfully':"Comment Unapproved Succesfully"}`);
        fetchComments();                    // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------- initial & token‑change fetch ---------- */
  useEffect(() => {
    fetchComments();
  }, [token]);

  /* ---------- filter logic ---------- */
  const filteredComments = comments.filter((c) =>
    filter === 'Approved' ? c.isApproved : !c.isApproved
  );

  /* ---------- render ---------- */
  return (
    <div className="bg-primary/6 w-full h-[760px] pt-14 pb-2 px-14 overflow-y-scroll flex flex-col justify-start items-start">
      {/* Header + Filters */}
      <div className="flex items-center justify-between w-[80%] mb-6">
        <h1 className="text-xl font-semibold text-gray-700">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`rounded-full border border-gray-900 py-1 px-4 text-sm transition ${
              filter === 'Approved' ? 'text-primary/90' : 'text-gray-900'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`rounded-full border border-gray-900 py-1 px-4 text-sm transition ${
              filter === 'Not Approved' ? 'text-primary/90' : 'text-gray-900'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white w-[80%] rounded-md shadow-sm overflow-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-white sticky top-0 z-10 text-gray-600 text-sm font-medium">
            <tr>
              <th className="py-3 px-4">Blog Title & Comments</th>
              <th className="py-3">Date</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-primary/5 transition"
                >
                  {/* Blog Title & Comments */}
                  <td className="py-3">
                    <div className="flex flex-col px-4">
                      <span className="font-semibold text-gray-800 mb-4">
                        {item.blog.title}
                      </span>
                      <span className="text-sm text-gray-500 mb-2">
                        By : {item.name}
                      </span>
                      <span className="text-sm text-gray-700">
                        {item.content}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap align-middle">
                    <div className="flex items-center h-full">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Action Icons */}
                  <td className="py-3 px-4 text-sm align-middle">
                    <div className="flex items-center gap-3 h-full">
                      {filter === 'Not Approved' ? (
                        <img
                          onClick={() => approveComments(item._id)}
                          src={assets.tick_icon}
                          className="w-4 cursor-pointer"
                          alt="Approve"
                        />
                      ) : (
                        <div onClick={()=>approveComments(item._id)} className="rounded-full bg-green-100 text-green-900 border border-gren-800 py-1 px-4 text-sm">
                          Approved
                        </div>
                      )}

                      <img
                        onClick={() => deleteComments(item._id)}
                        src={assets.bin_icon}
                        className="w-4 cursor-pointer"
                        alt="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-6 text-gray-500 text-sm px-4" colSpan={3}>
                  No comments to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
