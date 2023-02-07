import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/database.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import stripeRoute from "./routes/stripe.js";

// app
const app = express();

// env files
dotenv.config();

// db
dbConnect();

// back🤝front
app.use(cors());

// allow json
app.use(express.json());

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", stripeRoute);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running @ ${process.env.PORT}`);
});
