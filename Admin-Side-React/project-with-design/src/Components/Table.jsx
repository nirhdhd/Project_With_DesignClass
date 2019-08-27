import React from "react";
import { Table } from "react-bootstrap";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";

const Tables = props => {
  const HandleDelete = item => {
    item.deleteItem(props.main.navBar.selectedMenu);
  };

  const HandleSaveEdit = item => async e => {
    e.preventDefault();
    await item.updateItem(props.main.navBar.selectedMenu);
  };

  const HandleReset = item => {
    props.main.navBar.setSelectedMenu(props.main.navBar.selectedMenu);
  };

  return (
    <React.Fragment>
      <input
        className="w-50"
        type="search"
        value={props.main.search}
        onChange={e => props.main.setSearch(e.target.value)}
        placeholder={`Search ${props.main.navBar.selectedMenu}`}
      />
      <Table responsive>
        <thead>
          <tr>
            {props.main.list !== null && props.main.list.length > 0 && (
              <React.Fragment>
                <th colSpan={2}>
                  <FontAwesomeIcon icon="cogs" /> Options
                </th>
                {props.main.list[0]
                  .getProp(props.main.navBar.selectedMenu)
                  .map((val, index) => <th key={index}>{val}</th>) || (
                  <th>Empty List</th>
                )}
              </React.Fragment>
            )}
          </tr>
        </thead>
        <tbody>
          {props.main.list !== null &&
            props.main.getFilteredList().map((item, index) => (
              <tr key={index}>
                {(item.edit && (
                  <React.Fragment>
                    <td>
                      <button form={`editForm${index}`} className="btn p-0">
                        <FontAwesomeIcon
                          className="text-success"
                          icon="check"
                          title="Save"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        type="reset"
                        form={`editForm${index}`}
                        className="btn p-0"
                      >
                        <FontAwesomeIcon
                          className="text-warning"
                          icon="times"
                          title="Cancel"
                        />
                      </button>
                    </td>
                  </React.Fragment>
                )) || (
                  <React.Fragment>
                    <td>
                      <FontAwesomeIcon
                        className="text-light"
                        icon="edit"
                        title="Edit"
                        onClick={() => item.setEdit()}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="text-danger"
                        icon="trash-alt"
                        title="Delete"
                        onClick={() => HandleDelete(item)}
                      />
                    </td>
                  </React.Fragment>
                )}
                <td hidden>
                  <Form
                    id={`editForm${index}`}
                    onSubmit={HandleSaveEdit(item)}
                    onReset={() => HandleReset(item)}
                  />
                </td>
                {props.main.list[0]
                  .getProp(props.main.navBar.selectedMenu)
                  .map((val, inputIndex) => (
                    <td key={inputIndex}>
                      {(item.edit && (
                        <Form.Control
                          className="text-center"
                          value={
                            (val === "Password" && item.changeValue("", val)) ||
                            item[val]
                          }
                          name={val}
                          form={`editForm${index}`}
                          onChange={e => item.changeValue(e.target.value, val)}
                        />
                      )) ||
                        ((val === "Password" && "*******") || item[val])}
                      {console.log(item[val])}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default observer(Tables);
