import * as Types from "../Actions/Types";

const initialState = {
  userName: "",
  password: "",
  modal: false,
  existUser: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHANGE_USER_NAME:
      return {
        ...state,
        userName: action.value
      };
    case Types.CHANGE_PASSWORD:
      return {
        ...state,
        password: action.value
      };
    case Types.OPEN_MODAL:
      return {
        ...state,
        modal: true
      };
    case Types.CLOSE_MODAL:
      return {
        ...state,
        modal: false
      };
    case Types.EXIST_USER:
      return {
        ...state,
        existUser: action.existUser
      };
    default:
      return state;
  }
};

export default LoginReducer;
