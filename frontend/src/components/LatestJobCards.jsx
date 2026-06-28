import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import React from "react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Company Name + Location */}
      <div>
        <h1 className="font-medium text-lg">
          {job?.company?.name || "Company Name"}
        </h1>
        <p className="text-sm text-gray-500">{job?.location || "India"}</p>
      </div>

      {/* Job Title + Description */}
      <div className="mt-3">
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge
          className="bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1"
          variant="ghost"
        >
          {job?.position || 0} Positions
        </Badge>

        <Badge
          className="bg-red-100 text-red-700 font-bold rounded-full px-3 py-1"
          variant="ghost"
        >
          {job?.jobType || "N/A"}
        </Badge>

        <Badge
          className="bg-purple-100 text-purple-700 font-bold rounded-full px-3 py-1"
          variant="ghost"
        >
          ₹ {job?.salary || 0}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
