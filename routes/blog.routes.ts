import { Router } from "express";
const router = Router();
import { getAllWithQuery, createBlog } from "../controller/blog.controller";
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

router.get("/", checkTokenPolice(), getAllWithQuery);
router.post(
  "/",
  fileUpload.single("image"),
  [blogCreateValidation],
  createBlog
);

export = router;
