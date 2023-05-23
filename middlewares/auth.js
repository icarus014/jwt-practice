const jwt = require ('jsonwebtoken')

function authenticate(req, res, next){
    const authHeader =  req.headers.authorization
    
   if(authHeader){
    try {
        const token = authHeader.split(' ')[1]
        const validToken = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.finfbyId(validToken.id)
        req.user = user

        return next()
    } catch (error) {
        return res.status(422).json({message: 'unauthorized'})
         }
   }
   return res.status(401).json({ message: 'unauthorized '})
   
}

module.exports = {
    authenticate
}