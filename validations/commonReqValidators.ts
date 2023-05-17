import { Schema, checkSchema, ValidationChain } from "express-validator";

const queryPageValidation: any = checkSchema({
  page: {
    in: "query",
    isNumeric: true,
    errorMessage: "Page query must be a number",
  },
})

const paramsIDValidation: any = checkSchema({
  id: {
    in: "params",
    isMongoId: true,
    errorMessage: "Invalid ID",
  },
});

export { queryPageValidation, paramsIDValidation };
