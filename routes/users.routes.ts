import { Router } from "express";
const router = Router();
import * as User from '../controller/users.controller';
import * as Validator from '../validations/users';
import handleValidationError from '../middlewares/handleValidationError';

