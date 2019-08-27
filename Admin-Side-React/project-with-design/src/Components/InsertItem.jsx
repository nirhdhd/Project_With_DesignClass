import React from "react";
import { observer } from "mobx-react";
import { Form, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InsertItem = props => {
  const HandleSubmit = e => {
    e.preventDefault();
    props.main.insertItem.addItem(props.main.navBar.selectedMenu);
  };

  return (
    <React.Fragment>
      {(props.main.addItem && (
        <React.Fragment>
          <FontAwesomeIcon
            className="text-danger main-insert-icon"
            title="Cancel"
            icon="minus-circle"
            onClick={() => props.main.setAddItem()}
          />
          <Form onSubmit={HandleSubmit}>
            <Form.Row>
              {props.main.insertItem
                .getProp(props.main.navBar.selectedMenu)
                .map((val, index) => (
                  <Col key={index}>
                    <Form.Control
                      type={(val !== "Password" && "text") || "password"}
                      placeholder={val}
                      name={val}
                      required
                      onChange={e =>
                        props.main.insertItem.changeValue(e.target.value, val)
                      }
                    />
                  </Col>
                ))}
              <button className="btn p-0">
                <FontAwesomeIcon
                  className="text-success main-insert-icon"
                  title="Add"
                  icon="check-circle"
                />
              </button>
            </Form.Row>
          </Form>
          <br />
        </React.Fragment>
      )) || (
        <div className="main-insert-icon">
          <FontAwesomeIcon
            className="text-success "
            title="Add"
            icon="plus-circle"
            onClick={() => props.main.setAddItem()}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default observer(InsertItem);
