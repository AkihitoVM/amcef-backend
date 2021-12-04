import { User } from "../models";

export const isUserHaveListById = async(Userlist: User,listId: string) => {
  let userLists = (Userlist.toJSON().lists as Array<{ id: number }>).filter(
    (e) => {
      return e.id === parseInt(listId);
    }
  );
  return userLists;
};
