import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const { _id, title, description, category, image } = blog;

    

    return (
        <div 
            onClick={() => navigate(`blog/${_id}`)}
            className="h-76  shadow-lg rounded-lg w-full overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-250 cursor-pointer"
        >
            <img src={image} className="aspect-video rounded-t-lg" alt="Blog" />
            <span className="ml-5 mt-4 inline-block px-3 py-1 bg-primary/20 text-xs text-primary rounded-full">
                {category}
            </span>
            <div className="p-6">
                <h5 className="font-medium text-gray-900 mb-2">{title}</h5>
                <p className=" text-xs text-gray-600" dangerouslySetInnerHTML={{"__html":description.slice(0, 40)}}></p>
            </div>
        </div>
    );
}

export default BlogCard;
