import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-600">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  {" "}
                  <Link to="/admin/companies">Companies</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/admin/jobs">Jobs</Link>{" "}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZ0C4vDEjzERRMFRXfqIf9pY6H1in0RzvpvNC6mH-RA&s"
                    }
                    alt={user?.fullName}
                  />
                  <AvatarFallback>
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZ0C4vDEjzERRMFRXfqIf9pY6H1in0RzvpvNC6mH-RA&s"
                      }
                      alt={user?.fullName}
                    />
                    <AvatarFallback>
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio added"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-600 mt-4">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 h-auto">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button
                      onClick={logOutHandler}
                      variant="link"
                      className="p-0 h-auto"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
