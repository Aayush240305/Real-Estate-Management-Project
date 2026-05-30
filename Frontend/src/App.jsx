import React from "react";
import { ToastContainer} from 'react-toastify';
import Home from './home.jsx'
import Login from './login.jsx'
import Signup from './signup.jsx'
import OwnerDashboard from './Owner/OwnerDashboard.jsx'
import OwnerEnquiries from './Owner/OwnerEnquiries.jsx'
import AddProperty from './Owner/AddProperty.jsx'
import CustomerProperties from "./Customer/CustomerProperties.jsx";
import PropertyDetails from "./Customer/PropertyDetails.jsx";
import MyProperties from "./Owner/MyProperties.jsx";
import EditProperty from "./Owner/EditProperty.jsx";
import CustomerEnquiries from "./Customer/CustomerEnquiries.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import UserManagement from "./Admin/UserManagement.jsx";
import PropertyManagement from "./Admin/PropertyManagement.jsx";
import EnquiryManagement from "./Admin/EnquiryManagement.jsx";
import ContactUs from "./Customer/ContactUs.jsx";
import ContactUsOwner from "./Owner/ContactUs.jsx";
import ContactQueries from "./Admin/ContactQueries.jsx";
import Review from "./Customer/review.jsx";
import ReviewOwner from "./Owner/review.jsx";
import AdminReview from "./Admin/AdminReview.jsx";
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Home />,
    },
    {
      path:"/login",
      element: <Login />,
    },
    {
      path:"/signup",
      element: <Signup />,
    },
    {
      path:"/owner/dashboard",
      element: <OwnerDashboard />,
    },
    {
      path:"/owner/add-property",
      element: <AddProperty />,
    },
    {
      path:"/owner/myproperties",
      element: <MyProperties />,
    },
    {
      path:"/owner/edit-property/:id",
      element: <EditProperty />,
    },
    {
      path:"/owner/enquiries",
      element: <OwnerEnquiries />,
    },
    {
      path:"/owner/contact",
      element: <ContactUsOwner />,
    },
    {
      path:"/owner/review",
      element: <ReviewOwner />,
    },
    {
      path:"/customer/home",
      element: <CustomerProperties />,
    },
    {
      path:"/customer/property/:id",
      element: <PropertyDetails />,
    },
    {
      path:"/customer/enquiries",
      element: <CustomerEnquiries />,
    },
    {
      path:"/customer/contact",
      element: <ContactUs />,
    },
    {
      path:"/admin/dashboard",
      element: <AdminDashboard/>
    },
    {
      path:"admin/user",
      element: <UserManagement />
    },
    {
      path:"admin/property",
      element: <PropertyManagement />
    },
    {
      path:"admin/enquiries",
      element: <EnquiryManagement />
    },
    {
      path:"/admin/contacts",
      element: <ContactQueries />
    },
    {
      path:"/customer/review",
      element: <Review />
    },
    {
      path:"/admin/reviews",
      element: <AdminReview />
    }
    ]
  )

function App() {
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router} />
    </>
  );
}

export default App;