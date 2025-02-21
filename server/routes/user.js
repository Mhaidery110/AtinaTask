import userFunctions from "../controller/user.js";
import express from "express";
import verifyToken from "../jwt/jwt.js";


const route = express();

route.post('/register', userFunctions.registerUsser);
route.post('/loginUser', userFunctions.login);
route.get('/all', verifyToken, userFunctions.getAllUsers);
route.put('/changepass', verifyToken, userFunctions.changePassword);



export default route;