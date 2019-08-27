import { Login } from "./Login";
import { Main } from "./Main";

const login = Login.create();
const main = Main.create();

export const Store = {
  login,
  main
};
