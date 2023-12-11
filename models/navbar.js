const mongoose =require('mongoose')

const Schema = mongoose.Schema


const navbar = new Schema({
    title:String,
    url : String,
    sira: Number,
    type:String
   
})

const Navbar = mongoose.model("navbar",navbar)

module.exports = Navbar