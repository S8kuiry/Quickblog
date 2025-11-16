import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/blog.js'; // Make sure this import exists
import Comment from '../models/comment.js'
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !subTitle || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing Required Fields" });
    }

    // ✅ Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    // ✅ Optimize image URL
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' },
      ],
    });

    // ✅ Create blog in DB
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageURL,
      isPublished,
    });

    res.status(201).json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    console.error("❌ Error adding blog:", error.message);
    res.status(500).json({ success: false, message: "Blog could not be added" });
  }
};



export const getAllBlogs  = async (req,res)=>{
    try{
        const blogs =  await Blog.find({isPublished:true})
        res.json({succes:true,message:"Fetched Succesfully",blogs:blogs})

    }catch(error){
        res.json({success:false,message:error.message})
    }


}
export const getBlogById = async (req,res) =>{
    const {blogId} = req.params;

    
    try {
        
        const blog = await Blog.findById(blogId)
        if(!blog){
            res.json({success:false,message:"Blog not found"})

        }else{
            res.json({success:true,message:"Blog Found",blog:blog})
        }
        
    } catch (error) {
        res.json({success:false,message:error.message})

        
    }
}
export const deleteBlogById  = async (req,res)=>{
    try {
        const {id} = req.body

        await Blog.findByIdAndDelete(id)
        // delete comments related tothe blogs ...............
        await Comment.deleteMany({blog:id})


        res.json({success:true,message:"Blog Deleted Succesfully"})

        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const togglePublish =async (req,res)=>{
    const {id} = req.body
    try {
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success:true,message:"Blog Status Updated"})


    } catch (error) {
        res.json({success:false,message:error.message})

    }

}

export const addComment = async (req,res)=>{
  try {
    const {blog,name,content} = req.body
    await Comment.create({blog,name,content})
    res.json({success:true,message:"Comment added for review"})
    
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }

}


export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "blogId is required"
      });
    }

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Comments fetched successfully",
      comments
    });

  } catch (error) {
    console.error("getBlogComments error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const generateContent = async (req,res)=>{
  try {
    const {promt} = req.body;
    const content = await main(promt+'Generate a blog content for this topic in simple text format ')
    res.json({success:true,content:content})
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}

