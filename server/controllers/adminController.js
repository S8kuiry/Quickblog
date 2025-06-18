
import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import Comment from '../models/comment.js'

export const adminLogin = async (req,res)=>{
    try{

        const {email,password} = req.body
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return  res.json({success:false , message : "Invalid Credentials"})
        }
        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({success : true,token:token})
    }catch(error){
        res.json({success:false , message : error.message})


    }

}


export const getAllBlogsAdmin =async (req,res)=>{
    try {
        const blogs =await Blog.find({}).sort({createdAt:-1})
        res.json({success:true,message:"All Blogs Fteched Succesfully",blogs:blogs})

        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}

export const getAllCommnets  =async (req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1})
        res.json({success:true,message:"Comments fetched succesfully",comments:comments})

        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}

export const getDashboard = async (req,res)=>{
    
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(6)
        const blogs = await Blog.countDocuments()
        const comments  = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished:false})
        const dashboardData = {
            blogs,comments,drafts,recentBlogs
        }
        res.json({success:true,message:"Data fetched succesfully",dashboardData:dashboardData})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const deleteCommentById = async (req,res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id)
        res.json({success:true,message:"Comment Deleted Succesfully"})
        
    } catch (error) {
        res.json({success:false,message:error.message})

        
    }
}

export const approveCommentById = async (req,res)=>{
    try {
        const {id} = req.body
        const comment =await Comment.findById(id)
        await Comment.findByIdAndUpdate(id,{isApproved:!comment.isApproved}, { new: true })
        res.json({success:true,message:"Comment Approved Succesfully"})


    } catch (error) {
        res.json({success:false,message:error.message})

    }
}