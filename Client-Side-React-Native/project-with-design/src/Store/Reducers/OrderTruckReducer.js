import * as Types from "../Actions/Types";

const initialState = {
  wishTrash: 0
};

const OrderTruckReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHANGE_WISH_TRASH:
    case Types.FETCH_WISH_TRASH:
      return {
        wishTrash: action.val
      };
    default:
      return state;
  }
};

export default OrderTruckReducer;
