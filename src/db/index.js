
const {connect} = require("mongoose");

const uri = "mongodb+srv://Vaishnavi:FMtU1jTRkmpE11ZY@cluster0.nvrx3.mongodb.net/brillio-db?retryWrites=true&w=majority"
 connect(uri)
 .then(()=> console.log("Mongo Connected"))
 .catch(console.log)