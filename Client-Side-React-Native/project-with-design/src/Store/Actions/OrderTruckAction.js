import * as Types from "./Types";

export const setSliderWishTrashCan = val => {
  return {
    type: Types.CHANGE_WISH_TRASH,
    val
  };
};

export const setWishTrashCan = (userName, wishTrash) => {
  return dispatch =>
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site04/TrashCanService.asmx/UpdateWishTrash",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        body: JSON.stringify({ userName, wishTrash })
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result.d === "1")
          dispatch({
            type: Types.FETCH_WISH_TRASH,
            val: wishTrash
          });
      })
      .catch(err => console.log("err post=", err));
};
