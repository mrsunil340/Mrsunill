import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return 0;

    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </p>

        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <img
          className="w-18 h-16 bg-white p-2 object-contain"
          src={job?.company?.logo}
          alt="Company Logo"
        />

        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1 hover:bg-blue-100">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-red-100 text-red-700 font-bold rounded-full px-3 py-1 hover:bg-red-100">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-100 text-purple-700 font-bold rounded-full px-3 py-1 hover:bg-purple-100">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>

        <Button className="bg-purple-600 hover:bg-purple-700">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
