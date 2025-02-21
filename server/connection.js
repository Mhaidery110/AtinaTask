import mysql from "mysql"

var con =  mysql.createConnection({
    database: "task",
    host: "localhost",
    user: "root",
    password: "",
  });

const connection = async () =>{
     
    con.connect(function(err) {
    if (err) {
      console.log("error occurred while connecting");
  } else {
      console.log("connection created with mysql successfully");
  }
  });

}


export default connection
export {con}

