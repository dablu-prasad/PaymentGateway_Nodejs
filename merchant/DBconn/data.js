import  {createPool} from 'mysql' 

console.log(process.env.JWT_SECRET)
export const pool = createPool({
    host:'localhost',
    user:'root',
    password:'vinove',
    database:'barterpay',
    connectionLimit:10 
})
