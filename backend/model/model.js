import { validatorEmail } from "../util/utils.js"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { jwtSecret } from '../config/jwtConfig.js'

let restaurantInfo = new mongoose.Schema({
     email: {
          type: String,
          validate: {
               validator: validatorEmail,
               message: props => `${props.value} is not a valid email`
          },
          unique: [true, 'Must be uniqued'],
          required: [true, 'email is required']
     },
     username: {
          type: String,
          required: true,
          unique: [true, 'Must be uniqued'],
     },
     password: {
          type: String,
          required: true,
          minlength: [40]
     },

     promptpay: {
          type: String,
          required: true,
     },
     restaurantName: {
          type: String,
          required: true,
     },
     restaurantImage: {
          data: {
               type: Buffer
          },
          contentType: {
               type: String
          }
     }
})

restaurantInfo.methods.validPassword = function (txtPassword) {
     return bcrypt.compareSync(txtPassword, this.password)
}

restaurantInfo.methods.generateJWT = function () {
     const expiresIn = 7200
     return {
          token: jsonwebtoken.sign({
               _id: this._id,
               username: this.username,
               restaurantName: this.restaurantName
          },
               jwtSecret, { expiresIn })
          , expiresIn: expiresIn
     }
}

restaurantInfo.methods.toAuthJSON = function () {
     let genJwt = this.generateJWT()
     return {
          _id: this._id,
          email: this.email,
          username: this.username,
          promptpay: this.promptpay,
          restaurantName: this.restaurantName,
          restaurantImage: this.restaurantImage,
          token: genJwt.token,
          expiresIn: genJwt.expiresIn
     }
}

let foodMenu = new mongoose.Schema({
     foodName: {
          type: String,
          required: true,
     },
     foodPrice: {
          type: String,
          required: true,
     },
     foodImage: {
          data: {
               type: Buffer
          },
          contentType: {
               type: String
          }
     },
     //     foodImage: {
     //           data: Buffer,
     //           type: String
     //      },
     foodCategory: {
          type: String,
          required: true,
     },

     foodDetail: {
          type: String,
          required: true,
     },
     foodNote: {
          type: String,
          required: true,
     }
     , foodStatus: {
          type: String,
          required: true,
     }
})


let payment = new mongoose.Schema({
     paymentStatus: {
          type: String,
     },
     billImg: {
          data: {
               type: Buffer
          },
          contentType: {
               type: String
          }
     },
     slipImg: {
          data: {
               type: Buffer
          },
          contentType: {
               type: String
          }
     },


})

let order = new mongoose.Schema({
     foodId: String,
     quantity: Number,
     orderNote: String,
     orderDateAndTime: String
})
let table = new mongoose.Schema({
     tableNo: {
          type: String,
          required: true,
          unique: [true, 'Must be uniqued']
     },
     tableOrder: [order]
     ,
     payment: payment

})


let HiwKaow = new mongoose.Schema({
     restaurantInfo, foodMenu: [foodMenu], table: [table]
})

HiwKaow.methods.getOrderDetail =  function (tableNo) {
     const table = this.table.filter(e => e.tableNo == tableNo)[0]
     const menu = this.foodMenu
     const order = []
     var totalPrice = 0;
     var data = {}
     var foodName, foodPrice, quantity, total , orderNote,orderDateAndTime
     // console.log(menu[0])

     //          console.log(menu[0].foodNumber)
     //          console.log(menu[0].foodName)
     //          console.log(menu[0].foodPrice)
     //          console.log("=========")

          //     console.log(table.tableOrder[0].foodId)

     //          console.log(table.tableOrder[1].foodId)
     //          console.log(table.tableOrder[0].foodId)

     for (let i = 0; i < table.tableOrder.length; i++) {
          //     console.log(table.tableOrder[i])
          for (let j = 0; j < menu.length; j++) {
               //     console.log(menu[j])
               //    console.log(menu[j].foodId,table.tableOrder[i].foodId)
               // console.log(table.tableOrder[i]._id.toString() )
               if (table.tableOrder[i].foodId == menu[j]._id.toString()) {
                    foodName = menu[j].foodName
                    foodPrice = menu[j].foodPrice
                    quantity = table.tableOrder[i].quantity
                    orderNote = table.tableOrder[i].orderNote
                    orderDateAndTime = table.tableOrder[i].orderDateAndTime

                    total = quantity * foodPrice
                    totalPrice += total
                    data = { foodName, foodPrice, quantity, total,orderNote ,orderDateAndTime}
                    order.push(data)
               }
          }
     }


     // console.log(order)
     return { totalPrice, order }
}

export const HiwKaowModel = mongoose.model('HiwKaowModel', HiwKaow)







// let hiwKaowModel = new mongoose.Schema({ info, menu, table: [table] })