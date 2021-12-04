import { Router, Request, Response, NextFunction } from "express";
import { CreateTodoInput } from "../dto/input/create-todo.input";
import { verifyToken } from "../../middleware/auth";
import { Todo, User, List } from "../../models";
import { createTodo, editTodo } from "../service/todo.service";
import { ErrorResponse } from "../../utils/error.response";
import { EditTodoRequest } from "../dto/input/edit-todo.input";
import { Todo_Create_CHECK, Todo_Edit_CHECK } from "../../utils/validation";
const router: Router = Router();

export default () => {
  // Create new todo and assign to given List //
  router.post(
    "/create/:listId?",
    [verifyToken],
    Todo_Create_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const { listId } = req.params;

      const todo: Todo = await createTodo(
        req.body as CreateTodoInput,
        res.locals.jwtPayload.userId as number,
        +listId
      );

      if (!todo) {
        const response: ErrorResponse = {
          message: "Some error in creating todo",
          statusCode: 500,
        };
        return res.status(500).json(response);
      }
      res.send(todo);
    }
  );

  router.patch(
    "/edit/:todoId",
    [verifyToken],
    Todo_Edit_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const { todoId } = req.params;
      const response = await editTodo(
        req.body as EditTodoRequest,
        +todoId,
        res.locals.jwtPayload.userId
      );
      if (response) {
        return res.status(201).send("Successfully updated");
      }
      res.status(500).send("Internal Error");
    }
  );

  return router;
};
