import { Request } from "express";
import Blog from "../models/Blog";
import config from "config";
import Users from "../models/Users";
import ApiError from "../errors/ApiError";

export async function getAllBlog(req: any, res: any) {
  try {
    const page = +req.body.page || 1;
    const itemsPerPage = 20;

    const user = await Blog.find()
      .populate("authorId")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalCount = await Users.countDocuments().exec();

    res.status(200).json({
      records: user,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        totalCount,
      },
    });
  } catch (error) {
    ApiError.internal(res, { message: "Internal server error" });
  }
}

export async function createBlog(req: any, res: any) {
  try {
    let image = req.file.filename;

    const blog = await Blog.create({ ...req.body, image: image });

    res.status(201).send(blog);
  } catch (error) {
    ApiError.internal(res, { message: "Internal server error" });
  }
}

export async function getblogBId(req: any, res: any) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("authorId");
    if (!blog) {
      ApiError.notFound(res, { message: "NotFound blog with id" });
    }
    res.status(200).send(blog);
  } catch (error) {
    ApiError.internal(res, { message: "Internal server error" });
  }
}

export async function updateBlog(req: any, res: any) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id,req.body,{
      new:true
    });
    if(!blog) {
      ApiError.notFound(res,{message:"Error has been detected during change information"})
    };
    res.status(200).send(blog);
  } catch (error) {
    ApiError.internal(res,{message:"Error! Server Error"})
  }
}

export async function deleteBlog(req:any,res: any) {
  try {
    const {id} = req.params;
    const deleted_at = await Blog.findByIdAndDelete(id);
    if(!deleted_at) {
      ApiError.notFound(res,{message:"Error have been detected! ID is not found"})
    }
    res.status(200).json(deleted_at)
  } catch (error) {
      ApiError.internal(res,{message:"Internal server Error"})
  }
}

