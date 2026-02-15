import express from "express"
import userRouter from "./routes/user.route.js"
import cors from "cors"
const app = express();
app.use(express.json());

app.use(cors({origin: "http://localhost:5173"}))

app.use('/api/v1/users', userRouter)



export default app