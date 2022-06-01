import { HiwKaowModel } from '../model/model.js'

export const addMenu = (req, res) => {
     // console.log(req.body)
     // console.log(req.file)
     const { foodName, foodPrice, foodCategory, foodDetail, foodNote, Image, foodStatus } = req.body

     const foodImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }
     // console.log(foodImage);
     const menu = { foodName, foodPrice, foodCategory, foodDetail, foodNote, foodImage, foodStatus }
     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": req.query.ResId }, { $push: { foodMenu: menu } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log(err);
          })


}

export const deleteMenu = (req, res) => {

     const { ResId, foodId } = req.query


     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId }, { $pull: { foodMenu: { _id: foodId } } })
          .then(result => {
               res.send(result)
          })
          .catch(err => {
               console.log();
          })


}

export const editMenu = (req, res) => {
     // console.log(req.body)
     // console.log(req.file)
     const { foodName, foodPrice, foodCategory, foodDetail, foodNote, foodStatus } = req.body

     const foodImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
     }
     const { foodId, ResId } = req.query

     const menu = { foodName, foodPrice, foodCategory, foodDetail, foodNote, foodStatus, foodImage, _id: foodId }
     // db.hiwkaowmodels.findOneAndUpdate({ "restaurantInfo.username": "toghsmsss", "foodMenu.foodName": "x" }, { $set: { "foodMenu.$": "dd" } })
     HiwKaowModel.findOneAndUpdate({ "restaurantInfo._id": ResId, "foodMenu._id": foodId }, { $set: { "foodMenu.$": menu } })
          .then(result => {
               // console.log(result);

               res.send(result)
          })
          .catch(err => {
               console.log();
          })
}


export const getMenu = (req, res) => {

     const { ResId, foodId } = req.query


     HiwKaowModel.findOne({ "restaurantInfo._id": ResId, "foodMenu._id": foodId }, { _id: 0, "foodMenu.$": 1 })
          .then(result => {
               res.send(result.foodMenu[0])
          })
          .catch(err => {
               console.log();
          })
}

export const fliterMenuByCategory = (req, res) => {

     const { foodCategory, username } = req.query

     HiwKaowModel.aggregate([
          { $match: { "restaurantInfo.username": username } },
          {
               $project: {
                    foodMenu: {
                         $filter: {
                              input: "$foodMenu",
                              as: "foodMenu",
                              cond: { $eq: ["$$foodMenu.foodCategory", foodCategory] }

                         }
                    }
               }
          }
     ]).then(result => {

          res.send(result[0].foodMenu)
     })
          .catch(err => {
               console.log();
          })
}

export const fliterMenuByFoodNote = (req, res) => {

     const { foodNote, username } = req.query

     HiwKaowModel.aggregate([
          { $match: { "restaurantInfo.username": username } },
          {
               $project: {
                    foodMenu: {
                         $filter: {
                              input: "$foodMenu",
                              as: "foodMenu",
                              cond: { $eq: ["$$foodMenu.foodNote", foodNote] }
                         }
                    }
               }
          }
     ])
          // HiwKaowModel.find({'restaurantInfo._id' : ResId},{foodMenu:{ $elemMatch : {foodNote}}})
          .then(result => {
               res.send(result[0].foodMenu)
          })
          .catch(err => {
               console.log();
          })
}

export const fliterMenuByCategoryAndReady = (req, res) => {

     const { foodCategory, username } = req.query

     HiwKaowModel.aggregate([
          { $match: { "restaurantInfo.username": username } },
          {
               $project: {
                    foodMenu: {
                         $filter: {
                              input: "$foodMenu",
                              as: "foodMenu",
                              cond: { $eq: ["$$foodMenu.foodCategory", foodCategory], $eq: ["$$foodMenu.foodStatus", "available"] }

                         }
                    }
               }
          }
     ]).then(result => {
          res.send(result[0].foodMenu)
     })
          .catch(err => {
               console.log(err);
          })
}

export const fliterMenuByFoodNoteAndReady = (req, res) => {

     const { foodNote, username } = req.query

     HiwKaowModel.aggregate([
          { $match: { "restaurantInfo.username": username } },
          {
               $project: {
                    foodMenu: {
                         $filter: {
                              input: "$foodMenu",
                              as: "foodMenu",
                              cond: { $eq: ["$$foodMenu.foodNote", foodNote], $eq: ["$$foodMenu.foodStatus", "available"] }
                         }
                    }
               }
          }
     ])
          // HiwKaowModel.find({'restaurantInfo._id' : ResId},{foodMenu:{ $elemMatch : {foodNote}}})
          .then(result => {
               res.send(result[0].foodMenu)
          })
          .catch(err => {
               console.log();
          })
}

export const getAllMenu = (req, res) => {

     const { ResId } = req.query

     HiwKaowModel.find({ "restaurantInfo._id": ResId }, { _id: 0, "foodMenu": 1 })
          .then(result => {
               res.send(result[0].foodMenu)
               // console.log(result[0].foodMenu)

          })
          .catch(err => {
               console.log();
          })
}