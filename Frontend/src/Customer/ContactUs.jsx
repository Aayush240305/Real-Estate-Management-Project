import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "./CustomerNavbar";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/v1/user/contact", formData);

      toast.success("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <CustomerNavbar title="Contact Us" />

      <div className="pt-28 px-6 lg:px-20 pb-16">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Let’s Talk
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Have questions about a property or need assistance?  
              Our team is here to help you find the perfect place.
            </p>

            <div className="mt-10 space-y-6 text-gray-700">
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p>support@homesphere.com</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">Office</p>
                <p>Chimangaon, India</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-8">

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:border-indigo-600 outline-none transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:border-indigo-600 outline-none transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:border-indigo-600 outline-none transition-all duration-300"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:border-indigo-600 outline-none transition-all duration-300 resize-none"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-4 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ContactUs;