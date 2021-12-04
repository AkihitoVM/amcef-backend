import { Options, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();
import User from "./user";
import Todo from "./todo";
import List from "./list";

// Open database connection
const sequelize: Sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

let models = [User, Todo, List];
models.forEach((model) => model.initialize(sequelize));

User.belongsToMany(List, {
  through: "UserLists",
  as: "lists",
  foreignKey: "user_id",
});
List.belongsToMany(User, {
  through: "UserLists",
  as: "users",
  foreignKey: "list_id",
});

List.hasMany(Todo, { as: "ListTodos" });
Todo.belongsTo(List, {
  foreignKey: "ListId",
  as: "list",
});

export { sequelize as Database, User, Todo, List };
