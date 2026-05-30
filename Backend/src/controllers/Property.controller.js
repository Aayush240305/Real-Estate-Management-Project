import {asyncHandler} from '../utilities/asyncHandler.js'
import {ApiError} from '../utilities/apiError.js'
import {ApiResponse} from '../utilities/apiResponse.js'
import {Property} from '../models/Property.model.js'
import {Enquiry} from '../models/Enquiry.model.js'
import {uploadOnCloudinary} from '../utilities/Cloudinary.js'

const addProperty = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const {
    title,
    purpose,
    type,
    price,
    city,
    address,
    bedrooms,
    bathrooms,
    area,
    description,
    latitude,
    longitude
  } = req.body;

  if (!title || !purpose || !type || !price || !city || !address) {
    throw new ApiError(
      400,
      "Title, Purpose, Type, Price, City and Address are required"
    );
  }

  let imageUrls = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadedImage = await uploadOnCloudinary(file.path);
      if (uploadedImage) {
        imageUrls.push(uploadedImage.secure_url);
      }
    }
  }

  const property = await Property.create({
    owner: ownerId,
    title,
    purpose,
    type,
    price,
    city,
    address,
    bedrooms,
    bathrooms,
    area,
    description,
    images: imageUrls,
    location: latitude && longitude ? { lat: latitude, lng: longitude } : undefined
  });

  return res
    .status(201)
    .json(new ApiResponse(201, property, "Property added successfully"));
});

const myProperties = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const properties = await Property.find({ owner: ownerId });

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "My properties fetched successfully"));
});

const updateProperty = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    purpose,
    type,
    price,
    city,
    address,
    bedrooms,
    bathrooms,
    area,
    description,
  } = req.body;

  const property = await Property.findById(id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  let newImages = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) newImages.push(uploaded.secure_url);
    }
  }

  property.title = title;
  property.purpose = purpose;
  property.type = type;
  property.price = price;
  property.city = city;
  property.address = address;
  property.bedrooms = bedrooms;
  property.bathrooms = bathrooms;
  property.area = area;
  property.description = description;

  if (newImages.length > 0) {
    property.images = [...property.images, ...newImages];
  }

  await property.save();

  res.status(200).json(
    new ApiResponse(200, property, "Property updated successfully")
  );
};

const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const property = await Property.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  await Enquiry.deleteMany({ property: id });

  await property.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, {}, "Property and related enquiries deleted successfully")
  );
});

const ownerDashboard = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const totalProperties = await Property.countDocuments({ owner: ownerId });

  const buyCount = await Property.countDocuments({
    owner: ownerId,
    purpose: "buy",
  });

  const rentCount = await Property.countDocuments({
    owner: ownerId,
    purpose: "rent",
  });

  const recentProperties = await Property.find({ owner: ownerId })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title city purpose price images createdAt");

  return res.status(200).json(
    new ApiResponse(200, {
      totalProperties,
      buyCount,
      rentCount,
      recentProperties,
    })
  );
});


const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({status:"approved"});

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "All properties fetched successfully"));
});

const getPropertyDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const property = await Property.findById(id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, property, "Property details fetched successfully"));
});

export { addProperty, myProperties, updateProperty, deleteProperty, ownerDashboard, getAllProperties, getPropertyDetails };