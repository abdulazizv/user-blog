import { checkSchema } from "express-validator";

const userCreateValidation = checkSchema({
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


const userUpdateValidation = checkSchema({
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

exports = {
    userCreateValidation,
    userUpdateValidation
}