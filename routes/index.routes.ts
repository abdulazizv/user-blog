import { Router } from "express";

import UserRouter from "../routes/users.routes";
import BlogRouter from "../routes/blog.routes";

const router = Router();
router.use("/users",UserRouter);
router.use("/blog",BlogRouter);
export default router;
