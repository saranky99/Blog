import React,{useState} from "react";
import StudentDefaultLayout from '../layout/StudentDefaultLayout';
import 'antd/dist/antd.min.css';
import { message } from "antd"; 
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";

const PostBlog=()=>{
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [messages, setMessages] = useState("");
    const [photo, setPhoto] = useState(null);

    const FetchPostBlogData=()=>{
      const validInputs="true"
      if (!title || !category || !messages) {
          message.warning("Please fill the all Fields");
          validInputs = false;
      }

      if (validInputs) {
        fetch("http://localhost:5000/blog/postblog", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    messages: messages,
                    photo:"https://www.karabayyazilim.com/uploads/blogs/reactjs-nedir-2019-06-24-091546/reactjs-nedir-2019-06-24-091546-0.jpg"
                    // https://www.pngitem.com/pimgs/m/664-6644509_icon-react-js-logo-hd-png-download.png
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setTitle("");
                    setCategory("");
                    setMessages("");
                    setPhoto("");
                    if (data) {
                        message.success("Blog Posted Sucessfully !..");
                    } else {
                        message.error(data.error);
                    }
                    // window.location.reload();
                });
          }
    }

    return(
        <StudentDefaultLayout>
            
            <div className={styles.right}>
            <h1 className={styles.head}>Write Your Blog Here</h1>

            <b><lable hemlFor="Title" >Title  </lable></b>
            <input
              className={styles.hi}
              type="text"
              id="fname"
              name="title"
              placeholder="Title of the blog"
              onChange={(e) => setTitle(e.target.value)} 
            />

            <b><lable  hemlFor="Category" >Category  </lable></b>
            <select className={styles.hi} onChange={(e) => setCategory(e.target.value) } >
           
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

            <b><lable hemlFor="message">Content  </lable></b>
            <textarea className={styles.hi + " " + styles.hii} onChange={(e) => setMessages(e.target.value)} placeholder=" Write...">
             
            </textarea>

            <b><lable hemlFor="image">Image  </lable></b>
            <input
              type="file"
              id="myFile"
              name="filename"
              onChange={(e) => setPhoto(e.target.files[0])}
              className={styles.hi}
            />
            <br />

            <button
              onClick={() => FetchPostBlogData()}>
              POST
            </button>
            <button>
              <Link to="/blog/blogcard">BACK</Link>
              
            </button>
            
          </div>
        </StudentDefaultLayout>

    )
}

export default PostBlog;