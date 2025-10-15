import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Book = sequelize.define("Book", {
   title: DataTypes.STRING,
   author: DataTypes.STRING,
   isbn: DataTypes.STRING,
   availableCopies: { type: DataTypes.INTEGER, defaultValue: 1 },
   category: DataTypes.STRING,
});

export default Book;
