import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a Sequelize instance with MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,     // username
  process.env.DB_PASS,     // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,        // disable SQL logging in console
  }
);

// Function to connect and test MySQL
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database connected successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
export { sequelize };