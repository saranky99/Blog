const mongoose = require("mongoose");
const blogschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    likes:{
      type:Number,
    }
  }
);

const Blog = new mongoose.model("Blog", blogschema);
module.exports = Blog;