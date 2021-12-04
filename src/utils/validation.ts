import express = require("express");
import { body, check, param, ValidationChain, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const Auth_CHECK = validate([
  body("email").isEmail().normalizeEmail().withMessage("Must be email"),
  body('password', 'The password must be 5+ chars long and contain a number')
    .not()
    .isIn(['12345', 'password', 'qwerty'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5 })
    .matches(/\d/),
]);


export const Todo_Create_CHECK = validate([
  body("title").notEmpty().withMessage("Must be not empty"),
  body("text").notEmpty().withMessage("Must be not empty"),
  body("deadline").notEmpty().withMessage("Must be not empty"),
  body("flag")
  .isIn(['ACTIVE', 'CANCELED', 'FINISHED'])
  .withMessage('flag must be | ACTIVE | CANCELED | FINISHED'),
  param("listId").notEmpty().isInt().toInt().withMessage("listId must be number")
])

export const Todo_Edit_CHECK = validate([
  body("flag")
  .isIn(['ACTIVE', 'CANCELED', 'FINISHED'])
  .withMessage('flag must be | ACTIVE | CANCELED | FINISHED'),
  param("todoId").notEmpty().isInt().toInt().withMessage("todoId must be number")
])


export const List_Create_CHECK = validate([
  body("name").notEmpty().withMessage("Must be not empty"),
])

export const List_Get_CHECK = validate([
  param("listId").notEmpty().isInt().toInt().withMessage("listId must be number")
])

export const List_Patch_CHECK = validate([
  param("listId").notEmpty().isInt().toInt().withMessage("listId must be number"),
  param("userId").notEmpty().isInt().toInt().withMessage("userId must be number")
])