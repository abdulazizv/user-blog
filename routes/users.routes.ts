import { Router } from "express";
const router = Router();
import {
  getAll,
  register,
  signin,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controller/users.controller";
import {
  userCreateValidation,
  userUpdateValidation,
} from "../validations/users";
import handleValidationError from "../middlewares/handleValidationError";
import {
  paramsIDValidation,
  queryPageValidation,
} from "../validations/commonReqValidators";
import checkTokenPolice from "../middlewares/checkTokenPolice";
import selfTokenPolice from "../middlewares/selfGuard";

router.get(
  "/",
    checkTokenPolice(),
  getAll
);
router.post(
  "/register",
  [userCreateValidation, handleValidationError],
  register
);
router.post(
  "/signin",
  [userUpdateValidation, handleValidationError],
  signin
);
router.get(
  "/:id",
  checkTokenPolice(),
  [paramsIDValidation, handleValidationError],
  getUserByID
);
router.put(
  "/:id",
  checkTokenPolice(),
  [paramsIDValidation, userUpdateValidation, handleValidationError],
  updateUser
);
router.delete(
  "/:id",
  selfTokenPolice(),
  [paramsIDValidation, handleValidationError],
  deleteUser
);

export = router;
