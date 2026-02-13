import dotenv from "dotenv"
import connectDB from "./src/config/database.js"
import app from "./src/app.js"

dotenv.config();
const startServer = async () => {

   try {
      
      await connectDB();
      app.listen(process.env.PORT, () => {
         console.log(`Server is running at: ${process.env.PORT}`);
      })

   } catch (error) {
      console.log(`Error: ${error}`);
   }

}

startServer();