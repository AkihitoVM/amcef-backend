import { DATE } from "sequelize";
import { CreateTodoInput } from "../dto/input/create-todo.input";
import { List, Todo, User } from "../../models";
import { Response } from "express";
import { EditTodoRequest } from "../dto/input/edit-todo.input";
import { isUserHaveListById } from "../../utils/isUserHaveListById";

export const createTodo = async (
  input: CreateTodoInput,
  authorId: number,
  ListId: number
) => {
  const { title, text, deadline, flag } = input;

  const a = await User.findByPk(authorId, {
    include: {
      model: List,
      as: "lists",
      attributes: ["id"],
      through: {
        attributes: [],
      },
    },
  });

  let userLists = (a.toJSON().lists as Array<{ id: number }>).filter((e) => {
    return e.id === ListId;
  });

  if (userLists.length) {
    const todo = await Todo.create({
      title,
      text,
      deadline,
      authorId,
      ListId,
      flag,
    });
    return todo;
  }

  return null;
};

export const editTodo = async (
  dataForEdit: EditTodoRequest,
  todoId: number,
  userId: number
) => {
  const todo = await Todo.findByPk(todoId);
  if (todo) {
    // // Get all lists given user
    const user = await User.findByPk(userId, {
      include: {
        model: List,
        as: "lists",
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    });


    let userLists = await isUserHaveListById(user, todo.toJSON().ListId);
    if (userLists.length) {
      // update todo
      await Todo.update(dataForEdit, {
        where: {
          id: todoId,
        },
      });
    }
  }
  return null;
};
