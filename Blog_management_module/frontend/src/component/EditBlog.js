import React, { useState, useEffect } from "react";
import StudentDefaultLayout from "../layout/StudentDefaultLayout";
import styles from "./Blog.module.css";
import 'antd/dist/antd.min.css';
import { message ,Form,Input} from "antd";
import {useParams,useNavigate} from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate=useNavigate();
  console.log(id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [messages, setMessages] = useState("");
  const [blog, setBlog] = useState([]);

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
        let fieldData = data;
                delete fieldData['_id'];
                delete fieldData['__v'];
                console.log(fieldData)
                const finalValue = Object.keys(fieldData).map(key => ({ name: key, value: fieldData[key] }));
                setBlog(finalValue);
        // setBlog(data);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])


  const fetchUpdate = (newvalues) => {
    fetch(`http://localhost:5000/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(
          // {
          //   _id:id,
          //   title: title,
          //   category: category,
          //   messages: messages}  
          newvalues
        ),
        headers: {
            "Content-Type": "application/json"

        },
    })
        .then((res) => {
            res.json()
                .then((json) =>
                    console.log(json));
            message.success("Blog Edited Sucessfully !..");
            // console.log(blog.title);
            navigate(`/blog/blogcard`);
        })
};

function handleChange(e) {
  console.log("new value", e.target.value);
  setTitle(e.target.value);
}

  return (
    <div>
      <StudentDefaultLayout>
        {
           <div className={styles.right}>
            <Form  fields={blog}
                onFinish={fetchUpdate}>
           <h1 className={styles.head}>Edit Blog Here</h1>
           
           <Form.Item
                    label="Title :"
                    style={{ fontWeight: "bold" }}
                    name="title"
                >
                  {/* <br/>
                  <input /> */}
                 
             {/* <lable hemlFor="title">Title  </lable>  */}
            <input 
              className={styles.hi}
              //type="text"
              //id="fname"
              //name="title"
              //value={blog.title}
           
              //onChange={handleChange} 
           /> 
           </Form.Item> 

            <Form.Item
                    label="Category :"
                    style={{ fontWeight: "bold" }}
                    name="category"
                >
           {/* <lable hemlFor="category">Category  </lable> */}
           <select className={styles.hi}  
          //  value={blog.category} onChange={(e) => setCategory(e.target.value)}
           >

             <option value="australia">Experince</option>

             <option value="software">Software</option>
             <option value="Web Development">Web Development </option>
             <option value="Mobile Development">Mobile Development</option>
             <option value="Frontend Development">
               Frontend Development
             </option>
             <option value="Backend  Development">Backend Development</option>
             <option value="UX/UI Design ">UX/UI Design</option>
             <option value="Data Science">Data Science</option>
             <option value="Full Stack Development">
               Full Stack Development
             </option>
           </select>
           </Form.Item>
           <Form.Item
                    label="Content :"
                    style={{ fontWeight: "bold" }}
                    name="messages"
                >
           {/* <lable hemlFor="messages">Message  </lable> */}
           <textarea 
           className={styles.hi + " " + styles.hii} //name="messages" 
          //  value={blog.messages} onChange={(e) => setMessages(e.target)}
           >
            
           </textarea>
           </Form.Item>
           <br />
           
           <button
             onClick={fetchUpdate}
            >
             Update
           </button>
           </Form>
         </div>
        
        }
      </StudentDefaultLayout>
    </div>
  );
}

export default EditBlog;