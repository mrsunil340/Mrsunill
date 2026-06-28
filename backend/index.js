import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config()

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";


const app = express();


const _dirname = path.resolve();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://mrsunill-3.onrender.com/',
    credentials:true
}
app.use(cors(corsOptions))

let port = process.env.PORT || 3000;

//API's

app.use("/api/v1/user",userRoute);

app.use("/api/v1/company",companyRoute);

app.use("/api/v1/job",jobRoute);

app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_dirname, "frontend", "dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});




app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`);
});