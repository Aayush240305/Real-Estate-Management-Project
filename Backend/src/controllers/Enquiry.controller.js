import {asyncHandler} from '../utilities/asyncHandler.js'
import {ApiError} from '../utilities/apiError.js'
import {ApiResponse} from '../utilities/apiResponse.js'
import {Property} from '../models/Property.model.js'
import {Enquiry} from '../models/Enquiry.model.js'

const sendEnquiry = asyncHandler(async (req, res) => {
  const customerId = req.user._id;
  const {propertyId} = req.body;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const ownerId = property.owner;

  const existingEnquiry = await Enquiry.findOne({
    property: propertyId,
    customer: customerId,
  });

  if (existingEnquiry) {
    throw new ApiError(400, "You have already sent an enquiry for this property");
  }

  const enquiry = await Enquiry.create({
    property: propertyId,
    customer: customerId,
    owner: ownerId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, enquiry, "Enquiry sent successfully"));
});

const getCustomerEnquiries = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  const enquiries = await Enquiry.find({customer: customerId})
    .populate("property")
    .populate("owner", "fullName email phone")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, enquiries, "Customer enquiries fetched successfully"));
});

const getOwnerEnquiries = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const enquiries = await Enquiry.find({owner: ownerId})
    .populate("property")
    .populate("customer", "fullName email phone")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, enquiries, "Owner enquiries fetched successfully"));
}); 

const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  if (enquiry.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  if (!["pending", "approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  enquiry.status = status;
  await enquiry.save();

  const populated = await Enquiry.findById(enquiry._id)
    .populate("property")
    .populate("owner", "fullName email phone")
    .populate("customer", "fullName email phone");

  return res.status(200).json(
    new ApiResponse(200, populated, "Enquiry updated")
  );
});


export {sendEnquiry, getCustomerEnquiries, getOwnerEnquiries, updateEnquiryStatus}