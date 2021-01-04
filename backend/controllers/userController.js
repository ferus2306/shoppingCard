import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @Desc Auth user & get token
// @Route POST /api/users/login
// @accss  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or passowrd')
    }

    // res.send({
    //     email,
    //     password
    // })
})


// @Desc Register a new user
// @Route POST /api/users
// @accss  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // find if the user exists
    const userExists = await User.findOne({ email: email })
    
    // if exists , give error
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // create user
    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})


// @Desc Auth user profile
// @Route POST /api/users/profile
// @accss  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // const {email} = req.body
    // const userExists = await User.findOne({ email: email })
    const user = await User.findById(req.user._id)
    // console.log(user);
  
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})




export { authUser, getUserProfile, registerUser }