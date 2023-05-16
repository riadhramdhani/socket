const router= require('express').Router()
const middle = require('../controllers/user')
router.post('/api/signup', middle.createuser)
router.post('/api/signin', middle.sginIn)
module.exports= {authRouter: router}