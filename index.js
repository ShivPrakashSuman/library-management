import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const port = 3000;

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
app.use("/book", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
