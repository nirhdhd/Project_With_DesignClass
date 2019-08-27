import * as Types from "./Types";

export const setUserName = val => ({
  type: Types.CHANGE_USER_NAME,
  value: val
});

export const setPassword = val => ({
  type: Types.CHANGE_PASSWORD,
  value: val
});

export const openModal = () => ({
  type: Types.OPEN_MODAL
});

export const closeModal = () => ({
  type: Types.CLOSE_MODAL
});

export const login = (userName, password) => {
  return dispatch =>
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site04/TrashCanService.asmx/Login",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        body: JSON.stringify({ userName, password })
      }
    )
      .then(res => res.json())
      .then(result =>
        dispatch({
          type: Types.EXIST_USER,
          existUser: result.d
        })
      )
      .catch(err => console.log("err post=", err));
};
