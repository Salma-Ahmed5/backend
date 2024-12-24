const mongoose =require("mongoose")
const Schema=mongoose.Schema;

const Userschema= new Schema ({
    schemaName:String,
    schemaEmail:String,
    schemaPhone:Number,
    schemaPassword:Number,
    schemaRole:String,
},{timestamps: true});

const Userr = mongoose.model("Userr",Userschema)  
  //(esm elgadwal colletion eli hizhar fe eldata , el mo5atat 'schema'  )

module.exports = Userr; 