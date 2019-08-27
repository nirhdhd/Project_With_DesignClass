import React, { useEffect } from "react";
import { observer } from "mobx-react";
import "../Styles/Main.css";
import NavBar from "./NavBar";
import InsertItem from "./InsertItem";
import Tables from "./Table";

const Main = props => {
  useEffect(() => {
    (localStorage.getItem("remember") === null &&
      props.main.admin === undefined &&
      GoToLogin()) ||
      props.main.navBar.setSelectedMenu("Admins");
  }, []);

  const GoToLogin = () => {
    props.history.goBack();
  };

  return (
    <React.Fragment>
      <NavBar {...props} />
      <div className="container text-center">
        <h2>{props.main.navBar.selectedMenu} Table</h2>
        <InsertItem {...props} />
        <Tables {...props} />
      </div>
    </React.Fragment>
  );
};

export default observer(Main);
