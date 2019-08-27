import React, { useEffect } from "react";
import { observer } from "mobx-react";
import "../Styles/Login.css";

const Login = ({ login, main, history }) => {
  useEffect(() => {
    localStorage.getItem("remember") !== null && GoToMain();
  }, []);

  const HandleSubmit = async e => {
    e.preventDefault();
    const admin = await login.exist();
    if (admin !== null) {
      login.remember && localStorage.setItem("remember", JSON.stringify(admin));
      main.setAdmin(JSON.stringify(admin));
      GoToMain();
    }
  };

  const GoToMain = () => {
    main.admin === undefined && main.setAdmin(localStorage.getItem("remember"));
    history.push({
      pathname: "/Main"
    });
  };

  const HandleValue = e => {
    login.changeValue(e.target.value, e.target.name);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" onSubmit={HandleSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputID"
                    className="form-control"
                    placeholder="ID"
                    name="id"
                    required
                    autoFocus
                    maxLength={10}
                    onChange={HandleValue}
                  />
                  <label htmlFor="inputID">ID</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    required
                    maxLength={20}
                    onChange={HandleValue}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    checked={login.remember}
                    onChange={() => login.changeRemember()}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember password
                  </label>
                </div>
                <p className="messageError">{login.messageError}</p>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Login);
