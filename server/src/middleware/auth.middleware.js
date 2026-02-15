import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {

   try {
     
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if(!token) {
         return res.status(401).json({message: `No token, authorization denied`})
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(decoded.id).select("-password");

      if(!user) {
         return res.status(404).json({message: `User not found`})
      }

      req.user = user;
      next();

   } catch (error) {
      console.log("auth middleware error:", error.message);
      return res.status(401).json({message: `Token is not valid`})
   }

}