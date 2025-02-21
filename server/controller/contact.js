import bcrypt from "bcrypt"
import { con } from "../connection.js";


const contactFunction = {

    createContact : (req, res, next)=>{
        try {

            const {fullname, address, contactno, zip, email, created_by} = req.body;

            if( fullname == "" || address == "" || contactno == "" || zip =="" || email == ""  || created_by == ""){
                return res.status(404).send({status: 404, message : "fields are missing"});
            }

            const userQ = `select * from user where email = '${email}'`;
            con.query(userQ, (err, response)=>{
                if(err){
                    return res.status(404).send({status: 404, message : "not found"});
                }else{
                    if(response.length > 0){
                        const contactQ = `Insert into contact (fullname, address, contactno, zip, email, created_by) Values (?,?,?,?,?,?)`;
            const Values = [fullname, address, contactno, zip, email, created_by]
            con.query(contactQ, Values, (err, response)=>{
                if(err){
                    return res.status(400).send({status:400, message:"Bad request"})
                }else{
                    return res.status(201).send({ status: 201, message: "Succesfully created" })
                }
            })
                    }
                }
            })
            
        } catch (error) {
            res.status(500).send({ status: 500, message: error })
        }
  },

  contactDetByUser : (req, res, next)=>{
     try {

         
        
     } catch (error) {
        res.status(500).send({ status: 500, message: error })
     }
  },

  userDetWithContacts : (req, res, next)=>{
    try {
        const {userId} = req.query
        console.log(req.query)
        

        const userQ = `select c.fullname, c.address, u.phone, c.contactno, u.email, c.zip from user u left join contact c on u.email = c.email where u.userId = ${userId}`;

        con.query(userQ, (err, response)=>{
             if(err){
                return res.status(400).send({status:400, message:"Bad request"})
             }else{
                if(response.length > 0){
                    const newRes = response[0];
                 const contact = [newRes.phone, newRes.contactno, newRes.address, newRes.zip, newRes.email]
                 return res.status(200).send({status:200, data: contact, message: "sucess"})
                }
             }
        })
    } catch (error) {
        res.status(500).send({ status: 500, message: error })
    }
  }
}


export default contactFunction