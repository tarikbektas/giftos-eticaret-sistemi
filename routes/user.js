const userControler = require('../controllers/userController')
const express =require('express')
const router=express.Router();
const Slider = require('../models/slider')
const Pages = require('../models/pages')
const Product = require('../models/product')
const Cart = require('../models/cart')


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      console.log('giriş başarılı devam edin')
    return next();
  }
  res.redirect('/login');
}

router.get('/',(req,res)=>{
  
   Slider.find().sort({sira:1})
   .then(slider =>{
      res.render('user/index',{layout:'user/layouts/layout',slider:slider})
   })
   
})

router.get('/pages/:url',userControler.getpages)



router.get('/urunler',userControler.getProduct)
router.get('/urunler/:id',userControler.getProductDetials)


router.get('/login',userControler.getUserLogin)

router.get('/register',userControler.getUserRegister)

router.post('/login',userControler.postUserLogin)
router.post('/logout',userControler.postUserLogout)

router.post('/register',userControler.postUserRegister)

router.post('/add-to-cart',isLoggedIn, async (req, res) => {
    const { productId } = req.body;
  const user = req.user;
    try {
    // Ürünü sepete ekle
    const product = await Product.findById(productId);
    const cart = await Cart.findById(user.usercartid);
    console.log('kart bilgisi',cart)
    console.log('product  bilgisi',product)
    cart.products.push(product);
    await cart.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});
router.get('/dashboard',isLoggedIn, async (req, res) => {
  const user = req.user;

  // Kullanıcının sepetini ve diğer bilgilerini al
  const cart = await Cart.findById(user.usercartid).populate('products');
  res.render('user/dashboard', {layout:false,cart });
});

module.exports =router

 