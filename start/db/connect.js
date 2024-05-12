const mongoose=require('mongoose')
const options = {
    useNewUrlParser: true, // Add this option to use the new URL parser
    useUnifiedTopology: true, // Optionally, add this option for unified topology
  };
  mongoose.set('strictQuery', true)
const connectDB=(url)=>{
return mongoose.connect(url, options)

}

module.exports=connectDB 