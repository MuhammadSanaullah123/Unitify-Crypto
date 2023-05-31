import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
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
        toast.error("Credentials are wrong!", {
          duration: 3000,
          position: "top-center",
          style: {
            color: "red",
            fontFamily: "Inter",
          },
        });
      }
    } else {
      toast.error("Credentials are empty!", {
        duration: 3000,
        position: "top-center",
        style: {
          color: "red",
          fontFamily: "Inter",
        },
      });
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
    toast.success("Login Success", {
      duration: 2000,
      position: "top-center",
      style: {
        color: "green",
        fontFamily: "Inter",
      },
    });
    let tID = setTimeout(function () {
      window.location.pathname = "/home";

      window.clearTimeout(tID); // clear time out.
    }, 2000);
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
            <Toaster
              toastOptions={{
                style: {
                  border: "1.5px solid",
                  padding: "16px",
                  fontFamily: "Inter",
                },
              }}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
