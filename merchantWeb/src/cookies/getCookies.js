import Cookies from 'js-cookies';

const GetCookies =(cookiename)=>{
   return Cookies.get(cookiename);
};

export default GetCookies;