import mongoose from 'mongoose'
import { HiwKaowModel } from '../model/model.js'

export const create = (req, res) => {
     const { tableNo, name } = req.query
     const table = {
          tableNo,
          tableOrder: [],
          payment: {
               paymentStatus: "ยังไม่ชำระเงิน",
               bilImg: {data:null, contentType:null},
               slipImg: {data:null, contentType:null},
          }
     }

     HiwKaowModel.findOneAndUpdate({ "restaurantInfo.username": name }, { $push: { table: table } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })
}

export const createAll = (req, res) => {
     const { tableAmount, ResId } = req.query
     const table = []
     for (let i = 1; i <= tableAmount; i++) {
          table.push({
               tableNo:i,
               tableOrder: [],
               payment: {
                    paymentStatus: "pending",
                    billImg: {data:null,contentType:null},
                    slipImg: {data:null,contentType:null}
               }
          })
     }
     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId }, { $push: { table: { $each: table } } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })
}

export const getTableNo = (req, res) => {
     const { ResId } = req.query

     HiwKaowModel.findOne({ "restaurantInfo._id": ResId })
          .then(result => {

               const response = []
               result.table.map(e =>{
                    response.push(e.tableNo)
               })
               res.send(response)
               // res.send([{table:5},{table:4}])

          })
          .catch(err => {
               console.log(err);
          })
}