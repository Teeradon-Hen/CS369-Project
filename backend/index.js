import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
const app = express()
const port = process.env.PORT || 4000;
import 'dotenv/config'

import { dbConfig } from './config/dbConfig.js'

import restaurantRouter from './router/RestaurantRouter.js'
import tableRouter from './router/tableRouter.js'
import foodMenuRouter from './router/foodMenuRouter.js'
import paymentRouter from './router/paymentRouter.js'

import orderRouter from './router/orderRouter.js'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.listen(port, function () {
     console.log('Connected to port ' + port)
})

// Error handler
app.use(function (err, req, res, next) {
     console.error(err.message);
     if (!err.statusCode)
          err.statusCode = 500;
     res.status(err.statusCode).send(err.message);
})

mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
mongoose.connect(dbConfig.database, dbConfig.connectOptions).then(() => {
     console.log('Database successfully connected');
}, error => {
     console.log('Could not connect to database: ' + error)
}
)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/menu', foodMenuRouter)
app.use('/api/table', tableRouter)
app.use('/api/order', orderRouter)
app.use('/api/payment', paymentRouter)
