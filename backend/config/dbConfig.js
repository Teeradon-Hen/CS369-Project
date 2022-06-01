export const dbConfig = {
     database: process.env.DB_URL,
     userMongoClient:true,
     connectOptions:{
          useNewUrlParser:true,
          useUnifiedTopology:true
     }
}