import * as Types from "../Actions/Types";

const initialState = {
  trashCan: {},
  modal: false,
  driver: {}
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TRASH_CAN_DETAILS:
      return {
        ...state,
        trashCan: action.trashCan
      };
    case Types.DRIVER_DETAILS:
      return {
        ...state,
        driver: action.driver
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
    default:
      return state;
  }
};

export default MainReducer;
