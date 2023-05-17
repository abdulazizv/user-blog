import jwt from '../services/JwtService';
import ApiError from '../errors/ApiError';
import * as bcrypt from 'bcrypt';
import Users from '../models/Users';
import config from 'config';

async function getAll(req: any,res: any) {
    try {
        const {page} = req.body || 1;
        const itemsPerPage = 20;

        const users = await Users.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);

        const totalCount = await Users.countDocuments().exec();

        res.status(200).json({
            records: users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / itemsPerPage),
                totalCount
            }
        })
    } catch (error) {
        ApiError.internal(res,{message:"Server error"})
    }
}

async function register(req: any, res: any) {
    try {
      const {name,password,email} = req.body;
      const hashedPassword = bcrypt.hashSync(password, 7);
  
      const user = await Users.create({
        name:name,
        password:hashedPassword,
        email:email
      });
  
      const payload = {
        id: user._id,
        email:email
      };
  
      const tokens = jwt.generateTokens(payload);
      const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
      user.token = hashed_token;
  
      await user.save();
  
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: config.get("refresh_token_ms"),
        httpOnly: true,
      });
  
      res.status(200).json({token: tokens.accessToken, staff: payload });
    } catch (error) {
      ApiError.internal(res, { message:  "Server Error" });
    }
}

async function signin(req:any, res:any) {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email });
  
      if (!user) {
        return ApiError.badRequest(res, { message: "You are not an active" });
      }
      let comparePassword;
      if(user.password !== undefined){
         comparePassword = bcrypt.compareSync(password,user.password);
      }
  
      if (!comparePassword) {
        return ApiError.badRequest(res, {
          message: "Login or password wrong",
        });
      }
  
      const payload = {
        id: user._id,
        role: user.email
      };
  
      const tokens = jwt.generateTokens(payload);
      const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
      user.token = hashed_token;
  
      await user.save();
  
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: config.get("refresh_token_ms"),
        httpOnly: true,
      });
  
      res.status(200).send({ token: tokens.accessToken, staff: payload });
    } catch (error) {
      ApiError.internal(res, { message: "Server Error" });
    }
}

async function getUserByID(req:any,res:any) {
    try {
        const user = await Users.findById(req.params.id);

        if(!user) {
            return ApiError.notFound(res,{message:"NOT found user"});
        }

        res.status(200).send(user);

    } catch (error) {
        ApiError.internal(res,{message: "Internal Server error"})        
    }
}

async function deleteUser(req: any,res: any) {
    try {
        const isDelete = await Users.findByIdAndDelete(req.params.id);
        if (!isDelete) {
            ApiError.notFound(res,{message:"NOT found with ID"})
        }
        res.status(200).send({
            message:"Successfully deleted",
            userId: isDelete?._id
        })
    } catch (error) {
        ApiError.internal(res,{message:"Internal server error"});
    }
}

async function updateUser(req:any,res:any) {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        });
        if (!user) {
            return ApiError.notFound(res,{message:"NOT Found with ID"});
        }
        res.status(200).send(user);
    } catch (error) {
        ApiError.internal(res,{message:"Internal server error"});
    }
}

exports = {
    getAll,
    register,
    signin,
    getUserByID,
    deleteUser,
    updateUser
}