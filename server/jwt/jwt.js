import jwt from "jsonwebtoken";

const verifyToken = (  req, res, next )=>{
    const token = req.headers.token
    console.log(token);
    if (!token) {
        return res.status(403).send({ message: "Token is required" });
    }
    jwt.verify(token, process.env.jwt_secret,function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Token invalid" });
        } else {
            req.user = decoded;
            next();
        }
      });
}


export default verifyToken;