import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
//mui
import Checkbox from "@mui/material/Checkbox";
//assets
import guser from "./../assets/guser.svg";
import userpic from "./../assets/user.svg";
import passwordpic from "./../assets/password.svg";

const Login = () => {
  const cookies = new Cookies();

  const [accounts] = useState(
    cookies.get("accountArray") ? cookies.get("accountArray") : []
  );

  const [values, setValues] = useState({
    user: "",
    pass: "",
  });
  const [remember, setRemember] = useState(false);
  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };
  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleLogin = () => {
    if (values.pass && values.user) {
      const fitlered_accounts = accounts.filter(
        (account) =>
          account.user === values.user && account.pass === values.pass
      );

      if (fitlered_accounts.length > 0) {
        handleNavigate();
      } else {
        alert("Credentials are wrong!");
      }
    } else {
      alert("Credentials are empty!");
    }
  };
  const handleNavigate = () => {
    cookies.set(
      "loggedinuser",
      accounts.filter(
        (account) =>
          account.user === values.user && account.pass === values.pass
      )
    );
    window.location.pathname = "/home";
  };

  return (
    <>
      <div className="mainloginDiv">
        <div className="bigDiv">
          <div className="circleDiv">
            <div className="circleDiv2">
              <img className="circleDiv2pic" src={guser} alt="" />
            </div>
          </div>
          <div className="smallDiv">
            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={userpic} alt="" />
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Username"
                name="user"
                value={values.user}
                onChange={handleInput}
              />
            </div>
            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={passwordpic} alt="" />
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Password"
                name="pass"
                value={values.pass}
                onChange={handleInput}
              />
            </div>
            <div className="check-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  visibility: "hidden",
                }}
              >
                <Checkbox
                  className="form-check-input"
                  checked={remember}
                  onChange={handleRemember}
                />

                <p className="checkp">Remember me!</p>
                <div></div>
              </div>
              <Link to="/signup" className="checkp2">
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <Link className="l1">
            <button onClick={handleLogin} className="btn1">
              Login
            </button>
          </Link>
        </div>
        {/*    <p className="mainDivp1">Or login with</p>
        <div className="mainimgDiv">
          <div style={{ background: "#C54238" }} className="imgDiv">
            <img className="endimg" src={google} alt="" />
          </div>
          <div style={{ background: "#2F4D93" }} className="imgDiv">
            <img className="endimg" src={fb} alt="" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
