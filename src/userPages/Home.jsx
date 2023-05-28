import React, { useState } from "react";
import { Link } from "react-router-dom";

//assets
//import landingimg from "./../assets/landingimg2.jpg";
import Cookies from "universal-cookie";

//components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Cryptotable from "../components/Cryptotable/Cryptotable";
import ProjectTable from "../components/ProjectTable/ProjectTable";

//mui
import BadgeIcon from "@mui/icons-material/Badge";
import PaidIcon from "@mui/icons-material/Paid";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

//other
import Typed from "react-typed";

const Home = () => {
  const cookies = new Cookies();
  const [projects] = useState(
    cookies.get("projects") ? cookies.get("projects") : ""
  );
  const [option, setOption] = useState(1);
  console.log(projects);
  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="homed1">
          <div className="homed2">
            <Typed
              strings={[
                "NOW TRADE AND BUY CRYPTO.",
                "SEE THE FUTURE WITH OUR CRYPTO PREDICTOR.",
              ]}
              typeSpeed={35}
              backSpeed={40}
              loop
              showCursor={true}
              className="homed1h1"
            />
            <br />
            {/* <Typed
              strings={[`buy crypto currency.`]}
              typeSpeed={30}
              backSpeed={40}
              startDelay={1800}
              loop
              showCursor={true}
              className="homed1h1"
            /> */}
            {/*  <h1 className="homed1h1">
              Now trade <br />
              and buy crypto currency.
            </h1>
            <h1 className="homed1h1">
              See the future <br /> with our crypto currency predictor.
            </h1>
 */}
            <br />
            <br />
            <br />
          </div>
          {/*  <img className="homelandingimg" src={landingimg} alt="" /> */}
        </div>
        <div className="homed3">
          <span className="homes1">
            <h1
              className={option === 1 ? "homed3h1Selected" : "homed3h1"}
              onClick={() => setOption(1)}
            >
              Cryptocurrencies
            </h1>
            <h1 style={{ marginLeft: "10px" }} className="homed3h1">
              {" "}
              /
            </h1>
            <h1
              style={{ marginLeft: "10px" }}
              className={option === 2 ? "homed3h1Selected" : "homed3h1"}
              onClick={() => setOption(2)}
            >
              Projects
            </h1>
          </span>
          {option === 1 ? <Cryptotable /> : <ProjectTable />}
        </div>
        <Link to="/individualproject" className="homeprojectbtn">
          Add Project
        </Link>
        <div className="homed4">
          <h1 className="homed4h1">How to get started</h1>
          <div className="homed5">
            <BadgeIcon className="homed5pic" />
            <div className="homed6">
              <h1 className="homed6h1">State your Identity</h1>
              <p className="homed6p1">
                Complete the identity verification process to secure your
                account and transactions.
              </p>
            </div>
          </div>
          <div className="homed5">
            <PaidIcon className="homed5pic" />
            <div className="homed6">
              <h1 className="homed6h1">Fund your account</h1>
              <p className="homed6p1">
                Add funds to your crypto account to start trading crypto. You
                can add funds with a variety of payment methods.
              </p>
            </div>
          </div>
          <div className="homed5">
            <OnlinePredictionIcon className="homed5pic" />
            <div className="homed6">
              <h1 className="homed6h1">Use Indicators</h1>
              <p className="homed6p1">
                Use our crypto currency predictors to make trading decisions.
              </p>
            </div>
          </div>
          <Link to="/signup" className="homed4btn">
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
