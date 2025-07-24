const homepage = (req,res)=>{
    res.render('home');
}
const aboutpage = (req,res)=>{
    res.render('about');
}
const servicespage = (req,res)=>{
    res.render('services');
}
const contactpage = (req,res)=>{
    res.render('contact');
}
const blogpage = (req,res)=>{
    res.render('blog');
}


module.exports={
    homepage , aboutpage , servicespage , contactpage , blogpage
} 