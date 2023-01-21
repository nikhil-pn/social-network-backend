const express = require("express")
const router = express.Router()

const upload = require("../middleware/multer")

router.post("/createPost", upload.single("file"), postController.createPost)