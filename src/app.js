import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";

import videoRoute from "./routes/videoRoute.js";
import videoApiRoute from "./routes/videoApiRoute.js";
import videoAddSLD from "./routes/videoAddSLDRoute.js";
import commentesRealetedRoutes from "./routes/commentsRealetedRoutes.js";

const app = express();

const __dirname = process.cwd();

app.use(cors({ path: "*" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  }),
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/frontend/index.html");
});
app.use("/user", userRoute);
app.use("/video", videoRoute);
app.use("/api/videos", videoApiRoute);
app.use("/videoAddSLD", videoAddSLD);
app.use("/commentes", commentesRealetedRoutes);

export { app };
