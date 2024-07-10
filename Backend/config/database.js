const mongoose = require('mongoose');
require('dotenv').config();

const connectWithDb = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("Db connected Successfully: ");
        })
        .catch(()=>{
            console.log("Db connection Error: ")
        })
    } catch (error) {
        comsole.log("Error in Db connection : ",error.message);
    }
} 

module.exports = connectWithDb;