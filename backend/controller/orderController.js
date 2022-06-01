import mongoose from 'mongoose'
import { HiwKaowModel } from '../model/model.js'

export const add = (req, res) => {
     const { tableNo, name } = req.query
     const order = req.body
     console.log(order)
     const tableOrder = []
     order.map(e => {
          let { foodId, quantity, orderNote } = e
          let date = new Date()
          let orderDateAndTime = `${(date.getDate() + 1).toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
          tableOrder.push({ foodId, quantity, orderNote, orderDateAndTime })
     })
     HiwKaowModel.findOneAndUpdate({ "restaurantInfo.username": name, "table.tableNo": tableNo }, { $push: { "table.$.tableOrder": tableOrder } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })
}

export const changeStatus = (req, res) => {
     const { tableNo, name, orderId } = req.query
     HiwKaowModel.updateOne({ "restaurantInfo.username": name, "table.tableNo": tableNo, "table.tableOrder._id": orderId }, { $set: { "table.$[].tableOrder.$.orderStatus": "ssss" } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })
}

export const getOrderdetail = (req, res) => {
     const { tableNo, name } = req.query
     HiwKaowModel.findOne({ "restaurantInfo.username": name, "table.tableNo": tableNo })
          .then(result => {
               if (result) {
                    const order = result.table.filter(e => e.tableNo == tableNo)


                    res.send(result.getOrderDetail(tableNo))
               }
               else {
                    res.send('errr')

               }

          })
          .catch(err => {
               console.log(err);

          })
}