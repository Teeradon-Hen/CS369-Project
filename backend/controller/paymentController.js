import { HiwKaowModel } from '../model/model.js'

export const addSlip = (req, res) => {
     const { ResId, tableNo } = req.query
     const slipImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }

     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId, "table.tableNo": tableNo }, { $set: { "table.$.payment.slipImg": slipImage } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })


}

export const addBill = (req, res) => {
     const { ResId, tableNo } = req.query

     const billImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }
     console.log(billImage)
     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId, "table.tableNo": tableNo }, { $set: { "table.$[].payment.billImg": billImage } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })

}

export const changePaymentStatus = (req, res) => {
     const { ResId, tableNo } = req.query

     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId, "table.tableNo": tableNo }, { $set: { "table.$.payment.paymentStatus": "success" } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })
}

export const getBillAndSlip = (req, res) => {
     const { tableNo, ResId } = req.query
     HiwKaowModel.findOne({ "restaurantInfo._id": ResId, "table.tableNo": tableNo })
          .then(result => {
               const table = result.table.filter(e => e.tableNo == tableNo)[0]
               const data = { billImg: table.payment.billImg, slipImg: table.payment.slipImg, orderId: table._id, paymentId: table.payment._id }
               res.send(data)
          })
          .catch(err => {
               console.log(err);
          })
}