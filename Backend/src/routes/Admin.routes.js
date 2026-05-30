import {Router} from 'express'
import { getDashboardStats, getAllEnquiries, getAllUsers, toggleUserStatus, updatePropertyStatus, getAllProperties, getAllContacts, getAllFeedbacks } from '../controllers/Admin.controller.js'
import {verifyUser} from '../middlewares/Auth.middleware.js'
import { verifyAdmin } from '../middlewares/Admin.middleware.js'
const adminRouter = Router();

adminRouter.route("/dashboard").get(verifyUser, verifyAdmin, getDashboardStats);

adminRouter.route("/enquiries").get(verifyUser, verifyAdmin, getAllEnquiries);

adminRouter.route("/users").get(verifyUser, verifyAdmin, getAllUsers);

adminRouter.route("/user/:id").put(verifyUser, verifyAdmin, toggleUserStatus);

adminRouter.route("/property/status/:id").put(verifyUser, verifyAdmin, updatePropertyStatus);

adminRouter.get("/properties", verifyUser, verifyAdmin, getAllProperties);

adminRouter.get("/contacts", verifyUser, verifyAdmin, getAllContacts);

adminRouter.get("/feedbacks", verifyUser, verifyAdmin, getAllFeedbacks);

export default adminRouter;