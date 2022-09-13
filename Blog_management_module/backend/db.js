const express=require('express');
const app= express();

const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');

dotenv.config();
const connectDB = async() =>{
    // mongoose.connect(process.env.MONGO_URL,()=>{
    //     console.log("connected to mongo db");
    // });

    mongoose 
 .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
        // useCreateIndex: true, 
      })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

    // mongoose.connect(
    //     process.env.MONGO_URL,
    //   )
    //   .then(()=>console.log('connected'))
    //   .catch(e=>console.log(e));

    // mongoose.connect(
    //     process.env.MONGO_URL,
    //     (err) => {
    //      if(err) console.log(err) 
    //      else console.log("mongdb is connected");
    //     }
    //   );
}
module.exports = connectDB;




