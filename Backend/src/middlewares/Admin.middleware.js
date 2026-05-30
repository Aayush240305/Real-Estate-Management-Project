import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiError } from "../utilities/apiError.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    throw new ApiError(403, "Access forbidden: Admin only");
  }

  next();
});