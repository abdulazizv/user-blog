import { Schema,model } from "mongoose";

const UserSchema = new Schema(
    {
        name:{type:String},
        password:{type:String},
        email:{type:String},
        token:{type:String}
    },
    {
        versionKey:false,
        timestamps:true
    }
)
export = model("users",UserSchema)