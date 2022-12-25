import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//other
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//assets
import btc from "./../assets/btc.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IndividualCrypto = () => {
  const [view, setView] = useState("month");
  const [dates] = useState([]);
  const [values, setValues] = useState({
    currentcoin: "",
    unity: "",
  });
  const [open, setOpen] = useState(false);
  const [crypto1, setCrypto1] = useState("");
  const [crypto2, setCrypto2] = useState("");

  const handleChange1 = (event) => {
    setCrypto1(event.target.value);
  };
  const handleChange2 = (event) => {
    setCrypto2(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleDate = () => {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < numDaysInMonth; i++) {
      dates[i] = i + 1;
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxWidth: "520px",
    height: "300px",
    background: "#ffffff",
    borderRadius: "6px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels:
      view === "hour"
        ? [
            "12:00 AM",
            "1:00 AM",
            "2:00 AM",
            "3:00 AM",
            "4:00 AM",
            "5:00 AM",
            "6:00 AM",
            "7:00 AM",
            "8:00 AM",
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "1:00 PM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM",
            "5:00 PM",
            "6:00 PM",
            "7:00 PM",
            "8:00 PM",
            "9:00 PM",
            "10:00 PM",
            "11:00 PM",
          ]
        : view === "month"
        ? [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
        : view === "day"
        ? dates
        : "",
    datasets: [
      {
        label: "Dataset 1",
        data: [
          20, 30, 40, 25, 15, 16, 20, 60, 10, 20, 30, 40, 25, 15, 16, 20, 60,
          10, 20, 30, 40, 25, 15, 70, 100, 45, 17, 50, 23, 70, 100, 25,
        ],
        borderColor: "#00b4ff",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const OtherCrypto = ({ name, price, change }) => {
    return (
      <Link to="/individualcrypto" style={{ textDecoration: "none" }}>
        <div className="othercrypto">
          <span className="othercryptos1">
            <img className="othercryptos1pic" src={btc} alt="" />
            <p className="othercryptos1p1">{name}</p>
          </span>
          <span className="othercryptos2">
            <p className="othercryptos2p1">{price}</p>
            <p
              style={{
                color: `${change.slice(0, 1) === "-" ? "red" : "green"}`,
              }}
              className="othercryptos2p2"
            >
              {change}
            </p>
          </span>
        </div>
      </Link>
    );
  };

  useEffect(() => {
    handleDate();
  });

  return (
    <>
      <Navbar />
      <div className="individualcrypto">
        <span className="individualcryptos1">
          <img className="individualcryptopic" src={btc} alt="" />
          <h1 className="individualcryptoh1">Bitcoin (BTC) Price</h1>
        </span>
        <div className="individualcryptod1">
          <div className="individualcryptod">
            <span className="individualcryptos1">
              <h1 className="individualcryptoh2">$ 10,000</h1>
              <p className="individualcryptop1">-2.5%</p>
            </span>

            <div className="individualcryptograph">
              <span className="individualcryptographs1">
                <p
                  onClick={() => setView("hour")}
                  style={{
                    color: `${view === "hour" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Hour
                </p>
                <p
                  onClick={() => setView("day")}
                  style={{
                    color: `${view === "day" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Day
                </p>
                <p
                  onClick={() => setView("month")}
                  style={{
                    color: `${view === "month" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Month
                </p>
              </span>

              <Line options={options} data={data} />
            </div>
          </div>

          <div className="individualcryptod3">
            <div className="individualcryptod3con">
              <h1 className="individualcryptod3h1">Conversion</h1>

              <FormControl className="individualcryptodropdown" fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  value={crypto1}
                  label="Crypto1"
                  onChange={handleChange1}
                >
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="BNB">BNB</MenuItem>
                  <MenuItem value="Ethereum">Ethereum</MenuItem>
                  <MenuItem value="Dogecoin">Dogecoin</MenuItem>
                </Select>
              </FormControl>
              <input
                className="input-field"
                type="text"
                placeholder="Amount"
                name="currentcoin"
                value={values.currentcoin}
                onChange={handleInput}
              />
              <ArrowCircleDownIcon className="individualcryptod3icon" />

              <FormControl className="individualcryptodropdown" fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  value={crypto2}
                  label="Crypto2"
                  onChange={handleChange2}
                >
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="BNB">BNB</MenuItem>
                  <MenuItem value="Ethereum">Ethereum</MenuItem>
                  <MenuItem value="Dogecoin">Dogecoin</MenuItem>
                </Select>
              </FormControl>
              <input
                className="input-field"
                type="text"
                placeholder="Amount"
                name="unity"
                value={values.unity}
                onChange={handleInput}
              />
              <button onClick={handleOpen} className="individualcryptod3btn">
                Convert
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="confirmbox">
                  <p className="confirmboxp1">Confirm Transaction</p>

                  <div className="confirmboxd1">
                    <img className="confirmboxd1pic" src={btc} alt="" />
                    <p className="confirmboxd1p1">
                      {values.currentcoin} {crypto1}
                    </p>
                  </div>
                  <ArrowCircleDownIcon className="individualcryptod3icon" />
                  <div className="confirmboxd1">
                    <img className="confirmboxd1pic" src={btc} alt="" />
                    <p className="confirmboxd1p1">
                      {values.unity} {crypto2}
                    </p>
                  </div>
                  <button className="confirmboxconfirmbtn">Confirm</button>
                </Box>
              </Modal>
            </div>
            <div className="individualcryptod3d1">
              <h1 className="individualcryptod3h2">More Crypto</h1>
              <OtherCrypto name="BNB" price="$200" change="+3.23%" />
              <OtherCrypto name="Ethereum" price="$123" change="+1.26%" />
              <OtherCrypto name="Dogecoin" price="$223" change="-0.25%" />
              <OtherCrypto name="Dogecoin" price="$323" change="+2.22%" />
              <OtherCrypto name="Dogecoin" price="$523" change="-0.21%" />
            </div>
          </div>
        </div>
        <h1 className="individualcryptoh3">BTC Price Live Data</h1>
        <p className="individualcryptop2">
          The live price of Bitcoin is $ 16,714.09 per (BTC / USD) today with a
          current market cap of $ 321.53B USD. 24-hour trading volume is $
          11.19B USD. BTC to USD price is updated in real-time. Bitcoin is
          -0.03% in the last 24 hours. It has a circulating supply of 19.24M
          USD.
        </p>
        <h1 className="individualcryptoh4">About Bitcoin (BTC)</h1>
        <p className="individualcryptop3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus
          dolor vitae lectus ornare laoreet. Fusce neque libero, fermentum eget
          augue sit amet, mollis rutrum odio. Morbi elementum non metus id
          varius. Suspendisse ultrices dui non felis faucibus, at bibendum risus
          dictum. Morbi ut lorem ex. Etiam vel quam leo. Suspendisse sapien leo,
          bibendum ut interdum eu, porta quis dui.
          <br /> <br />
          Aliquam mattis arcu non orci dictum vestibulum. Donec vitae ante at
          magna convallis tempor. Quisque ligula metus, vehicula nec turpis non,
          porttitor vehicula dui. Vestibulum odio lorem, consequat eget
          fermentum quis, sodales viverra leo. Quisque egestas risus in augue
          egestas dictum. Integer tincidunt, nunc vel semper eleifend, nulla
          mauris consectetur dolor, pretium fermentum mi mauris in nunc. Proin
          posuere placerat bibendum. Vivamus tincidunt ultrices placerat. Nullam
          vulputate congue augue vel consequat. <br /> <br /> Integer volutpat
          laoreet urna id porta. Vivamus vitae sollicitudin massa. Cras iaculis
          massa nisi, non luctus purus commodo eget. Proin a tortor elit.
          Maecenas vel interdum dui. Etiam ut auctor lacus. Curabitur eget magna
          feugiat, bibendum magna vel, hendrerit enim.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default IndividualCrypto;
