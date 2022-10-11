import Cookies from 'js-cookies';

const RemoveCookies =(cookiename)=>{
  return Cookies.remove(cookiename);
};

export default RemoveCookies;