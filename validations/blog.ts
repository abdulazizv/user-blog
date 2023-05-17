import {checkSchema} from 'express-validator';

export const blogCreateValidation: any = checkSchema({
    content:{
        isString:{},
        errorMessage: "Content need to be string"
    },
    authorId:{
        isMongoId:{},
        errorMessage:"AuthorID need to be real MongoID"
    }
})

export const blogUpdateValidation:any = checkSchema({
    content:{
        isString:{},
        optional:{},
        errorMessage:"Content need to be string"
    },
    authorId:{
        isMongoId:{},
        optional:{},
        errorMessage:"Author_id is need to ber real MongoId"
    }
})