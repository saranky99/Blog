import React, { useState, useEffect } from "react";
import StudentDefaultLayout from "../layout/StudentDefaultLayout";
import styles from "./BlogCard.module.css";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import {message,Popconfirm} from "antd";
import {Link,useParams,useNavigate} from "react-router-dom";
import PostComment from "../component/PostComment";
import CommentCard from "../component/CommentCard";
import {ReactComponent as ArrowIcon} from '../assets/dropdown-icon.svg'

const ViewBlog=()=> {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [viewComment,setViewComment] = React.useState(false);
  const navigate = useNavigate();
  const fetchData = () => {
    fetch(`http://localhost:5000/blog/${id}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
    }
  })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlog(data);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])


const deleteBlog = async (id) => {
  const res2 = await fetch(`http://localhost:5000/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const deletedata = await res2.json();
  console.log(deletedata);

  if (res2.status === 422 || !deletedata) {
    console.log("error");
    message.error("Error")
  } else {
    console.log("Blog deleted");
    message.success("Blog Deleted Successfully!...")
    navigate("/blog/blogcard");
  
  }

}

const handleToggleComment = ()=>setViewComment(state=>!state);

  return (
    <div>
      <StudentDefaultLayout>
        {blog && (
          <div className={styles.vcontainer}>
            <div className={styles.image}
            style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
              <h1 className={styles.head} 
              style={{textAlign:'center'}} >
                <b className={styles.title}></b>
                {blog.title}
              </h1>
              <img src={blog.photo} className={styles.imgimg} alt=""  />
            </div>
            <div>
            <div style={{width:'calc(100% -64px)',display:'flex',justifyContent:'flex-end'}}>
            <Link to={`/blog/blogcard/${blog._id}/edit/${blog._id}`}>
                        <FiEdit2 style={{ width: "24px",
height: "24px" }}/>
              </Link>
             <Popconfirm
                        title="Do you really want to delete this Blog?"
                        onConfirm={()=>deleteBlog(blog._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <FiTrash2 style={{ color: "red", marginLeft: 6, width: "24px",
height: "24px"}}></FiTrash2>
                </Popconfirm>
                </div>
                <div style={{width:'calc(100% - 64px)',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h2>
              <b className={styles.title}>Category </b> :{" "}
              {blog.category}
              
            </h2>
            <hr />
            </div>
            <h2 style={{textAlign:'center'}}>
              <b className={styles.title}>Content </b> :{" "}<br/></h2>
              <div className={styles.vcontent}>{blog.messages}</div>
            
            
            </div>
            <div><PostComment></PostComment></div>
            <div style={{display:'flex',alignItems:'center'}} onClick={handleToggleComment}>View comments <ArrowIcon style={{zoom:'0.5',transform:viewComment?'':'rotate(180deg)'}}/></div>
            {viewComment&&<CommentCard/>}
           
      
  
            
            </div>
              
        )}

      </StudentDefaultLayout>
    </div>
  );
}

export default ViewBlog;