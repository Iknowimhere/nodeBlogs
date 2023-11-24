const Blog = require("../models/Blogs");

const postBlog=async(req,res)=>{
    try {
        let user=req.user;
        const newBlog=await Blog.create({
            title:req.body.title,
            snippet:req.body.snippet,
            description:req.body.description,
            image:req.body.image,
            author:user._id
        })
        res.status(201).json({
            status:'success',
            data:{
                newBlog
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const getBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id)
        res.status(200).json({
            status:'success',
            data:{
                blog
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const getBlogs=async(req,res)=>{
    try {
        let search=req.query.search || ""
        let page=req.query.page*1 || 1
        let limit=req.query.limit*1 || 3
        let author=req.query.author || ""
        let skip=(page-1)*limit
        const blogs=await Blog.find({title:{$regex:search,$options:"i"}}).where("author").in([author]).skip(skip).limit(limit)
        res.status(200).json({
            status:'success',
            data:{
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const updateBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:'success',
            data:{
                updatedBlog
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const deleteBlog=async(req,res)=>{
    try {
        const {id}=req.params
    await Blog.findByIdAndDelete(id)
        res.status(200).json({
            status:'success',
            data:null
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
module.exports={
    postBlog,getBlog,getBlogs,updateBlog,deleteBlog
}