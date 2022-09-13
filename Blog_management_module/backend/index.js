const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require("./db.js");
const mongoose=require("mongoose");
// require("dotenv/config");
const cors = require('cors');
const Blog =require('./models/Blog');
const Comment =require('./models/Comment');
const Like =require('./models/Like');

const { Router } = require('express');
const app = express();
app.use(cors());
connectDB();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGO_URL=mongodb+srv://Saru99:Blogsaru890@cluster0.p3gmy.mongodb.net/?retryWrites=true&w=majority

// post blog
app.route("/blog/postblog").post(async (req, res) => {
    let newBlog = await new Blog(req.body);
    newBlog.save((err, blog) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(blog);
        console.log(blog);

    });
});

//post comment

app.route("/blog/postcomment").post(async (req, res) => {
    let newComment = await new Comment(req.body);
    newComment.save((err, comment) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(comment);
        console.log(comment);

    });

});

app.route('/blog/postedcomment').get((req, res) => {
    Comment.find({}, (err, comment) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(comment);
        console.log(comment);
    });
});

app.route('/blog/postedblog').get((req, res) => {
    Blog.find({}, (err, blog) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(blog);
        console.log(blog);
    });
});

app.route('/blog/:blogId').get((req, res) => {
    Blog.findById(req.params.blogId, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
        console.log(blog.title);
    });
});

app.route('/search/:search').get(async(req, res) => {
    let data = await Blog.find(
             {
                  "$or":[
                        {title:{$regex:req.params.search}}
                  ]
               }
            )
            res.send(data);
});

app.route('/filter/:category').get(async(req, res) => {
    // console.log(req.params.category);
    let data = await Blog.find(
             {
                  "$or":[
                        {category:{$regex:req.params.category}}
                  ]
               }
            )
            
            res.send(data);
});


app.route('/blog/like/:blogId').put((req,res)=>{
    Blog.findOneAndUpdate(
        { _id: req.params.blogId },{likes:req.body.likesCount},
        { new: true, useFindAndModify: false },
        (err, blog) => {
            if (err) {
                res.send(err);
                console.log("updated");
            }
            res.json(blog);

        });

});


app.route('/blog/:blogId').put((req, res) => {
    Blog.findOneAndUpdate(
        { _id: req.params.blogId }, req.body,
        { new: true, useFindAndModify: false },
        (err, blog) => {
            if (err) {
                res.send(err);
                console.log("updated");
            }
            res.json(blog);

        });
});

// function fillterBySerach() {
//     const temp = data.filter((blog) => blog.title.includes(search));
//     setData(temp);
//   }


app.route('/blog/:blogId').delete((req, res) => {
    Blog.remove(
        { _id: req.params.blogId }, (err, message) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "blog deleted" });
        });
});



// app.route('/search/:search').get((req, res) => {
//     Blog.remove(
//         { _id: req.params.blogId }, (err, message) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({ message: "blog deleted" });
//         });
// });
//like 
function App() {

    // State to store count value
    const [count, setCount] = useState(0);
  
    // Function to increment count by 1
    const incrementCount = () => {
      // Update state with incremented value
      setCount(count + 1);
    }};

    // app.get("/search/:search",async(req,res)=>{
    //     let data = await blog.find(
    //         {
    //             "$or":[
    //                 {title:{$regex:req.params.search}}
    //             ]
    //         }
    //     )
    //     console.log(data);
    // });

    
   

app.listen(PORT, console.log(`server starting in mode on port ${PORT}`));