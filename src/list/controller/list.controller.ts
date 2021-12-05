import { Router, Request, Response, NextFunction } from "express";
import { verifyToken } from "../../middleware/auth";
import { User, List } from "../../models";
import {
  get_All_Lists_Of_Current_User,
  get_all_todos_from_list_by_Id,
} from "../service/list.service";
import { isUserHaveListById } from "../../utils/isUserHaveListById";
import {
  List_Create_CHECK,
  List_Get_CHECK,
  List_Patch_CHECK,
} from "../../utils/validation";
const router: Router = Router();

export default () => {
  // Create new List with some name //
  router.post(
    "/create",
    [verifyToken],
    List_Create_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const { name } = req.body;
      const list = await List.create({ name });
      const user = await User.findByPk(res.locals.jwtPayload.userId);
      list.addUser(user);
      res.send(list);
    }
  );

  // Get all lists given user //
  router.get(
    "/all",
    [verifyToken],
    async (req: Request, res: Response, _next: NextFunction) => {
      const userList = await get_All_Lists_Of_Current_User(
        res.locals.jwtPayload.userId
      );
      res.send(userList);
    }
  );

  // Get all todos from given List //
  router.get(
    "/:listId",
    List_Get_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const { listId } = req.params;

      const data = await get_all_todos_from_list_by_Id(+listId);

      if (data != null) {
        return res.send(data);
      } else {
        return res.status(500).json({
          message: `Internal Error`,
        });
      }
    }
  );

  // Give access to my list to another user
  router.patch(
    "/access/:listId/:userId",
    [verifyToken],
    List_Patch_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const { listId, userId } = req.params;

      const Userlist = await get_All_Lists_Of_Current_User(
        res.locals.jwtPayload.userId
      );

      // Check if user have this todo in his lists
      let userLists = await isUserHaveListById(Userlist, listId);
      if (userLists.length) {
        const user = await User.findByPk(userId);
        const list = await List.findByPk(listId);
        await list.addUser(user);
        return res.status(200).json({
          message: `User with id=${userId} was successfully added to your list id=${listId}`,
        });
      }

      return res.status(500).json({
        message: `Internal Error`,
      });
    }
  );
  return router;
};
