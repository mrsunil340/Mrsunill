import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");

// profile update ke liye resume + profile photo dono
export const multipleUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },          // resume
  { name: "profilePhoto", maxCount: 1 },  // profile photo
]);