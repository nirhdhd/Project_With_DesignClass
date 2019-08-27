import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { observer } from "mobx-react";

const NavBar = props => {
  const HandleSelect = e => {
    props.main.navBar.setSelectedMenu(e);
  };

  const HandleLogout = () => {
    localStorage.removeItem("remember");
    props.history.goBack();
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand>Mr. Bin</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav onSelect={HandleSelect} className="mr-auto">
          <Nav.Link eventKey="Admins">Admins</Nav.Link>
          <Nav.Link eventKey="Drivers">Drivers</Nav.Link>
          <Nav.Link eventKey="TrashCans">Trash Cans</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={HandleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default observer(NavBar);
