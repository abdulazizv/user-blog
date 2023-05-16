import { Request } from "express";
import Blog from "../models/Blog";
import * as jwt from "../services/JwtService";
const bcrypt = require("bcrpyt");
import config from 'config';
import Users from "../models/Users";

async function getAll(req: any, res: any) {
    try {
      const page = +req.query.page || 1;
      const itemsPerPage = 10;
  
      const user = await Users.find()
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
        res.status(502).send({
            message:"Internal server error"
        })
     
    }
}


  