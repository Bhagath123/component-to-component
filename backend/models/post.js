const mongoose=require('mongoose');

const PostShema=mongoose.Schema({

  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('Post',PostShema);
