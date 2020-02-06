const express=  require('express');
const Post=require('../models/post');
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
  const post =new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save().then(result =>{
    res.status(201)
    .json(
      {message:"post added succcessfully",
       prodId:result._id
    });
  });
  });
  router.put('/:id',(req,res,next)=>{
    const post=new Post({
      _id:req.body.id,
      title:req.body.title,
      content:req.body.content
    })
  Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.status(200).json({message:"this is successfully updated"})

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


  module.exports=router;




