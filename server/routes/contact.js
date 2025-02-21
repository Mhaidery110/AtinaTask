import express from "express";
import contactFunction from "../controller/contact.js"
import verifyToken from "../jwt/jwt.js";


const route = express();

route.post('/createContact', verifyToken, contactFunction.createContact);
route.get('/getDetWithCont', verifyToken, contactFunction.userDetWithContacts);


export default route