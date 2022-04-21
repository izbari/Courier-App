import { userActionTypes as types } from "../actions/actionTypes";

const INITIAL_STATE = {
  currentUser: {
    email: "zaferrosh@gmail.com",
    lastName: "Barış",
    name: "Zafer",
    phone: "5053998425",
    tc: "12345678999",
    type: "bireysel",
    uid: "PfAP2bGz1Og8nR6jNqpSf95dlia2",
  },
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return { ...state, currentUser: action.payload, error: null };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case types.LOG_IN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
