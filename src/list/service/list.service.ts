import { CreateTodoInput } from "../../todo/dto/input/create-todo.input";
import { List, Todo, User } from "../../models";
import { ErrorResponse } from "../../utils/error.response";

export const createTodo = async (
  input: CreateTodoInput,
  id: number
): Promise<Todo> => {
  const { title, text, deadline } = input;
  const todo = await Todo.create({ title, text, deadline });
  return todo;
};

export const get_All_Lists_Of_Current_User = async (
  userId: number
): Promise<User> => {
  const Userlist = await User.findByPk(userId, {
    attributes: [],
    include: [
      {
        model: List,
        as: "lists",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return Userlist;
};

export const get_all_todos_from_list_by_Id = async (
  listId: number
): Promise<List | ErrorResponse> => {
  const data = await List.findByPk(listId, {
    include: [
      {
        model: Todo,
        as: "ListTodos",
        attributes: ["id", "title", "text", "deadline", "flag"],
      },
    ],
  });
  if (data != null) {
    return data;
  } else {
    return {
      message: `Internal Error`,
      statusCode: 500,
    };
  }
};
