const Pages = require('../models/pages')
const Product =require('../models/product')
const formValidation =require('../validation/formValidation')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const passport=require('passport')
require('../authentication/passport/local')

 

module.exports.getpages = (req,res) =>{
    const url = req.params.url
   Pages.findOne({url})
   .then(page=>{
    res.render('user/pages/pagesdetials',{layout:'user/layouts/layout',page:page})
   })
   
  }



module.exports.getProduct = (req,res) =>{
  Product.find()
  .then(product=>{
    res.render('user/product/shop',{layout:'user/layouts/layout',product:product})
  })
}


module.exports.getProductDetials = (req,res) =>{
  const id = req.params.id
  Product.findById(id).populate('prodcats','name')
  .then(product=>{

    res.render('user/product/productdetials',{layout:'user/layouts/layouts2',product:product})
   
  })
}

 
module.exports.getUserLogin = (req,res,next) =>{

  res.render('user/login-register/login',{layout:'user/layouts/layout3'})


}

module.exports.getUserRegister = (req,res,next)=>{
  const username =""
  const password =""
  const erorrs = ""
  res.render('user/login-register/register',{layout:'user/layouts/layout3',username:username,password,erorrs:erorrs})
  
}


module.exports.postUserLogin =  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  successFlash:true,
  failureFlash: true
 
})




module.exports.postUserRegister = (req,res,next)=>{
  const email = req.body.email;
  const password=req.body.password;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const phone = req.body.phone
  const errors = [];
  const validationerrors =formValidation.registerValidation(email,password)
  if(validationerrors.length>0) {
      
      return res.render('user/login-register/register',{
         email :email,
          password,
          name,
          lastname,
          phone,
          erorrs:validationerrors})
  }
  User.findOne({
      email
  })
  .then(user =>{
      if(user) {
          errors.push({message:"E-MAİL Already in use"})
           return res.render('pages/register',{layout:'layouts/layouts',password:password,erorrs:errors,name:name,lastname:lastname,phone:phone,email:email})
      }
     
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
              const newUser = new User({
                  name:name,
                  lastname:lastname,
                  email:email,
                  phone:phone,
                  password:hash 
                 })
                 newUser.save()
                 .then(()=>{
                  console.log('veri kaydedildi')
                  req.flash('loginsuccess', 'kayıt  başarılı');
                  res.redirect('/')
                 }) 
                 
                 
          });
      });
     
  })

  
}


module.exports.postUserLogout = (req, res) => {
  // Oturumu sonlandır
  req.logout(function(err) {
      if (err) {
          // Hata işleme
          console.error('Logout hatası:', err);
          return next(err); // Hata durumunda middleware zincirini sonlandırma
      }

      // İsteği ve yanıtı yönlendirme veya başka bir işlem yapma
      res.redirect('/'); // Örneğin, ana sayfaya yönlendirme
  });
}