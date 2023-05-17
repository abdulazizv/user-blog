import { Request, Response, NextFunction } from "express";
import JwtService from "../services/JwtService";

export default function () {

  return async function (req: Request, res: any, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    
    if (!token) {
      res.status(401).send({message: "вы не авторизованы" });
      return;
    }

    try {
      const decodedData = await JwtService.verifyAccess(token);
      const user = decodedData;

      if(user) {
        return next();
      }
      res.status(403).send({
        message: `You are not authorized`,
      });
    } catch (error) {
      console.log(error)
      res.status(401).send({ message: "Unauthorized" });
    }
  };
}
