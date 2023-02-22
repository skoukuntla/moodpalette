const AuthReducer = (state, action) => { // depending on action,, reducer will update state
    switch (action.type) {

      case "LOGIN_START":
        return { 
          user: null,
          isFetching: true,
          error: false,
          authenticated: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
          authenticated: true,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
          authenticated: false,
        };

        case "LOGOUT":
          return {
            user: null,
            isFetching: false,
            error: false,
            authenticated:false
                  
          };
  
      default:
        return state;
    }
  };
  
  export default AuthReducer;