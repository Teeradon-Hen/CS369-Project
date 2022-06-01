import express from "express";
import { add,getOrderdetail } from "../controller/orderController.js";
const orderRouter = express.Router()

orderRouter.post('/add', add)
// orderRouter.put('/change-status', changeStatus)
orderRouter.get('/getOrderdetail', getOrderdetail)


// tableRouter.get('/get-info',getInfo)
// tableRouter.put('/edit-info',editInfo)

export default orderRouter