const userControler = require('../controllers/userController')
const express =require('express')
const router=express.Router();
const Slider = require('../models/slider')
const Pages = require('../models/pages')

router.get('/',(req,res)=>{
   Slider.find().sort({sira:1})
   .then(slider =>{
      res.render('user/index',{layout:'user/layouts/layout',slider:slider})
   })
   
})

router.get('/pages/:url',userControler.getpages)

 



module.exports =router