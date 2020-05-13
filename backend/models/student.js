const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  classNo:{
    type:String,
    required:true
  },
  sectionNo:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('StudentData',studentSchema);
