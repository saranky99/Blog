import React,{useEffect,useState} from "react";
import StudentDefaultLayout from '../layout/StudentDefaultLayout';
import { Link } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";
import styles from "./BlogCard.module.css";
import PostLike from "../component/PostLike";
import Search from "../component/Search";
import Filter from "../component/Filter";


import 'antd/dist/antd.min.css';

import { message } from "antd"; 

const BlogCard=()=>{
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");

    const getdata = async () => {
        const res = await fetch("http://localhost:5000/blog/postedblog", {
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
        setBlogs(data.reverse())
          console.log("get data");
        }
      }
    
      useEffect(() => {
        getdata();
      }, [])

  const handleUpdateLatestLikes =async (blogId,newCounts)=>{
    const res = await fetch("http://localhost:5000/blog/like/"+blogId, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json"
      },
      body:JSON.stringify({
        likesCount:newCounts
      })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {  // accessable data
      console.log("error ");
    } else {
  
      console.log(data);
    }
  }

  const fetchDataByCategory = (category) => {
    console.log(category);

    fetch(`http://localhost:5000/filter/${category}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
    }
  }
  )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        
      });
  }

  const fetchDataBySearch = () => {
    fetch(`http://localhost:5000/search/${search}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
    }
  })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.length>0){
        setBlogs(data);
        }else{
          message.warning("We could not find any matching blogs!!");
        }
      })
      if ( blogs===null ) {
        message.warning("Please fill the all Fields");
        
    }
     
      
      
  }
    return(
        <StudentDefaultLayout>
                  {/* <input style={{marginLeft:"5%",display:"inline"}}
                    type="text"
                    name="search"
                    placeholder="Search.."
                    className={styles.search}
                    
                /> */}
                <h1 style={{color:"#00008B"}}>Start Writing...</h1>
                     <button style={{marginLeft:"80%",color:"white"}}>
            <Link to="/blog/postblog">
            <h3 style={{color:"white"}}>Create</h3>
            </Link>
        </button> 
                <div>
                <input style={{marginLeft:"1%",display:"inline"}}
                  type="text"
                  placeholder="&nbsp;Search by blog Title"
                  className="input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyUp={fetchDataBySearch}
                />
                 
        <select 
       style={{marginLeft:"12px",display:"inline",marginTop:"15px",width:"170px",height:"28px"}}
         onChange={(e) => fetchDataByCategory(e.target.value)
          } 
          onKeyUp={fetchDataByCategory}>
           <option >&nbsp;Filter by Category-----</option>
           <option  value="Web Development">Web Development </option>
             <option value="australia">Experince</option>
             <option value="software">Software</option>
             <option value="Mobile Development">Mobile Development</option>
             <option value="Frontend Development">Frontend Development </option>
             <option value="Backend  Development">Backend Development</option>
             <option value="UX/UI Design ">UX/UI Design</option>
             <option value="Data Science">Data Science</option>
             <option value="Full Stack Development">Full Stack Development</option>
           </select></div>
            

             {blogs.map((blog) => 
                <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.card__header}>
                    <img
                        src={blog.photo}
                        alt="card__image"
                        className={styles.card__image}
                        width="600"
                    />
                    </div>
                    <div>
                        <span className={styles.tag + " " + styles.tag_blue}>
                        {blog.category}
                        </span>
                    </div>
                    <div className={styles.card__body}>
                    <h4>
                      <Link to={`/blog/view/${blog._id}`}>
                            {blog.title}
                            </Link></h4>
                    <p className={styles.cardmax}>
                        {blog.messages}
                    </p>
                    </div>
                    <div className={styles.card__footer}>
                    <div className={styles.user}>
                        <div className={styles.user__info}>
                          {/* hardcoded */}
                        {/* <FiThumbsUp /> <b>10 Likes</b> */}
                        <PostLike likesCount={blog.likes?blog.likes:0} handleLikeClick={(newCounts)=>handleUpdateLatestLikes(blog._id,newCounts)}/>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    )}
            
        </StudentDefaultLayout>

    )
}

export default BlogCard;