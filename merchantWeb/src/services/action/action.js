import axios from "axios";
import jsCookies from "js-cookies";
import { toast } from "react-toastify";
import SetCookies from "../../cookies/setCookies";
import jwt_decode from "jwt-decode";
import { getError } from "../../utils/utils";
import Cookies from 'universal-cookie';
export const login = ({email,password})=>{
  
    return (dispatch)=>{

     axios({
        method: 'post',
        url: '/users/login',
        data: {
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        console.log(res.data);
           localStorage.setItem('UserInfo',JSON.stringify({name:res.data.name}))
          
           dispatch({type:"LOG_IN" ,payload:{token:res.data.token,name:res.data.name,id:res.data.userid}})
      })
        .catch(function (error) {
          toast.error(getError(error));
        });
    }
  }
 export const Logout=()=>{
   return (dispatch)=>{
    axios({
      method: 'get',
      url: `/users/logout`,
    }).then(function (res) {
    })
      .catch(function (error) {
        toast.error(getError(error));
      });

     dispatch({type:"LOG_OUT"})
     localStorage.removeItem("UserInfo")
   }
} 