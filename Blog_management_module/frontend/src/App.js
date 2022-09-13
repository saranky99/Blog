import React from 'react'
import StudentDefaultLayout from './layout/StudentDefaultLayout';
import BlogCard from './component/BlogCard';
//import PostedBlog from './component/ViewBlog';
import PostBlog from './component/PostBlog';
import EditBlog from './component/EditBlog';
import ViewBlog from './component/ViewBlog';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import PostComment from './component/PostComment';
import CommentCard from './component/CommentCard';
import PostLike from './component/PostLike';
import Search from './component/Search';
import Filter from './component/Filter';


export default function App() {
  const history = createBrowserHistory();
  return (
     <Router history={history}>
     <Routes>
      <Route path="/" exact element={<StudentDefaultLayout/>} />
      <Route path="/blog/postblog" exact element={<PostBlog/>} />
    
      <Route path="/blog/blogcard" exact element={<BlogCard/>} />
      {/* <Route path="/blog/edit/:id" exact element={<EditBlog/>} /> */}
      <Route path="/blog/view/:id" exact element={<ViewBlog/>} />
      <Route exact path="/blog/blogcard/:id/edit/:id"  element={<EditBlog/>} />
      <Route path="/blog/postcomment" exact element={<PostComment/>} />
      <Route path="/blog/commentcard" exact element={<CommentCard/>} />
      <Route path="/blog/postlike" exact element={<PostLike/>} />
      <Route path="/blog/search" exact element={<Search/>} />
      <Route path="/blog/filter" exact element={<Filter/>} />
    
      


     </Routes>
   </Router>
  )
}
