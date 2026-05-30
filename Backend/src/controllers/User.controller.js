import {asyncHandler} from '../utilities/asyncHandler.js'
import {ApiError} from '../utilities/apiError.js'
import {ApiResponse} from '../utilities/apiResponse.js'
import {User} from '../models/User.model.js'
import { Contact } from "../models/ContactUs.model.js";
import { Feedback } from "../models/feedback.model.js";

const createAccessAndRefreshToken = async(userId)=>{
  try{
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false})

    return {accessToken, refreshToken}

  }catch(error){
    throw new ApiError(501, "Something went wrong at time of creation of access token and refresh token",error.message)
  }
}

const options = {
  httpOnly:true,
  secure:false
}

const registerUser = asyncHandler(async (req, res)=>{
  const {fullName, email, password, phone, role} = req.body;
  if(fullName === "" || email === "" || password === "" || phone === "" || role === ""){
    throw new ApiError(400, "All fields are required");
  }
  
  const existingUser = await User.findOne({email});
  
  if(existingUser){
    throw new ApiError(401, "User already extisted");
  }
  
  const user = await User.create({
    fullName,
    email,
    password,
    phone,
    role
  })
  
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
  if(!createdUser){
    throw new ApiError(500, "Something went wrong");
  }
  
  return res
  .status(201)
  .json(new ApiResponse(201, createdUser, "user created successfully"));
})

const loginUser = asyncHandler(async (req,res)=>{
  const {email, password} = req.body;
  
  if(email ==="" || password === ""){
    throw new ApiError(400, "All fields are required");
  }
  
  const user = await User.findOne({email});
  
  if(!user){
    throw new ApiError(404, "User not found")
  }
  
  const correctPassword = await user.isPasswordCorrect(password);
  
  if(!correctPassword){
    throw new ApiError(401, "password incorrect");
  }

  if(user.isBlocked){
    throw new ApiError(403, "Your account has been blocked.");
  }
  
  const {accessToken, refreshToken} = await createAccessAndRefreshToken(user._id);
  
  const loggedUser = await User.findById(user._id).select("-password -refreshToken");
  
  res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(200, {
   loggedUser, refreshToken, accessToken
 }, "user logged in successfully"))
 })
 
 const logoutUser = asyncHandler(async (req, res)=>{
     const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset:{
        refreshToken:1
      },
    },
    {
        new:true
    }
  )

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(
    200, 
    "User Logged Out successfully"
    )
  )
 })
 
const getUser = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id).select("-password -refreshToken")
   res
   .status(200)
   .json(new ApiResponse(200, user,  "user fetched successfully"))
 })

const sendContact = asyncHandler(async (req, res) => {

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "Name, Email and Message are required");
  }

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  return res.status(201).json(
    new ApiResponse(201, contact, "Message sent successfully")
  );
});

const feedback = asyncHandler(async (req, res) => {
  const { rating, message } = req.body;

  if (!rating || !message) {
    throw new ApiError(400, "Rating and Message are required");
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    rating,
    message,
  });

  return res.status(201).json(
    new ApiResponse(201, feedback, "Feedback submitted successfully")
  );
});
 

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  sendContact,
  feedback
}