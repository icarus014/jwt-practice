const router = require('express').Router()
const bcrypt = require ('bcryptjs')
const User = require('../models/user')
const jwt  = require ('jsonwebtoken')
const { authenticate } = require('../middlewares/auth')

router.get('/', async (req, res)=> {
    const users = await User.find()
    res.json(users)
})
// mock create comment 
router.get('/comment',authenticate, async (req, res)=>{
        // create comment here
        res.send('complete')
})


router.post('/', async (req, res)=>{
    const { username, password, age } = req.body
    const user =  await User.findOne({ username })

    if (user) {
       return res.status(422).json({message: 'user already exists' })
    }

    const createdUser = await new User({
        username,
        age,
        password: await bcrypt.hash(password, 10)
    }).save()

    const payload = {
        id: createdUser._id,
        username
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'})

    res.json({ token })
})

module.exports = router
