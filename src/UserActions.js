export const login = (userData) => async (dispatch) => {
    try {

      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      alert('Successfully logged in');
    } catch (error) {
      console.error(error);
    }
  };
  export const register = (userData) => async (dispatch) => {
    try {

  
      dispatch({
        type: 'REGISTER',
        payload: userData,
      });
  
      alert('Successfully registered');
    } catch (error) {
      console.error(error);
    }
  };
  