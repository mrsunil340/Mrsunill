import { Badge } from "./ui/badge";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { id: jobId } = useParams();

  const [job, setJob] = useState(null); // local state use karenge
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const fetchSingleJob = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });

      console.log("Single job response:", res.data);

      if (res?.data?.success) {
        setJob(res.data.job);
      } else {
        setJob(null);
      }
    } catch (error) {
      console.log("Fetch single job error:", error);
      console.log("Fetch single job error response:", error?.response?.data);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId]);

  const isApplied = useMemo(() => {
    if (!job?.application || !user?._id) return false;

    return job.application.some((app) => {
      const applicantId =
        typeof app?.applicant === "object"
          ? app?.applicant?._id
          : app?.applicant;

      return applicantId?.toString() === user?._id?.toString();
    });
  }, [job, user]);

  const applyJobHandler = async () => {
    try {
      setApplying(true);

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        await fetchSingleJob(); // apply ke baad fresh job data lao
      }
    } catch (error) {
      console.log("Apply job error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-10">
        <p className="text-center text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto my-10">
        <p className="text-center text-red-500 font-medium">No Job Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl">{job?.title}</h1>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job?.position} Positions
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              {job?.jobType}
            </Badge>
            <Badge className="text-indigo-600 font-bold" variant="ghost">
              {job?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied && !applying ? applyJobHandler : undefined}
          disabled={isApplied || applying}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied
            ? "Already Applied"
            : applying
            ? "Applying..."
            : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-4">
        {job?.description}
      </h1>

      <div className="mt-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
        </h1>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {job?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {job?.description}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {job?.experienceLevel} yrs
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {job?.salary} LPA
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applicant:
          <span className="pl-4 font-normal text-gray-800">
            {job?.application?.length || 0}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {job?.createdAt?.split("T")[0] || "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
