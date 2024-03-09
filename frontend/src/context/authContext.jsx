  import {createContext , useReducer , useEffect} from 'react'


  export const AuthContext = createContext();

  const initialState = {
    user: null,
  }

  const authReducer = (state, action) => {
     switch (action.type) {
         case 'LOGIN':
             return { user: action.payload}
         case 'LOGOUT':
             return { user: null }

         default:
             return state

     }
  }
  export const AuthProvider = ({ children }) => {
    const [state , dispatch] = useReducer(authReducer , initialState);

// check for token in localstorage and updating authContext for persistence. This makes the login state to remain after refresh.

      useEffect(()=>{
          const user = JSON.parse(localStorage.getItem('user'));
          if(user){
              dispatch({ type:'LOGIN' , payload: user})
          }
      } ,[])

    return (<AuthContext.Provider value={{...state , dispatch}}>
        {children}
    </AuthContext.Provider>)
  }