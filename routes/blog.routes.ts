import { Router } from "express";
const router = Router();
import {
  getAllBlog,
  getblogBId,
  deleteBlog,
  updateBlog,
  createBlog,
} from "../controller/blog.controller";
import {
  blogCreateValidation,
  blogUpdateValidation,
} from "../validations/blog";
import handleValidationError from "../middlewares/handleValidationError";
import {
  paramsIDValidation,
  queryPageValidation,
} from "../validations/commonReqValidators";

import { fileUpload } from "../services/FileService";
import checkTokenPolice from "../middlewares/checkTokenPolice";

router.get("/", checkTokenPolice(), getAllBlog);
router.post(
  "/",
  checkTokenPolice(),
  fileUpload.single("image"),
  [blogCreateValidation],
  createBlog
);
router.get("/:id", checkTokenPolice(), getblogBId);
router.put("/:id",checkTokenPolice(),[blogUpdateValidation,paramsIDValidation],updateBlog);
router.delete("/:id",checkTokenPolice(),paramsIDValidation,deleteBlog);
export = router;
