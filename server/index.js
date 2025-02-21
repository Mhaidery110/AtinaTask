import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connection from "./connection.js"
import userRoute from "./routes/user.js"
import contactRoute from "./routes/contact.js"

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
dotenv.config();
app.use(cors());
app.use('/user', userRoute);
app.use('/contact', contactRoute);


const port = process.env.PORT
app.listen(port, ()=>{
    console.log("app is running on", port);
    connection();
})