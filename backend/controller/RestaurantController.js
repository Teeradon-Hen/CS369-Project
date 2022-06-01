import { HiwKaowModel } from '../model/model.js'
import bcrypt from 'bcrypt'

export const signIn = (req, res) => {
     const { username, password } = req.body
     HiwKaowModel.findOne({ "restaurantInfo.username": username }).then(user => {
          if (!user)
               return res.status(422).send("ไม่เจอ")
          else {
               if (user.restaurantInfo.validPassword(password)) {
                    res.send(user.restaurantInfo.toAuthJSON())
               }
               else
                    return res.status(402).send("รหัสไม่ตรง")

          }
     })
}

export const signUp = (req, res) => {
     const { resUserName, resPwd, resName, resEmail, resPromptpay } = req.body
     const resImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }
     bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(resPwd, salt, (err, hash) => {
               if (err) res.sendStatus(400)
               else {
                    var newUser = new HiwKaowModel({
                         restaurantInfo: {
                              email: resEmail, username: resUserName,
                              password: hash, promptpay: resPromptpay,
                              restaurantName: resName, restaurantImage: resImage
                         },
                         foodMenu: [],
                         table: []
                    })



                    newUser.save().then(user => {
                         res.send(user.restaurantInfo.toAuthJSON())
                    }).catch(err => {
                         res.sendStatus(401)

                    })
                    // console.log(newInfo.validPassword(password + 's'))
                    // console.log(newInfo.generateJWT())



               }
          })

     })
}

export const getInfo = (req, res) => {
     // const { username, password, email, promptpay, restaurantName } = req.body
     // const restauranImage = req.body.file == null ? {
     //      data: req.file.buffer,
     //      contentType: req.file.mimetype
     // } : null
     HiwKaowModel.findOne({ "restaurantInfo._id": req.query.ResId }).then(user => {
          if (!user)
               return res.status(422).send("ไม่เจอ")
          else {
               res.send(user.restaurantInfo)
          }
     })
}


export const editInfo = (req, res) => {
     const { resName, resEmail, resPromptpay } = req.body
     const resImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }

     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": req.query.ResId },
          {
               $set: {
                    "restaurantInfo.email": resEmail, "restaurantInfo.restaurantName": resName,
                    "restaurantInfo.restaurantImage": resImage, "restaurantInfo.promptpay": resPromptpay
               }
          })
          .then(result => {
               HiwKaowModel.findOne({ "restaurantInfo._id": req.query.ResId }).then(user => {
                    if (!user)
                         return res.status(422).send("ไม่เจอ")
                    else {
                         res.send(user.restaurantInfo.toAuthJSON())
                    }
               })
          })
          .catch(err => {
               console.log(err);
          })


}




export const editPassword = (req, res) => {
     const{resCurrentPwd, resNewPwd} = req.body
     const { ResId } = req.query

     HiwKaowModel.findOne({ "restaurantInfo._id": ResId }).then(user => {
          if (user.restaurantInfo.validPassword(resCurrentPwd)) {
               bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(resNewPwd, salt, (err, hash) => {
                         if (err) res.sendStatus(400)
                         else {
                              HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": req.query.ResId }, { $set: { "restaurantInfo.password": hash } })
                                   .then(result => {
                                        res.send(result)
                                   })
                                   .catch(err => {
                                        console.log(err);
                                   })
                         }
                    })
               })
          }
          else
               return res.status(402).send("รหัสไม่ตรง")

     })
}

