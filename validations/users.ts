import { checkSchema } from "express-validator";

export const userCreateValidation:any = checkSchema({
    name:{
        isString: {},
        errorMessage: "Name must be a string"
    },
    email: {
        isString: {},
        errorMessage:"Email must be a string"
    },
    password: {
        isString: {},
        errorMessage: "Password must be a string"
    }
})


export const userUpdateValidation:any = checkSchema({
    name:{
        isString: {},
        optional:{},
        errorMessage: "Name must be a string"
    },
    email: {
        isString: {},
        optional:{},
        errorMessage:"Email must be a string"
    },
    password: {
        isString: {},
        optional:{},
        errorMessage: "Password must be a string"
    }
})