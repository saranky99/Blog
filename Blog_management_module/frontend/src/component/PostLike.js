import React,{useState} from "react";
import styles from "./BlogCard.module.css";

import 'antd/dist/antd.min.css';
import { message } from "antd"; 

import { Link } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";

const PostLike=({likesCount,handleLikeClick=()=>null})=>{
    const [count, setCount] = useState(likesCount);
const [like,setLike] = React.useState(false);
    

return (
    <div className="app">
      {/* <button onClick={incrementCount}>Click Here</button> */}
      {/* <button onClick={incrementCount}>Click Here</button>  */}
      <FiThumbsUp style={{ width: "32px",
height: "32px", color:"#00008B",fill:like?'#00008B':''}} onClick={()=>{
  if(!like){
    handleLikeClick(count+1);
  setCount(prevState=>prevState+1);
  setLike(true);
}
}}  /> 

      <b>{count}</b>
    </div>
  );
}

export default PostLike;
