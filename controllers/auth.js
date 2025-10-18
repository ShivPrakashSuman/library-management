import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "library_db",
    timezone: "Z", // Important to ensure consistent timezone values
  }),
});
