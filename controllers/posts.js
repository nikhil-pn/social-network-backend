const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post");
module.exports = {
    createPost : async(req, res)=>{
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            await postMessage.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id
            })
        } catch (error) {
            console.log(error)
        }
    },
    deletePost : async(req, res)=>{
        try {
            let post =  await Post.findById(req.params.id)
            await cloudinary.uploader.destroy(post.cloudinaryId)
        } catch (error) {
            
        }
    }
}