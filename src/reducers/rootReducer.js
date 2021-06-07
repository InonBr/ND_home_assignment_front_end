/**
 * this reducer will sore the state of the app:
 * logedin -> will chack if there is a connected user.
 */

const initialState = { logedin: false };

const rootReducer = (state = initialState, action) => {
  const changeState = { ...state };

  switch (action.type) {
    case 'login':
      changeState.logedin = true;
      return changeState;

    case 'logout':
      changeState.logedin = false;
      return changeState;

    default:
      return { logedin: false };
  }
};

export default rootReducer;
