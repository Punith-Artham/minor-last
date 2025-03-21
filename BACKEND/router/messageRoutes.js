import express from "express";
import { getAllMessages, sendMessage ,deleteMessage} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/send",isAuthenticated,sendMessage);

router.get("/getall",isAuthenticated,getAllMessages);

router.delete("/delete/:id",isAuthenticated,deleteMessage);
export default router;