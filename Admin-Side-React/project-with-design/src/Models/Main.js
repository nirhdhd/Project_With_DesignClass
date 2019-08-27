import { types } from "mobx-state-tree";
import { Item } from "./Item";
import { NavBar } from "./NavBar";

export const Main = types
  .model("Main", {
    admin: types.maybe(types.string),
    list: types.maybeNull(types.array(Item)),
    selectedList: types.maybe(types.string),
    search: "",
    navBar: types.optional(NavBar, {}),
    insertItem: types.optional(Item, {}),
    addItem: false
  })
  .actions(self => ({
    setAdmin: val => {
      self.admin = val;
    },
    setList: list => {
      self.list = list;
      self.search = "";
      self.addItem = false;
      self.list.map(val => val.setLastID(self.navBar.selectedMenu));
    },
    addToList: item => {
      self.list.push(item);
      self.addItem = false;
    },
    deleteItem: item => {
      self.list.splice(self.list.indexOf(item), 1);
    },
    setSearch: e => {
      self.search = e;
    },
    setAddItem: () => {
      self.addItem = !self.addItem;
    }
  }))
  .views(self => ({
    getFilteredList: () => {
      return self.list.filter(
        val =>
          (val.ID !== undefined && val.ID.includes(self.search)) ||
          (val.UserName !== undefined && val.UserName.includes(self.search)) ||
          (val.Name !== undefined && val.Name.includes(self.search)) ||
          (val.LastName !== undefined && val.LastName.includes(self.search)) ||
          (val.Longitude !== undefined &&
            val.Longitude.includes(self.search)) ||
          (val.Latitude !== undefined && val.Latitude.includes(self.search))
      );
    }
  }));
