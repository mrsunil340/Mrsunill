import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-6xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-purple-600">Latest & Top </span>Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs && allJobs.length > 0 ? (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <span>No Job Available..</span>
        )}
      </div>
    </div>
  );
};

export default LatestJob;
