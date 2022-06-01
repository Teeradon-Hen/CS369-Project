import express from "express";
import { addBill, addSlip, getBillAndSlip, changePaymentStatus } from "../controller/paymentController.js";
import { Authentication } from "../middleware/auth.js";
import multer from 'multer'

const paymentRouter = express.Router()
const upload = multer()

paymentRouter.put('/addBill', upload.single("Image"), addBill)
paymentRouter.put('/addSlip', upload.single("Image"), addSlip)
paymentRouter.get('/getBillAndSlip',  upload.single("Image"), getBillAndSlip)
paymentRouter.get('/changePaymentStatus', changePaymentStatus)


export default paymentRouter