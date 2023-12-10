const Pages = require('../models/pages')


 

module.exports.getpages = (req,res) =>{
    const url = req.params.url
   Pages.findOne({url})
   .then(page=>{
    res.render('user/pages/pagesdetials',{layout:'user/layouts/layout',page:page})
   })
   
  }


module.exports.getAddProd = (req,res) =>{} 