import express from "express";
import { singleUpload, multipleUpload } from "../middlewares/multer.js";
import {
  updateProfile,
  login,
  register,
  logout,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// profile update ke liye multipleUpload use hoga
router.route("/profile/update").post(
  isAuthenticated,
  multipleUpload,
  updateProfile
);

export default router;