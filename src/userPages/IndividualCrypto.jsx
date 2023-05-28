import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { cryptoname } = params;
  const [coinname, setCoinName] = useState();

  const [coindata, setCoinData] = useState([]);

  const [view, setView] = useState("day");
  const [dates] = useState([]);
  const [values, setValues] = useState({
    currentcoin: "",
    unity: "",
  });
  const [open, setOpen] = useState(false);
  const [crypto1, setCrypto1] = useState("");
  const [crypto2, setCrypto2] = useState("");

  const [pData, setPData] = useState([
    20, 30, 40, 25, 15, 16, 20, 60, 10, 20, 30, 40, 25, 15, 16, 20, 60, 10, 20,
    30, 40, 25, 15, 70, 100, 45, 17, 50, 23, 70, 100, 25,
  ]);
  const [currentbtcprice, setcurrentbtcprice] = useState();

  const [cryptopercsnatgechange, setPercenatgechange] = useState();

  const [cryptoName, setCryptoName] = useState();
  const [cryptonameurl, setCryptoNameUrl] = useState();

  const [moreCrypto, setMoreCrypto] = useState([]);

  const [datalabel, setDatalabel] = useState([
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
  ]);

  //graph2
  const dummydata = {
    labels: view === "day" ? datalabel : "",
    datasets: [
      {
        label: "Dataset 1",
        data: pData,
        borderColor: "#00b4ff",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const updateData = async (crypto) => {
    const server = axios.create({
      baseURL: "https://api.coincap.io/v2/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await server.get(
      `https://api.coincap.io/v2/assets/${crypto}`,
      requestOptions
    );
    console.log("RESPONSE");

    console.log(response);
    let responses = await server.get(
      `https://api.coincap.io/v2/assets/${
        response.data.data.id
      }/history?interval=d1&start=${
        Date.now() - 32 * 24 * 60 * 60 * 1000
      }&end=${Date.now()}`
    );

    let cryptoList = [
      "bitcoin",
      "ethereum",
      "solana",
      "polygon",
      "cardano",
      "polkadot",
    ];
    let extraDataResponse = await Promise.all(
      cryptoList.map((id, counter) => {
        return server.get(
          `https://api.coincap.io/v2/assets/${id}`,
          requestOptions
        );
      })
    );
    return [responses.data.data, extraDataResponse, response.data.data];
  };
  useEffect(() => {
    if (cryptoname === "ethereum") {
      setCryptoNameUrl("eth");
    }
    if (cryptoname === "bitcoin") {
      setCryptoNameUrl("btc");
    }
    if (cryptoname === "cardano") {
      setCryptoNameUrl("ada");
    }
    if (cryptoname === "polkadot") {
      setCryptoNameUrl("dot");
    }
    if (cryptoname === "polygon") {
      setCryptoNameUrl("matic");
    }
    if (cryptoname === "solana") {
      setCryptoNameUrl("sol");
    }
  }, []);
  useEffect(() => {
    console.log("cryptonameurl", cryptonameurl);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://flask-application.herokuapp.com/${cryptonameurl}`
        );
        const jsonData = response.data;
        setCoinData(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [cryptonameurl]);

  console.log("state", location.state);
  useEffect(() => {
    updateData(location.state ? location.state : "bitcoin").then((vals) => {
      console.log("vals are", vals);
      setPData(vals[0].map((obj) => obj.priceUsd));
      setDatalabel(
        vals[0].map((obj) => {
          const date = new Date(obj.date);
          return (
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate()
          );
        })
      );

      setcurrentbtcprice(vals[2].priceUsd);
      setPercenatgechange(vals[2].changePercent24Hr);
      setCryptoName(vals[2].name);
      setMoreCrypto(vals[1]);
      console.log("cryptoname is", cryptoname);

      if (location?.state === "ethereum") {
        setCoinName("Ethereum");
      }
      if (location?.state === "bitcoin") {
        setCoinName("BITCOIN");
      }
      if (location?.state === "cardano") {
        setCoinName("CARDANO");
      }
      if (location?.state === "polkadot") {
        setCoinName("POLKADOT");
      }
      if (location?.state === "polygon") {
        setCoinName("MATIC");
      }
      if (location?.state === "solana") {
        setCoinName("SOLANA");
      }
    });
  }, [location.state, cryptoname, coinname]);

  const handleDate = () => {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < numDaysInMonth; i++) {
      dates[i] = i + 1;
    }
  };
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

  /* const location = useLocation();
    console.log("state", location.state);

    useEffect(() => {
      updateData(location.state?.index ? location.state.index : 0).then(
        (vals) => {
          console.log(vals);
          setData(vals[0].map((obj) => obj.priceUsd));
          setDatalabel(
            vals[0].map((obj) => {
              const date = new Date(obj.date);
              return (
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate()
              );
            })
          );
          setcurrentbtcprice(vals[1].priceUsd);
          setPercenatgechange(vals[1].changePercent24Hr);
          setCryptoName(vals[1].name);
          setMoreCrypto(vals[2]);
        }
      );
    }, []); */

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
      view === "day"
        ? coindata.map((item) => [item.Date])
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
        : view === "hour"
        ? dates
        : "",
    datasets: [
      {
        label: "Dataset 1",
        data: coindata.map((item) => item.Forecast),
        borderColor: "#00b4ff",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const handleNavigate = (prop) => {
    navigate(`/individualcrypto/${prop}`);
    window.location.reload();
  };

  const OtherCrypto = ({ name, price, change, id }) => {
    return (
      <div
        onClick={() => {
          navigate(`/individualcrypto/${name}`, { state: id });
        }}
        className="othercrypto"
      >
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
          <h1 className="individualcryptoh1">{coinname} Price</h1>
        </span>
        <div className="individualcryptod1">
          <div className="individualcryptod">
            <span className="individualcryptos1">
              <h1 className="individualcryptoh2">{`$${parseFloat(
                currentbtcprice
              ).toFixed(2)}`}</h1>
              <p
                className="individualcryptop1"
                style={{
                  color: `${
                    cryptopercsnatgechange?.slice(0, 1) === "-"
                      ? "red"
                      : "green"
                  }`,
                }}
              >{`${parseFloat(cryptopercsnatgechange).toFixed(2)}%`}</p>
            </span>
            <div className="individualcryptograph">
              <span className="individualcryptographs1">
                {/*   <p
                  onClick={() => setView("hour")}
                  style={{
                    color: `${view === "hour" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Hour
                </p> */}
                <p
                  onClick={() => setView("day")}
                  style={{
                    color: `${view === "day" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Day
                </p>
                {/*     <p
                  onClick={() => setView("month")}
                  style={{
                    color: `${view === "month" ? "#2683ff" : ""}`,
                  }}
                  className="individualcryptographp"
                >
                  Month
                </p> */}
              </span>

              <Line options={options} data={data} />
              <h1 className="individualcryptoh1">Past-Present Data</h1>
              <Line options={options} data={dummydata} />
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
                  <MenuItem value="BTC">CARDANO </MenuItem>
                  <MenuItem value="BNB">BITCOIN </MenuItem>
                  <MenuItem value="Ethereum">POLKADOT </MenuItem>
                  <MenuItem value="Dogecoin">ETHEREUM</MenuItem>
                  <MenuItem value="Dogecoin">MATIC</MenuItem>
                  <MenuItem value="Dogecoin">SOLANA</MenuItem>
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
                  <MenuItem value="BTC">CARDANO </MenuItem>
                  <MenuItem value="BNB">BITCOIN </MenuItem>
                  <MenuItem value="Ethereum">POLKADOT </MenuItem>
                  <MenuItem value="Dogecoin">ETHEREUM</MenuItem>
                  <MenuItem value="Dogecoin">MATIC</MenuItem>
                  <MenuItem value="Dogecoin">SOLANA</MenuItem>
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
              {moreCrypto?.map((val) => {
                return (
                  <OtherCrypto
                    name={val.data.data.name}
                    price={`$${parseFloat(val.data.data.priceUsd).toFixed(2)}`}
                    change={`${parseFloat(
                      val.data.data.changePercent24Hr
                    ).toFixed(2)}%`}
                    id={val.data.data.id}
                  />
                );
              })}
              {/* <OtherCrypto
                url="ada"
                name="CARDANO "
                price="$200"
                change="+3.23%"
              />
              <OtherCrypto
                url="btc"
                name="BITCOIN "
                price="$123"
                change="+1.26%"
              />
              <OtherCrypto
                url="dot"
                name="POLKADOT "
                price="$223"
                change="-0.25%"
              />
              <OtherCrypto
                url="eth"
                name="ETHEREUM "
                price="$323"
                change="+2.22%"
              />
              <OtherCrypto
                url="matic"
                name="MATIC "
                price="$523"
                change="-0.21%"
              />
              <OtherCrypto url="sol" name="SOLANA  " /> */}
            </div>
          </div>
        </div>
        <h1 className="individualcryptoh3">{coinname} Price Live Data</h1>
        <p className="individualcryptop2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus
          dolor vitae lectus ornare laoreet. Fusce neque libero, fermentum eget
          augue sit amet, mollis rutrum odio. Morbi elementum non metus id
          varius. Suspendisse ultrices dui non felis faucibus, at bibendum risus
          dictum. Morbi ut lorem ex. Etiam vel quam leo. Suspendisse sapien leo,
          bibendum ut interdum eu, porta quis dui.
        </p>

        <h1 className="individualcryptoh4">About {coinname}</h1>
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
