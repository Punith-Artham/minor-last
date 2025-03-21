import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[2,"name must contain at least two character!"],
    },
    subject:{
        type:String,
        minLength:[2,"subject must contain at least two character!"],
    },
    message:{
        type:String,
        minLength:[2,"message must contain at least two character!"],
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
});

export const Message=mongoose.model("Message",messageSchema);