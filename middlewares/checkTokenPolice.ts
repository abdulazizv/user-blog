import { Request, Response, NextFunction } from "express";
import JwtService from "../services/JwtService";

export default function () {

  return async function (req: Request, res: any, next: NextFunction) {
    const authorization = req.headers.authorization;
    let token;
    if(authorization?.includes("Bearer")) {
      token = authorization.split(" ")[1];
    } else {
      token = authorization;
    }
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
      res.status(401).send({ message: "Unathorized",friendlyMg:error});
    }
  };
}
