const studentpage = (req,res)=>{
    res.render('student');
}

const insertstd = (req,res)=>{
    console.log(req.body);
  }
module.exports={
    studentpage  , insertstd 
} 