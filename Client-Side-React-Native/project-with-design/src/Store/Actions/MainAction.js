import * as Types from "./Types";

export const openModal = () => ({
  type: Types.OPEN_MODAL
});

export const closeModal = () => ({
  type: Types.CLOSE_MODAL
});

export const setTrashCan = userName => {
  return dispatch =>
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site04/TrashCanService.asmx/TrashCan",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        body: JSON.stringify({ userName })
      }
    )
      .then(res => res.json())
      .then(result =>
        dispatch({
          type: Types.TRASH_CAN_DETAILS,
          trashCan: JSON.parse(result.d)
        })
      )
      .catch(err => console.log("err post=", err));
};

export const setDriver = id => {
  return dispatch =>
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site04/DriverService.asmx/Driver",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        body: JSON.stringify({ id })
      }
    )
      .then(res => res.json())
      .then(result =>
        dispatch({
          type: Types.DRIVER_DETAILS,
          driver: JSON.parse(result.d)
        })
      )
      .catch(err => console.log("err post=", err));
};
