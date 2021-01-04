import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


// Register user
router.route('/').post(registerUser)

// Login user
router.post('/login', authUser)

// Get user profile
router.route('/profile').get(protect, getUserProfile)

export default router 