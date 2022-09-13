import React,{useEffect,useState} from "react";
//import StudentDefaultLayout from '../layout/StudentDefaultLayout';
import { Link } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";
import styles from "./BlogCard.module.css";
//import PostComment from "../component/PostComment";

const CommentCard=()=>{
    const [comments, setComments] = useState([]);

    const getdata = async () => {
        const res = await fetch("http://localhost:5000/blog/postedcomment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        const data = await res.json();
        console.log(data);
    
        if (res.status === 422 || !data) {  // accessable data
          console.log("error ");
        } else {
        setComments(data.reverse())
          console.log("get data");
        }
      }
    
      useEffect(() => {
        getdata();
      }, [])

  

    return(
      <div>
        
          

             {comments.map((comment) => 
             <div>
              
                {/* <div className={styles.cmtcontainer}> */}
                
                <div className={styles.cmtcard}>
                    
                <b>{comment.name}</b> 
                    <div className={styles.card__body}>
                    
                   
                    
                        {comment.comcon}
                    
                    </div>
                    
                </div>
                {/* </div> */}
                </div>
    )}
           
       
        </div>

    )
}

export default CommentCard;