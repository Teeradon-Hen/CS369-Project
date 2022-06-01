import express  from "express";
import { create, createAll , getTableNo} from "../controller/tableController.js";
const tableRouter= express.Router()

tableRouter.post('/create',create)
tableRouter.post('/createAll',createAll)
tableRouter.get('/getTableNo',getTableNo)

// tableRouter.get('/get-info',getInfo)
// tableRouter.put('/edit-info',editInfo)

tableRouter.post('/',(req,res) =>{
     res.send('ok')
})

export default tableRouter