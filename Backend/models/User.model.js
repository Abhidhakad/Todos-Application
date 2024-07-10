const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     fullname:{
        type:String,
        required:true,
        trim:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        reuired:true
     },
    //  avatar:{
    //     type:String,
    //     required:true
    //  },
     todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Todo',
        }
     ],
     token:{
      type:String
     },
     resetPasswordExpires:{
      type:Date
     }
})

module.exports = mongoose.model("User",userSchema);