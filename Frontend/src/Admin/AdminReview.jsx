import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/v1/admin/feedbacks", {
        withCredentials: true,
      });
      setReviews(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar title="Reviews" />

      <div className="flex-1 p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">
          Website Reviews
        </h1>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="p-3">
                    {review.user?.fullName}
                  </td>
                  <td className="p-3 text-yellow-500">
                    {renderStars(review.rating)}
                  </td>
                  <td className="p-3">
                    {review.message}
                  </td>
                  <td className="p-3">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminReviews;