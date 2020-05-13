const path=require('path');
const express= require('express');
const bodyparser=require('body-parser');

const mongoose=require('mongoose');
const app=express();
const routeModule=require('./Router/route');

app.use('/images',express.static(path.join("backend/images")));

mongoose.set('useFindAndModify', false);
DATABASE_URI="mongodb+srv://Bhagath:Bhagath@cluster0-dmcgs.mongodb.net/AssignmentData?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URI,{ useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
  console.log("db is connected");
}).catch(err => {
  console.log(err);
});
app.use(bodyparser.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials','true');

next();
});

app.use('/api/posts',routeModule)


module.exports=app
