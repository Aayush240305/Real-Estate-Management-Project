import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "./CustomerNavbar";

function Review() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select rating");
      return;
    }

    try {
      await axios.post(
        "/api/v1/user/feedback",
        { rating, message },
        { withCredentials: true }
      );

      toast.success("Review submitted successfully");
      setRating(0);
      setMessage("");
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNavbar />

      <div className="max-w-3xl mx-auto mt-30 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">
          Website Review
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="mb-2 font-medium">Rate our website:</p>

            <div className="flex gap-2 text-3xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Submit Review
          </button>

        </form>
      </div>
    </div>
  );
}

export default Review;