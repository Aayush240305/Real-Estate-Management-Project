import {asyncHandler} from '../utilities/asyncHandler.js'
import {ApiError} from '../utilities/apiError.js'
import {ApiResponse} from '../utilities/apiResponse.js'
import {Property} from '../models/Property.model.js'
import {User} from '../models/User.model.js'
import {Enquiry} from '../models/Enquiry.model.js'
import { Contact } from "../models/ContactUs.model.js"; 
import { Feedback } from "../models/feedback.model.js";

const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find()
    .populate("property")
    .populate("customer", "fullName email")
    .populate("owner", "fullName email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, enquiries, "All enquiries fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

const toggleUserStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, user, "User status updated")
  );
});

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({role: {$ne: "admin"}});
  const totalOwners = await User.countDocuments({role: "owner"});
  const totalCustomers = await User.countDocuments({role: "customer"});
  const totalProperties = await Property.countDocuments();
  const approvedProperties = await Property.countDocuments({status: "approved"});
  const pendingProperties = await Property.countDocuments({status: "pending"}); 
  const totalEnquiries = await Enquiry.countDocuments();
  const approvedEnquiries = await Enquiry.countDocuments({status: "approved"});
  const pendingEnquiries = await Enquiry.countDocuments({status: "pending"});

  const stats = {
    totalUsers,
    totalOwners,
    totalCustomers,
    totalProperties,
    approvedProperties,
    pendingProperties,
    totalEnquiries,
    approvedEnquiries,
    pendingEnquiries,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Dashboard stats fetched successfully"));
});

const getAllProperties = asyncHandler(async (req, res) => {

  const properties = await Property.find()
    .populate("owner", "fullName email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, properties, "All properties fetched")
  );
});

const updatePropertyStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = status;
  await property.save();

  return res.status(200).json(
    new ApiResponse(200, property, "Property status updated")
  );
});

const getAllContacts = asyncHandler(async (req, res) => {

  const contacts = await Contact.find()
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, contacts, "Contacts fetched successfully")
  );
});

const getAllFeedbacks = asyncHandler(async (req, res) => {

  const feedbacks = await Feedback.find()
    .sort({ createdAt: -1 })
    .populate("user", "fullName");

  return res.status(200).json(
    new ApiResponse(200, feedbacks, "Feedbacks fetched successfully")
  );
});

export {getAllEnquiries, getAllUsers, getDashboardStats, toggleUserStatus, getAllProperties, updatePropertyStatus, getAllContacts, getAllFeedbacks};