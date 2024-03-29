import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'

dotenv.config()

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306 ,
    database: process.env.DB_DATABASE ,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    migrations : [`${__dirname}/migrations/**/*.ts`]
})

export default dataSource