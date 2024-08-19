import { app } from "./src/app.js";
import { connectDB } from "./src/db/index.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DATABASE is not connected ! - 3", err);
    process.exit(1);
  });
