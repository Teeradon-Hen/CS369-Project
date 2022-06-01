import express from "express";
import { signIn, signUp, getInfo, editInfo , editPassword} from "../controller/RestaurantController.js";
import { Authentication } from "../middleware/auth.js";

const restaurantRouter = express.Router()
import multer from 'multer'
const upload = multer()

restaurantRouter.post('/sign-in', signIn)
restaurantRouter.post('/sign-up', upload.single("Image"), signUp)
restaurantRouter.get('/get-info', Authentication, getInfo)
restaurantRouter.put('/edit-info', Authentication, upload.single("Image"), editInfo)
restaurantRouter.put('/edit-password', Authentication, editPassword)

export default restaurantRouter