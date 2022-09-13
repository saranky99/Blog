const { Int32, Long } = require("mongodb");
const mongoose = require("mongoose");
const likeschema = new mongoose.Schema(
  {
     count: {
       type: Number,
       required: true,
     },
    
   
  }
);
const Like = new mongoose.model("Like", likeschema);
module.exports = Like;