import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
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
           localStorage.setItem('UserInfo',JSON.stringify({token:res.data.token,name:res.data.name,id:res.data.userid}))
          
           dispatch({type:"LOG_IN" ,payload:{token:res.data.token,name:res.data.name,id:res.data.userid}})
      })
        .catch(function (error) {
          toast.error(getError(error));
        });
    }
  }
 export const Logout=()=>{
   return (dispatch)=>{
     dispatch({type:"LOG_OUT"})
     localStorage.removeItem("UserInfo")
   }
} 