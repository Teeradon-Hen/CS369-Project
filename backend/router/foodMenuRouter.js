import express from "express";
import multer from 'multer'
import { Authentication } from "../middleware/auth.js";
import { addMenu, deleteMenu, getMenu,
      fliterMenuByCategory, fliterMenuByFoodNote, editMenu ,
      fliterMenuByCategoryAndReady, fliterMenuByFoodNoteAndReady , getAllMenu} from "../controller/foodMenuController.js";
const upload = multer()

// import { SignIn } from "../controller/RestaurantController.js";
const foodMenuRouter = express.Router()
foodMenuRouter.post('/add', upload.single("Image"), addMenu)
foodMenuRouter.delete('/delete', deleteMenu)
foodMenuRouter.put('/edit', upload.single("Image"), editMenu)
foodMenuRouter.get('/get', getMenu)

foodMenuRouter.get('/get-foodcategory', fliterMenuByCategory)
foodMenuRouter.get('/get-foodnote', fliterMenuByFoodNote)

foodMenuRouter.get('/get-foodcategory/ready', fliterMenuByCategoryAndReady)
foodMenuRouter.get('/get-foodnote/ready', fliterMenuByFoodNoteAndReady)
foodMenuRouter.get('/getAll', getAllMenu)



export default foodMenuRouter