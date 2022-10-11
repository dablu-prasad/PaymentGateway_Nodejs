import Cookies from 'js-cookies';

const SetCookies =(cookiename,usrin)=>{
    Cookies.set(cookiename,usrin);
};

export default SetCookies;