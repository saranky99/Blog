const mongoose = require("mongoose");
const commentschema = new mongoose.Schema(
  {
     name: {
       type: String,
       required: true,
     },
    comcon: {
      type: String,
      required: true,
    },
   
  }
);
const Comment = new mongoose.model("Comment", commentschema);
module.exports = Comment;