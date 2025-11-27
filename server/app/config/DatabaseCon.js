const mongoose = require('mongoose')

const DatabaseCon = async() => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    if(connection){
      console.log("Database connected successfully")
    }else{
      console.log("Failed to connect database")
    }
  } catch (error) {
    console.log("Something went wrong")
  }
}
module.exports = DatabaseCon