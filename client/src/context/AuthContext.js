import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = { // before login, define variables we are keeping track of
    user:JSON.parse(localStorage.getItem("user")) || null,
    // user: null,
    isFetching:false,
    error: false,
    authenticated: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

    return(
        <AuthContext.Provider value={{user:state.user, isFetching: state.isFetching, error: state.error, 
                                        authenticated:state.authenticated, dispatch}}> 
            {children}
        </AuthContext.Provider>
    )
}   