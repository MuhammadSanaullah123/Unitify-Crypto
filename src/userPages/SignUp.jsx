import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
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
  console.log(values);
  const handleOpen = () => {
    if (remember === false) {
      setShow(true);
    }
    if (remember === true) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (
      cookies.get("accountArray") &&
      cookies
        .get("accountArray")
        .filter((account) => account.email === values.email).length > 0
    ) {
      alert("Email already exits");
    }
    if (values.pass !== values.conpass) {
      alert("Password do not match");
    } else {
      if (remember) {
        setAccounts([...accounts, values]);
        const temp = [...accounts, values];
        cookies.set("accountArray", temp);
        navigate("/login");
      } else {
        alert("Click Terms and conditions");
      }
    }
  };
  useEffect(() => {
    if (!cookies.get("accountArray")) {
      console.log("he");
      cookies.set("accountArray", accounts);
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "526px",
    height: "158px",
    background: "#fff",
    borderRadius: "6px",
    paddingLeft: "15px",
    display: "flex",
    flexDirection: "column",
  };

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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p className="SignBoxp">Sign up as?</p>
              <div
                style={{
                  width: "77%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignSelf: "center",
                }}
              >
                <Link to="/login">
                  <button className="SignBoxb1">Admin</button>
                </Link>
                <Link to="/login">
                  <button className="SignBoxb2">User</button>
                </Link>
              </div>
            </Box>
          </Modal>
        </div>
        {/*   <p className="mainDivp1">Or login with</p>
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

export default SignUp;
