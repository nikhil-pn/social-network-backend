const cloudinary = require("cloundinary").v2;

require("dotenv").config({ path: "../config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports = cloudinary;
