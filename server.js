import express from 'express';
import { config } from 'dotenv';
import { connectToDB } from './src/configs/db.js';
import userRouter from './src/router/userRouter.js';
import taskRouter from './src/router/taskRouter.js';
import auth from './src/middleware/auth.js';
import cors from 'cors'
config();

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true
}))

const port = 9095 || process.env.PORT ;
const url = process.env.URL || null

app.get("/home", (req, res) => {
    res.send("this is a home route");
  });

//userRouter
app.use('/user', userRouter);

//taskRouter  task :- task /add /update /delete role base access added from taskRouter
app.use('/task', auth, taskRouter);

app.listen(port, async()=>{
    try {
    await connectToDB(url);
    console.log(`server running on port ${port}`);
    }catch (error) {
      console.log("error while connecting" , error.message);  
    }  
})
