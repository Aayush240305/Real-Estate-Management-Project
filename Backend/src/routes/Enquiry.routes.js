import {Router} from 'express'
import {sendEnquiry, getCustomerEnquiries, getOwnerEnquiries, updateEnquiryStatus} from '../controllers/Enquiry.controller.js'
import {verifyUser} from '../middlewares/Auth.middleware.js'

const enquiryRouter = Router();

enquiryRouter.route("/send").post(verifyUser, sendEnquiry);

enquiryRouter.route("/customer").get(verifyUser, getCustomerEnquiries);

enquiryRouter.route("/owner").get(verifyUser, getOwnerEnquiries);

enquiryRouter.route("/status/:id").put(verifyUser, updateEnquiryStatus);

export default enquiryRouter;