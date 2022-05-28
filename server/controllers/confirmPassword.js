var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const confirmPassword =(req,res)=>{
const {email,password,hashedPassword}= req.body 
console.log(req.body , "body")
console.log(req.body,'s');
if(!email || !password){
    return res.send('enter your password') 
 }else{
     try{
         bcrypt.compare(password.toString(), hashedPassword , (err, result)=> {
             if (err) {
                 res.send(err);
               } else if (result === false) {
                 res.send("incorrect password");
               } else if (result === true) {
         res.send('welcome !')
     }
         })
     
     }catch(err){
         console.log(err)
     }
 }

}
module.exports = {confirmPassword}