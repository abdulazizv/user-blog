import { Request } from "express";
import Blog from "../models/Blog";
import config from 'config';
import Users from "../models/Users";
import ApiError from "../errors/ApiError";

export async function getAllWithQuery(req: any, res: any) {
    try {
      const page = +req.body.page || 1;
      const itemsPerPage = 20;
  
      const user = await Blog.find().populate("authorId")
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
  
      const totalCount = await Users.countDocuments().exec();
  
      res.status(200).json({
        records: user,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / itemsPerPage),
          totalCount,
        }
    });
    } catch (error) {
       ApiError.internal(res,{message:"Internal server error"})
     
    }
}

export async function createBlog(req:any,res: any){
  try {
    let image = req.file.filename;

    const blog = await Blog.create({...req.body,image:image});
    
    res.status(201).send(blog)
  } catch (error) {
    ApiError.internal(res,{message:"Internal server error"})
  }
}
  
