import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./userPages/Login";
import SignUp from "./userPages/SignUp";
import TermConditions from "./userPages/TermsConditions";
import Home from "./userPages/Home";
import IndividualCrypto from "./userPages/IndividualCrypto";
import IndividualProject from "./userPages/IndividualProject";
import FundProject from "./userPages/FundProject";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/termconditions" element={<TermConditions />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/individualcrypto/:cryptoname"
            element={<IndividualCrypto />}
          />
          <Route
            exact
            path="/individualproject"
            element={<IndividualProject />}
          />
          <Route exact path="/fundproject/:id" element={<FundProject />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
