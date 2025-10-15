import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("User", {
   name: { type: DataTypes.STRING, allowNull: false },
   email: { type: DataTypes.STRING, allowNull: false, unique: true },
   mobile: { type: DataTypes.STRING, allowNull: false, unique: true },
   password: { type: DataTypes.STRING, allowNull: false },
   role: {
      type: DataTypes.ENUM("admin", "librarian", "member"),
      defaultValue: "member",
   },
});

// Password hash
User.beforeCreate(async (user) => {
   user.password = await bcrypt.hash(user.password, 10);
});

export default User;
