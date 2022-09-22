const initialState = {
    userInfo:localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):null,
  };

  export function USER(state = initialState, action) { 
    switch (action.type) {
        case "LOG_IN":

            return{
                      ...state,userInfo:action.payload
            }        
            case "LOG_OUT":
        
              return{
                        ...state,userInfo:null
              }
        default:
            return state;
    }
  }