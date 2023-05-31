import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
//mui
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Checkbox from "@mui/material/Checkbox";

//assets
import guser from "./../assets/guser.svg";
import namepic from "./../assets/name.svg";
import passwordpic from "./../assets/password.svg";
import EmailIcon from "@mui/icons-material/Email";

const SignUp = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState(
    cookies.get("accountArray") ? cookies.get("accountArray") : []
  );

  const [remember, setRemember] = useState(false);
  const [show] = useState(false);
  const [values, setValues] = useState({
    email: "",
    user: "",
    pass: "",
    conpass: "",
    id: uuid(),
  });

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

  const handleSubmit = () => {
    if (
      cookies.get("accountArray") &&
      cookies
        .get("accountArray")
        .filter((account) => account.email === values.email).length > 0
    ) {
      toast.error("Email already exits", {
        duration: 2000,
        position: "top-center",
        style: {
          color: "#FF0000",
          fontFamily: "Inter",
        },
      });

      return null;
    }
    if (values.pass !== values.conpass) {
      toast.error("Password do not match", {
        duration: 2000,
        position: "top-center",
        style: {
          color: "#FF0000",
          fontFamily: "Inter",
        },
      });

      return null;
    } else {
      if (remember) {
        setAccounts([...accounts, values]);
        const temp = [...accounts, values];
        cookies.set("accountArray", temp);
        toast.success("Login Success", {
          duration: 2000,
          position: "top-center",
          style: {
            color: "green",
            fontFamily: "Inter",
          },
        });
        let tID = setTimeout(function () {
          navigate("/login");

          window.clearTimeout(tID);
        }, 2000);
      } else {
        toast("Read Terms and conditions", {
          duration: 2000,
          position: "top-center",
          style: {
            color: "#FFC000",
            fontFamily: "Inter",
          },
          icon: <PriorityHighIcon />,

          iconTheme: {
            primary: "#FFC000	",
            secondary: "#FFC000	",
          },
        });

        return null;
      }
    }
  };
  useEffect(() => {
    if (!cookies.get("accountArray")) {
      cookies.set("accountArray", accounts);
    }
  }, []);

  return (
    <>
      <div
        style={{
          padding: "50px 0 100px 0",
        }}
        className="mainsignupDiv"
      >
        <div className="bigDivS">
          <div className="circleDiv">
            <div className="circleDiv2">
              <img className="circleDiv2pic" src={guser} alt="" />
            </div>
          </div>
          <div className="smallDivS">
            <div className="input-container">
              <i className="inputimgback">
                <EmailIcon className="inputimg" />
                {/*  <img className="inputimg" src={namepic} alt="" /> */}
              </i>
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
            </div>

            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={namepic} alt="" />
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
            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={passwordpic} alt="" />
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Confirm Password"
                name="conpass"
                value={values.conpass}
                onChange={handleInput}
              />
            </div>
            <div className="check-container">
              <div style={{ display: "flex" }}>
                <Checkbox
                  className="form-check-input"
                  checked={remember}
                  onChange={handleRemember}
                />

                <span className="checkpS">
                  Agree to
                  <Link
                    to="/termconditions"
                    style={{
                      color: "#00B4FF",
                      textDecoration: "underline",
                      fontWeight: "700",
                      margin: "0px 0px 0px 5px",
                    }}
                  >
                    Terms and Condition!
                  </Link>{" "}
                </span>
              </div>
              <Link to="/login" className="checkp2">
                Login
              </Link>
            </div>
            <p
              style={{
                display: `${show && !remember ? "flex" : "none"}`,
              }}
              className="smallDivp"
            >
              Kindly check the checkbox!
            </p>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <button onClick={handleSubmit} className="btn1">
            Sign up
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
        </div>
      </div>
    </>
  );
};

export default SignUp;
