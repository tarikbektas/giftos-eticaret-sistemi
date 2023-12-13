const express = require('express')
const app = express();
const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
app.use (bodyParser.urlencoded({extended:false}))
const mongoose = require('mongoose');

// modeller
const Setting =require('./models/settings')
const Navbar =require('./models/navbar')





mongoose.connect('mongodb://127.0.0.1:27017/adminpanel');
const db =mongoose.connection;
db.on("error",console.error.bind(console,"veri tabanı hatası"))
db.once("open",()=>{
    console.log('bağlantı başarılı')
})


app.use((req, res, next) => {
    Setting.findById('656b2a1a561b548b0534fc5f')
        .then(setting => {
            if (setting) {
                res.locals.setting = setting;
            }
            next();
        })
        .catch(error => {
            console.error('Setting bulma hatası:', error);
            next();
        });
});
 

app.use((req,res,next)=>{
    Navbar.find()
    .then(navbar=>{
        if(navbar) {
            res.locals.navbar = navbar;
        }
        next()
    })
    .catch(err=>{
        console.log('navbar middlewareda hata var',err )
        next();
    })
})




  

// router 
const adminrouter =require('./routes/admin')
const userrouter = require('./routes/user')

// view engine kısmı
app.set('view engine','ejs')
app.set('views','./views')
app.use(ejsLayouts)
 
 

const path = require('path')
app.use(express.static(path.join(__dirname, '/public')));
 

app.use('/admin',adminrouter)
app.use('/',userrouter)


app.listen(3000,()=>{
    console.log("proje çalışıyor")
})