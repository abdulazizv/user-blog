import { Schema, checkSchema, ValidationChain } from "express-validator";

const queryPageValidation: Schema = {
  page: {
    in: "query",
    isNumeric: true,
    errorMessage: "Page query must be a number",
  },
};

const paramsIDValidation: Schema = {
  id: {
    in: "params",
    isMongoId: true,
    errorMessage: "Invalid ID",
  },
};

export { queryPageValidation, paramsIDValidation };
