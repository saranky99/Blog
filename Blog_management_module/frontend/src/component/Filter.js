import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";
import styles from "./BlogCard.module.css";
import PostLike from "../component/PostLike";



    

       
       


const Filter=()=>{

    
    const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);


//   function FillterByCat(e) {
//     const temp = data.filter((job) => job.categories === e);
//     setData(temp);
//   }

const fetchData = (category) => {
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

 
  return (
    
      <div >
   <div>
        
        

        <select 
       style={{marginLeft:"12px",display:"inline",marginTop:"15px",width:"170px",height:"28px"}}
         onChange={(e) => fetchData(e.target.value)
          } 
          onKeyUp={fetchData}>
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
           </select>

<div>
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

        </div>


        );
}
export default Filter;