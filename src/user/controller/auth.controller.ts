import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { registerUser, loginUser } from "../service/auth.service";
import { CreateUserInput, LoginUserInput } from "../dto";
import { Auth_CHECK } from "../../utils/validation";
const router: Router = Router();

export default () => {
  // ROUTER FOR REGISTER //
  router.post(
    "/signup",Auth_CHECK,
    async (req: Request, res: Response, _next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      
      const created = await registerUser(req.body as CreateUserInput);
      if (!created) {
        res.status(403).json("User already exist");
      } else {
        res.status(200).json("Successfully registered!");
      }
    }
  );

  // ROUTER FOR LOGIN //
  router.post(
    "/signin",Auth_CHECK,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await loginUser(req.body as LoginUserInput);
      res.status(200).json(response);
    }
  );
  return router;
};
