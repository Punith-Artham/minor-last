import mongoose from "mongoose";


const dbConnection= ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
    }).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{
        console.log(`some error occured while connecting to database: ${error}`);
    });

};


export default dbConnection;