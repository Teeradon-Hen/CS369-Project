import jsonwebtoken from 'jsonwebtoken'

export const Authentication = (req,res,next) =>{
     const token = req.body.token || req.query.token || req.headers.authorization
     // console.log( req.headers)
     if(!token){
          return res.status(403).send('need token')
     }

     try{
          const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET)
          req.user = decoded
     }
     catch(err){
          console.log(err)
          return res.status(401).send('Invalid token')
     }
     return next()
}