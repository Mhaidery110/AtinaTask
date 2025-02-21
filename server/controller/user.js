
import bcrypt from "bcrypt"
import { con } from "../connection.js";
import jwt from "jsonwebtoken";


const userFunctions = {

    registerUsser: async (req, res, next) => {
        try {

            const { firstname, lastname, username, password, email, phone, profile_pic } = req.body;


            if (firstname == "" || lastname == "" || username == "" || password == "" || email == "" || phone == "") {
                return res.status(400).send({ status: 400, message: "All fields are required" })
            }

            const userQ = `select * from task.user where email ='${email}'`;

            con.query(userQ, (err,  response )=>{
                if(err){
                    console.log(err)
                }else{
                    if(response.length>0){
                        return res.status(400).send({ status: 400, messsage: `${email} already exist` })
                    }
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(password, salt);

                    const createUserQ = `Insert into user (firstname, lastname, username, password, email, phone, profile_pic) Values (?,?,?,?,?,?,?)`;
                    const Values = [firstname, lastname, username, hash, email, phone, ""]

                    con.query(createUserQ, Values, (err, response)=>{
                         if(err){
                              return res.status(400).send({status:400, message:"Bad request"})
                         }else{
                   return   res.status(201).send({ status: 201, message: "Succesfully created" })
                         }
                    })


                }
            })
          
                } catch (error) {
                    res.status(500).send({ status: 500, message: error })
                }

            },

    login : async (req, res, next)=>{

        try {

            const {username, password} = req.body;
            console.log(req.body)
            

            if(username == "" || password ==""){
                return res.status(400).send({status:400, message : "Fields are missing"});
            }


            const usersQ = `select * from user where username = '${username}'`;
            con.query(usersQ, (err, response)=>{
                if(err){
                    return res.status(400).send({status:400, message:"Bad request"})
                }else{
                    if(response.length > 0){
                       console.log(response);
                       const mainpass = response && response[0] && response[0].password;
                       console.log(mainpass);
                       
                       const correct = bcrypt.compareSync(password, mainpass);
                       console.log(correct);

                        if (correct) {
                            const token = jwt.sign({
                                data: response[0].username
                            }, process.env.jwt_secret, { expiresIn: "1h" })
                            return res.status(200).send({ status: 200, message: "success", data: response[0], token: token })
                        }
                       
                    }
                }
            })
        } catch (error) {
            res.status(500).send({ status: 500, message: error })
        }
    },

    getAllUsers : async (req, res, next)=>{
        try {
            const token = req.headers
            
            const usersQ = `select * from user`;
            con.query(usersQ, (err, response)=>{
               if(err){
                return res.status(500).send({status:500, message: "something went wrong"})
               }else{
                return res.status(200).send({status:200, message:"success", data:response})
               }
            })
        } catch (error) {
            res.status(500).send({ status: 500, message: error })
        }
    },

    changePassword : async (req, res, next)=>{
        try {
          const {prePass, newPass } = req.body;
          const searchQ = `select * from user where password = '${prePass}'`;
          con.query(searchQ, (err, response)=>{
             if(err){
                return res.status(400).send({status: 400, message: "Bad request"})
             }else{
                if(response.length > 0){
                    const updatePasswordQ = `update user set password = '${newPass} where username = '${username}'`;
                    con.query(updatePasswordQ, (err, response)=>{
                       if(err){
                        return res.status(400).send({status:400, message:"Bad resuest"})
                       }else{
                        return res.status(201).send({status: 201, message: "updated succesfully"})
                       }
                    })

                }else{
                    return res.status(404).send({status: 404, message: "Invalid Password"})
                }
             }
          })
            
            
        } catch (error) {
            res.status(500).send({ status: 500, message: error })
        }
    }

}


export default userFunctions;
