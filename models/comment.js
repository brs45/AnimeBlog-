
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema=mongoose.Schema({

comment:{
    type:String,
    require:false
},
blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },



},

{timestamps:true}

)



const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

