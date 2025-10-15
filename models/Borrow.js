import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";
import Book from "./Book.js";

const Borrow = sequelize.define("Borrow", {
   issueDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
   returnDate: { type: DataTypes.DATE, allowNull: true },
});

User.hasMany(Borrow);
Borrow.belongsTo(User);

Book.hasMany(Borrow);
Borrow.belongsTo(Book);

export default Borrow;
