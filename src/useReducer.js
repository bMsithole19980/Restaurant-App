// useReducer.js
const initialState = {
    role: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          role: action.payload.agreedToTerms ? 'admin' : 'user', // Assuming agreedToTerms determines the role
        };
      case 'LOGOUT':
        return {
          ...state,
          role: null,
        };
      case 'REGISTER':
        return {
          ...state,
          role: action.payload.agreedToTerms ? 'admin' : 'user', // Assuming agreedToTerms determines the role
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  