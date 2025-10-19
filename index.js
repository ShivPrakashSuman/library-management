import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from './routes/authRoutes.js'
import { connectDB } from "./lib/db.js";

const app = express();
const port = 3005;

app.use(express.json());
await connectDB();
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Mount routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
