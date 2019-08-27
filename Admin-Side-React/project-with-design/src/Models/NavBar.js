import { types, flow, getParent } from "mobx-state-tree";
import { fetchList } from "../Fetch/Service";

export const NavBar = types
  .model("NavBar", {
    selectedMenu: types.maybe(types.string)
  })
  .actions(self => ({
    setSelectedMenu: flow(function*(name) {
      self.selectedMenu = name;
      let url =
        name === "Admins"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/AdminsList"
          : name === "Drivers"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/DriversList"
          : name === "TrashCans"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/TrashCansList"
          : null;
      getParent(self, 1).setList(yield fetchList(url));
    })
  }));
