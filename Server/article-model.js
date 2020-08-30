const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const ArticleSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    type_id: Number,
    photo: String,
   
  },
  { timestamps: true }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Article', ArticleSchema)


