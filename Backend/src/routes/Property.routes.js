import {Router} from 'express'
import { addProperty,myProperties,updateProperty,deleteProperty,ownerDashboard ,getAllProperties, getPropertyDetails} from '../controllers/Property.controller.js'
import {verifyUser} from '../middlewares/Auth.middleware.js'
import { upload } from '../middlewares/Multer.middelware.js'

const propertyRouter = Router()


propertyRouter.route("/add").post(
  verifyUser,
  upload.array("images", 10),
  addProperty
);

propertyRouter.route("/myproperties").get(verifyUser,myProperties)

propertyRouter.route("/update/:id").put(
  verifyUser,
  upload.array("images", 10),
  updateProperty
);

propertyRouter.route("/delete/:id").delete(verifyUser, deleteProperty);

propertyRouter.route("/dashboard").get(verifyUser, ownerDashboard);

propertyRouter.route("/all").get(verifyUser, getAllProperties);

propertyRouter.route("/details/:id").get(verifyUser, getPropertyDetails);

export default propertyRouter; 