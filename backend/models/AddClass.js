const mongoose=require('mongoose');

const AddtoTeacherSchema=mongoose.Schema({
  TeacherName:{
    type:String,
    required:true
  },
  classId:{
type:String,
required:true
  },
  sectionId:{
    type:String,
    required:true
  },
  StudentData:{
    type:Array,
     required:true,
  }
});
module.exports=mongoose.model('AddTeacherToStudent',AddtoTeacherSchema)
