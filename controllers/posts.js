const cloudinary = require("../middleware/cloudinary")

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
    }
}