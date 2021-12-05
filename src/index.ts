import express from "express";
import { Database } from "./models/index";
import authController from "./user/controller/auth.controller";
import todoController from "./todo/controller/todo.controller";
import listController from "./list/controller/list.controller";
import * as dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
dotenv.config();
const server = express();

server.use(express.json());
// should be included cors politics?

server.use("/auth", authController());
server.use("/todo", todoController());
server.use("/list", listController());
server.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
async function start() {
  await Database.sync();
  try {
    server.listen(5000, () => {
      console.log(`Server running at 5000 port`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
