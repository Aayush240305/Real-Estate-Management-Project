import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OwnerSideBar from "./OwnerSideBar";

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
      toast.success("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <OwnerSideBar title="Contact Us" />

      <div className="flex-1 overflow-y-auto p-12 mt-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="flex flex-col justify-center mt-5">

            <h1 className="text-4xl font-bold text-gray-800">
              Need Assistance?
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-md">
              If you have any questions about your properties,
              enquiries or account, feel free to reach out to our support team.
            </p>

            <div className="mt-12 space-y-10 text-gray-700">

              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  support@homesphere.com
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Phone
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Office
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Chimangaon, India
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-10">

            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Send a Message
            </h2>

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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
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