import express from 'express'
import {registerController} from '../controllers/authController.js'
//router object -- if u create seperate file for routing
const router = express.Router()


// console.log("dfghjk")
//routing
router.post('/register', registerController)

export default router