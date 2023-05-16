import { Schema,model } from "mongoose";

const BlogSchema = new Schema(
    {
        content: {type:String},
        image: {type:String},
        publish_date:{type:Date,default:new Date()},
        authorId:{type: Schema.Types.ObjectId, ref:"users"}
    },
    {
        versionKey: false,
        timestamps:true
    }
)

export = model("blogs",BlogSchema);