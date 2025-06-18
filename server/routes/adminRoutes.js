

import express from 'express'
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommnets, getDashboard } from '../controllers/adminController.js'
import auth from '../middleware/auth.js';


const adminRouter = express.Router();

adminRouter.post("/login",adminLogin)
adminRouter.get('/comments',auth,getAllCommnets)
adminRouter.get("/blogs",auth,getAllBlogsAdmin)
adminRouter.post("/delete-comments",auth,deleteCommentById)
adminRouter.post("/approve-comment",auth,approveCommentById)
adminRouter.post("/dashboard",auth,getDashboard)


export default adminRouter;

