import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema(

   {

      username: {

         type: String,
         minlength: [4, `username must be atleast 4 characters long`],
         maxlength: [64, `character length exceeded`],
         required: [true, `Username is required`],
         unique: true,
         trim: true,
         index: true

      },

      email: {

         type: String,
         required: [true, `Email is required`],
         unique: true,
         trim: true,
         lowercase: true,
         match: [/^\S+@\S+\.\S+$/, `Please enter a valid email`],
         index: true
         
      },

      password: {

         type: String,
         required: [true, `Password is required`],
         trim: true,
         minlength: [8, `Password must be 8 characters long`],
         select: false,
         match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, `Password is too weak`],

      },


   },

   {
      timestamps: true
   }

);


userSchema.pre("save", async function (next) {

   if(!this.isModified('password')) return next();

   try {
      
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();

   } catch (error) {
      next(error);
   }

});

userSchema.methods.comparePassword = async function (candidatePassword) {

   return await bcrypt.compare(candidatePassword, this.password);

}


export const User = mongoose.model('User', userSchema);