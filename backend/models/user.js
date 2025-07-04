const mongoose  = require('mongoose') ;

const userSchema = new mongoose.Schema({
     name : {
        type : String ,
        required : true ,
     } ,
     email :{
        type : String ,
        required : true ,
     } ,
     password : {
        type : String ,
        required : true ,
     } ,
     profileImage : {
         type : String , 
         required : false ,
     } ,
     role : {
         type : Number ,
         default : 0 ,
     }
})

module.exports = mongoose.model('User' , userSchema) ;