const mongoose = require('mongoose');


const connect = ()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{console.log("Database Connected.....")})
    .catch((err)=>{console.log(err)});
}


module.exports = connect