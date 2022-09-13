import React,{useState} from "react";
import styles from "./BlogCard.module.css";
//import StudentDefaultLayout from '../layout/StudentDefaultLayout';
import 'antd/dist/antd.min.css';
import { message } from "antd"; 

import { Link } from "react-router-dom";
//import ViewBlog from "../component/ViewBlog";
//import CommentCard from "../component/CommentCard";


const PostComment=()=>{
    const [name, setName] = useState("");
    const [comcon, setComcon] = useState("");
    
    const FetchPostCommentData=()=>{
      const validInputs="true"
      if ( !comcon ) {
          message.warning("Please fill the all Fields");
          validInputs = false;
      }

      if (validInputs) {
        fetch("http://localhost:5000/blog/postcomment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                   name: "Saru",
                    comcon: comcon,
                    
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setName("");
                    setComcon("");
                    
                    if (data) {
                        message.success("Comment Posted Sucessfully !..");
                    } else {
                        message.error(data.error);
                    }
                    // window.location.reload();
                });
          }
    }

    return(
        
            <div className={styles.com}>
                <hr className="HR"></hr>
            <h3 className={styles.com2}>Leave a Comment</h3>
              {/* <lable hemlFor="title">Name</lable>
    
            <input
              className={styles.com3}
              type="text"
              id="fname"
              name="title"
              
            onChange={(e) => setName(e.target.value)} 
            />  
             */}
    
            
            <div>

        <textarea className={styles.com4} onChange={(e) => setComcon(e.target.value)} placeholder=" Write...">
             
            </textarea>
            </div>
            <button
              onClick={() => FetchPostCommentData()}>
              POST
            </button>

            </div>
            

    )
}

export default PostComment;