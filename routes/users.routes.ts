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
import { fileUpload } from "../services/FileService";
import rolePolice from "../middlewares/rolePolice";

router.get(
  "/",
  //   rolePolice(),
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
  rolePolice(),
  signin
);
router.get(
  "/:id",
//   rolePolice,
//   [paramsIDValidation, handleValidationError],
  getUserByID
);
router.put(
  "/:id",
  rolePolice,
  [paramsIDValidation, userUpdateValidation, handleValidationError],
  updateUser
);
router.delete(
  "/:id",
  rolePolice,
  [paramsIDValidation, handleValidationError],
  deleteUser
);

export = router;
