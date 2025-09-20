import { useState,useEffect } from "react";
import { fetchReviews } from "../utils/fetchReviews";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(setReviews);
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-3xl font-bold text-gray-9005">
          Customer Reviews
        </span>
        <button className="bg-red-400 text-white px-4 py-2 rounded">
          Write a Review
        </button>
      </div>

      <section className="w-full h-[0.1px] bg-gray-300" />

      <div className="p-4">
        <div></div>
      </div>
    </div>
  );
}

export default Reviews;
