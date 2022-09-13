import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";
import styles from "./BlogCard.module.css";
import PostLike from "../component/PostLike";

import 'antd/dist/antd.min.css';
import { message } from "antd"; 






const Search=()=>{

    
    const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");




    const fillterBySerach = () => {
    
       //const temp = data.filter((blog) => blog.title.includes(search));
           // setData(temp);
          };

          const fetchData = () => {
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
          
          
          return (
            <div >
            
              <div >
                
           
                <input style={{marginLeft:"1%",display:"inline"}}
                  type="text"
                  placeholder="&nbsp;Search by blog Title"
                  className="input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyUp={fetchData}
                />

 {blogs.map((blog) => 
                <div className={styles.searchcontainer}>
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
                          
                         <PostLike></PostLike>
                        <h5>
                            Jane Doe{" "}
                            <span>
                            {" "}
                            <small>2h ago</small>
                            </span>
                        </h5>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    )} 
                </div> 
                </div>


                );
      }
      
      export default Search;