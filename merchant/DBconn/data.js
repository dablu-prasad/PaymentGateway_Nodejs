import  {createPool} from 'mysql' 

export const pool = createPool({
    host:'localhost',
    user:'root',
    password:'vinove',
    database:'barterpay',
    connectionLimit:10 
})
