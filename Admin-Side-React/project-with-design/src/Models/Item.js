import { types, getParent, flow } from "mobx-state-tree";
import { fetchDelete, fetchAdd, fetchUpdate } from "../Fetch/Service";

export const Item = types
  .model("Item", {
    ID: types.maybe(types.string),
    UserName: types.maybe(types.string),
    Name: types.maybe(types.string),
    LastName: types.maybe(types.string),
    Password: types.maybeNull(types.string),
    Longitude: types.maybe(types.string),
    Latitude: types.maybe(types.string),
    CurrentTrash: types.maybe(types.string),
    WishTrash: types.maybe(types.string),
    lastID: types.maybeNull(types.string),
    edit: false
  })
  .actions(self => ({
    changeValue: (e, name) => {
      (name === "ID" && (self.ID = e)) ||
        (name === "UserName" && (self.UserName = e)) ||
        (name === "Password" && (self.Password = e)) ||
        (name === "Name" && (self.Name = e)) ||
        (name === "LastName" && (self.LastName = e)) ||
        (name === "Longitude" && (self.Longitude = e)) ||
        (name === "Latitude" && (self.Latitude = e)) ||
        (name === "CurrentTrash" && (self.CurrentTrash = e)) ||
        (name === "WishTrash" && (self.WishTrash = e));
    },
    setEdit: () => {
      self.edit = !self.edit;
    },
    setLastID: tableName => {
      self.lastID = tableName === "TrashCans" ? self.UserName : self.ID;
    },
    updateItem: flow(function*(tableName) {
      let prop =
        self.ID !== undefined
          ? "ID"
          : self.UserName !== undefined
          ? "UserName"
          : null;
      const url =
        tableName === "Admins"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/UpdateAdmin"
          : tableName === "Drivers"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/UpdateDriver"
          : tableName === "TrashCans"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/UpdateTrashCan"
          : null;
      yield fetchUpdate(self.lastID, self, url, prop, tableName).then(res => {
        if (res === 1) {
          self.setEdit();
        }
      });
    }),
    addItem: tableName => {
      const url =
        tableName === "Admins"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/InsertAdmin"
          : tableName === "Drivers"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/InsertDriver"
          : tableName === "TrashCans"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/InsertTrashCan"
          : null;
      fetchAdd(self, url, tableName).then(res => {
        if (res === 1) {
          self.setLastID(tableName);
          getParent(self, 1).addToList({ ...self });
        }
      });
    }
  }))
  .views(self => ({
    getTH: () => {
      let arr = [];
      for (const key in self) {
        if (self[key] !== undefined && key !== "edit" && key !== "lastID")
          arr.push(key);
      }
      return arr;
    },
    getProp: name => {
      const arr =
        name === "Admins"
          ? ["ID", "Password", "Name", "LastName"]
          : name === "Drivers"
          ? ["ID", "Password", "Name", "LastName", "Longitude", "Latitude"]
          : name === "TrashCans"
          ? [
              "UserName",
              "LastName",
              "Password",
              "Longitude",
              "Latitude",
              "CurrentTrash",
              "WishTrash"
            ]
          : null;
      return arr;
    },
    deleteItem: name => {
      let prop =
        self.ID !== undefined
          ? "ID"
          : self.UserName !== undefined
          ? "UserName"
          : null;
      let id = self[prop];
      const url =
        name === "Admins"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/DeleteAdmin"
          : name === "Drivers"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/DeleteDriver"
          : name === "TrashCans"
          ? "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/DeleteTrashCan"
          : null;
      fetchDelete(id, url, prop).then(res => {
        res === 1 && prop !== null && getParent(self, 2).deleteItem(self);
      });
    }
  }));
