import {Router} from 'express'
import {registerUser,loginUser, logoutUser,getUser,sendContact,feedback} from '../controllers/User.controller.js'
import {verifyUser} from '../middlewares/Auth.middleware.js'
const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyUser,logoutUser)
userRouter.route("/getUser").get(verifyUser,getUser)
userRouter.route("/contact").post(verifyUser, sendContact)
userRouter.route("/feedback").post(verifyUser, feedback)

export default userRouter; 