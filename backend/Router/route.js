const express=  require('express');
const Post=require('../models/post');
const StudentData=require('../models/student');
const TeacherData=require('../models/teacher');
const AddTeacherToStudent=require('../models/AddClass');
const router =express.Router();
const multer=require('multer');

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}


const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
   const isValid =MIME_TYPE_MAP[file.mimetype];
   let error = new Error("Invalid mime type");
   if(isValid){
     error=null;
   }

     cb(error,'backend/images');
  },
  filename:(req,file,cb)=>{
    const name= file.originalname.toLowerCase().split(' ').join('-');
    const ext=MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('',multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + "://" +req.get('host');
  const post =new Post({
    title:req.body.title,
    content:req.body.content,
    imageUrl: url + "/images/" +req.file.filename
  });
  post.save().then(result =>{
    res.status(201)
    .json(
       { message:"post added succcessfully", post:{
         ...result,
         id:result._id,
       }
    });
  });
  });

  router.put('/:id',multer({storage:storage}).single("image"),(req,res,next)=>{
       let  imageUrl = req.body.imageUrl;
    if(req.file){
  const url = req.protocol + "://" +req.get('host');
  imageUrl = url+ "/images" +req.file.filename
    }
    const post=new Post({
      _id:req.body.id,
      title:req.body.title,
      content:req.body.content,
      imageUrl:imageUrl
    });

  Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.status(200).json({message:"this is successfully updated"})

  }).catch(err =>{
    console.log(err);
  })
  });

  router.get('/:id',(req,res,next)=>{
    Post.findById({_id:req.params.id}).then(post=>{
      if(post){
         res.status(200).json(post)
      }else{
        res.status(404).json({message:"post data is not there"})
      }
    })
  })



  router.get('',(req,res,next)=>{
  Post.find().then(results =>{

    res.json({
      message:"this is the success message from post api json",posts:results});


  }).catch(err=>{
    console.log(err);

  })
  });

  router.delete('/:id',(req,res,next)=>{


   Post.findByIdAndDelete({ _id: req.params.id}).then(result=>{
     console.log(result);
     res.json({message:"post is deleted successfully"})

   }).catch(err=>{
    console.log(err);

   })

  });
router.post('/studentDetails', async(req,res,next)=>{

  const studentdata= await new StudentData({
    name:req.body.name,
    classNo:req.body.classNo,
    sectionNo:req.body.sectionNo,
    email:req.body.email,
    role:req.body.role
  });
  studentdata.save().then(student=>{
    console.log(student);
    res.json({message:'successfully student details is stored' , data:student})
  }).catch(err=>{
    console.log(err)
  });

})

router.post('/teacherDetails',(req,res,next)=>{
  const teacherdata=new TeacherData({
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  });
  teacherdata.save().then(teacher=>{
    console.log(teacher);
    res.json({message:'successfully teacher details are stored', data:teacher})
  }).catch(err=>{
    console.log(err)
  })
});


router.post('/Add-section-to-teacher/:email/:classId/:sectionId',(req,res,next)=>{
  TeacherData.find({email:req.params.email}).then(data=>{
    if(data.length>0){
   StudentData.find({$and:[{classNo:req.params.classId},{sectionNo:req.params.sectionId}]}).then(post=>{
     if(post.length>0){
      AddTeacherToStudent.find({$and:[{TeacherName:req.params.email},{classId:req.params.classId},{sectionId:req.params.sectionId}]}).then(existingData=>{
        const addTeacherToStudent =new AddTeacherToStudent({
          TeacherName:req.params.email,
          classId:req.params.classId,
          sectionId:req.params.sectionId,
          StudentData:post,
       });


        if(existingData.length>0) {
          AddTeacherToStudent.findOneAndUpdate({$and:[{TeacherName:req.params.email},{classId:req.params.classId},{sectionId:req.params.sectionId}]},{ TeacherName:req.params.email,
            classId:req.params.classId,
            sectionId:req.params.sectionId,
            StudentData:post
          }).then(update=>{
            res.status(200).json(update);
          }).catch(err=>{
            console.log(err);

          });
        }
        else{
          addTeacherToStudent.save().then(data=>{
            res.status(200).json(data)
          }).catch(err=>{
            console.log(err);

          })
        }
      }).catch(err=>{
        console.log(err);

      })


    }else{
      res.status(404).json({message:"There are no class or section students found please Add them"})
    }
  })
}
else{
  res.json({message:"teacher is not exist please add the Teacher credentials"})
}
}).catch(err =>{
  console.log(err);
})
});

router.get('/GetStudentData/:classId/:sectionId',(req,res,next)=>{
  StudentData.find({$and:[{classNo:req.params.classId},{sectionNo:req.params.sectionId}]}).then(data=>{


    res.status(200).json(data);
  }).catch(err=>{
    console.log(err);

  });
});
router.get('/GetTeacherData/:role',(req,res,next)=>{
  TeacherData.find({role:req.params.role}).then(teacherData=>{
    res.status(200).json(teacherData);
  }).catch(err=>{
    console.log(err);

  })
})

router.get('/StuentDetails/:id',(req,res,next)=>{

  StudentData.findById({_id:req.params.id}).then(data=>{
    res.status(200).json(data);
  }).catch(err=>{
    console.log(err);

  })
})
router.put('/UpdateStuentDetails/:id',(req,res,next)=>{
  StudentData.updateOne({_id:req.params.id},{$set:{name:req.body.name,classNo:req.body.classNo,sectionNo:req.body.sectionNo}}).then(data=>{
    AddTeacherToStudent.updateOne({"StudentData.$._id":(req.params.id).str},{"$set":{"StudentData.$.name":req.body.name,"StudentData.$.classNo":req.body.classNo,"StudentData.$.sectionNo":req.body.sectionNo}},
    ).then(data1=>{

  res.status(200).json({data,data1});
}).catch(err=>{
  console.log(err.message);

})
  }).catch(err=>{
    console.log(err.message);

  });
})
// router.delete('/DeleteStuentDetails/:id',(req,res,next)=>{
// router.delete('/DeleteStuentDetails/:id',(req,res,next)=>{
//    StudentData.findByIdAndDelete({_id:req.params.id}).then(data=>{
//      res.json({message:"successfully deleted the details"});
//       }).catch(err=>{
//     console.log(err.message);

//   });
// })

router.delete('/DeleteStuentDetails/:classId/:sectionId/:id',(req,res,next)=>{
  StudentData.findByIdAndDelete({_id:req.params.id}).then(data=>{
    AddTeacherToStudent.findOneAndUpdate({classId:req.params.classId,sectionId:req.params.sectionId}, { $pull:{StudentData:{_id:(req.params.id).str}}} ,{multi:true}).then(data1=>{

  res.status(200).json({message:"Successfully deleted the details"});
}).catch(err=>{
  console.log(err.message);

})
  }).catch(err=>{
    console.log(err.message);

  });
})
module.exports=router;




