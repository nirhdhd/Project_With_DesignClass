import { types, flow } from "mobx-state-tree";
import { fetchLogin } from "../Fetch/Service";

export const Login = types
  .model("Login", {
    id: types.maybe(types.string),
    password: types.maybe(types.string),
    remember: false,
    messageError: types.maybeNull(types.string)
  })
  .actions(self => ({
    changeValue: (e, name) => {
      (name === "id" && (self.id = e)) ||
        (name === "password" && (self.password = e));
      if (self.messageError !== null) self.messageError = null;
    },
    changeRemember: () => {
      self.remember = !self.remember;
    },
    exist: flow(function*() {
      let res = yield fetchLogin(self.id, self.password);
      if (res === null) self.messageError = "Wrong input";
      else self.password = undefined;
      return res;
    })
  }));
