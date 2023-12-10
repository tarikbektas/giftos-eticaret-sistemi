const mongoose =require('mongoose')

const Schema = mongoose.Schema


const navbar = new Schema({
    url : String,
    sira: Number,
    title:String,
    sayfa:String
})

const Navbar = mongoose.model("navbar",navbar)

module.exports = Navbar