/* import { User } from "../models/user.model.js";

const register = async (req, res) => {

   try {

      const { username, email, password } = req.body;

      if(!username || !email || !password) {
         return res.status(400).json({message: `All fields are required`})
      }

      const isExisted = await User.findOne({$or: [{email}, {username}]})
      if(isExisted) {
         return res.status(409).json({message: `User with this email or username already exists`})
      }
      const newUser = new User({ username, email, password });

      await newUser.save();

      return res.status(201).json({ message: `User registered successfully` })

   } catch (error) {

      return res.status(400).json({error: error.message});

   }

}

const login = async (req, res) => {

   try {
      
      const {email, password} = req.body;
      if(!email || !password) {
         return res.status(400).json({message: `All fields are required`})
      }

      const user = await User.findOne({email}).select("+password");
      if(!user) {
         return res.status(401).json({message: `Invalid credentials`})
      }

      const isMatch = await user.comparePassword(password);
      if(!isMatch) {
         return res.status(401).json({message: `Invalid credentials`})
      }

      return res.status(200).json({
         message: `Login successful`,
         user: {id: user._id, username: user.username, email: user.email}
      })

   } catch (error) {
      console.log(error);
      return res.status(500).json({message: `Server Error`})
   }

} */

import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {

   try {

      const { username, password, email } = req.body;

      if (!username || !password || !email) {
         return res.status(400).json({ message: `All fields are required` })
      }
      const normalEmail = email.toLowerCase();
      const isExisted = await User.findOne({ $or: [{ email: normalEmail }, { username }] });

      if (isExisted) {
         return res.status(409).json({ message: `User already exists` })
      }

      const newUser = new User({ username, password, email: normalEmail });
      await newUser.save();

      const token = jwt.sign(
         { id: newUser._id },
         process.env.JWT_SECRET,
         { expiresIn: '1d' }
      )

      return res.status(201).json({ message: `registered successfully`,token,
         user: {email: newUser.email, username: newUser.username, id: newUser._id}
       })

   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Server Error` })
   }

}

const login = async (req, res) => {

   try {

      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: `All fields are required` })
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
         return res.status(401).json({ message: `Invalid credentials` })
      }

      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
         return res.status(401).json({ message: `Invalid credentials` })
      }

      const token = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: '1d' }
      )

      return res.status(200).json({ message: `Login successful`, token, user: { id: user._id, email: user.email, username: user.username } })

   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Internal server error` })
   }

}

export { register }
export { login }