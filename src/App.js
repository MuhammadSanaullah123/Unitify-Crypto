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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/termconditions" element={<TermConditions />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
