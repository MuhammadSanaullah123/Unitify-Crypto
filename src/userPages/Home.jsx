import React from "react";
import { Link } from "react-router-dom";

//assets
//import landingimg from "./../assets/landingimg2.jpg";

//components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Cryptotable from "../components/Cryptotable/Cryptotable";

//mui
import BadgeIcon from "@mui/icons-material/Badge";
import PaidIcon from "@mui/icons-material/Paid";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

//other

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="homed1">
          <div className="homed2">
            <h1 className="homed1h1">
              Now trade <br />
              and buy crypto currency.
            </h1>
            <h1 className="homed1h1">
              See the future <br /> with our crypto currency predictor.
            </h1>

            <br />
            <br />
            <br />
          </div>
          {/*  <img className="homelandingimg" src={landingimg} alt="" /> */}
        </div>
        <div className="homed3">
          <h1 className="homed3h1">Popular Cryptocurrencies</h1>
          <Cryptotable />
        </div>
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
