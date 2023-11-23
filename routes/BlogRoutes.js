const router=require("express").Router()
const { postBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blogControllers");
const {auth,verifyRole}=require("../middlewares/authMiddleware")

router.post("/",auth,verifyRole(["author","admin"]),postBlog)
router.get("/",auth,getBlogs)
router.get("/:id",auth,getBlog)
router.patch("/:id",auth,updateBlog)
router.delete("/:id",auth,deleteBlog)

module.exports=router;