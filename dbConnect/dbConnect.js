import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()



export default function dbConnect  () {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_ROOT_PASSWORD,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,

    })

    connection.connect((error) =>{
        if(error){
            console.log("Can't connect");
            process.exit(1)
        }
        console.log("SQL database connected");
    })

    connection.on('error',(error) =>{
        console.log('error', error);
        process.exit(1)

    })

    return connection

}

export const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT_PASSWORD,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,

})
