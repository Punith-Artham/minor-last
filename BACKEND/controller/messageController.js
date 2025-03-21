import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import mongoose from "mongoose"; // Add this to validate ObjectId

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { senderName, subject, message } = req.body;

    // Check if all required fields are provided
    if (!senderName || !subject || !message) {
        return next(new ErrorHandler("Please fill out the full form", 400));
    }

    // Create the message
    const data = await Message.create({ senderName, subject, message });

    res.status(200).json({
        success: true,
        message: "Message Sent",
        data,
    });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid message ID", 400));
    }

    // Find the message by ID
    const message = await Message.findById(id);
    if (!message) {
        return next(new ErrorHandler("Message not found", 404)); // Changed the error message to be clearer
    }

    // Delete the message
    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: "Message Deleted",
    });
});
