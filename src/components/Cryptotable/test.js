import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import Linegraph from "../Linegraph/Linegraph";

//assets
import btc from "../../assets/btc.png";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { MyContext } from "../../contexts/myContext";
function createData(name, lastprice, change, Prediction, marketcap) {
  return { name, lastprice, change, Prediction, marketcap };
}

let rows = [
  createData(
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">BNB</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    159,
    6.0,
    24,
    4.0
  ),
  createData(
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Bitcoin (BTC)</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    237,
    9.0,
    37,
    4.3
  ),
  createData(
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Ethereum (ETH)</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    262,
    16.0,
    24,
    6.0
  ),
  createData(
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Galxe (GAL)</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    305,
    3.7,
    67,
    4.3
  ),
  createData(
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Green Metaverse Token (GMT)</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    356,
    16.0,
    49,
    3.9
  ),
];

const Cryptotable = () => {
  const updateData = async (rows) => {
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
      "https://api.coincap.io/v2/assets?limit=5",
      requestOptions
    );

    let responses = await Promise.all([
      server.get(
        `https://api.coincap.io/v2/assets/${response.data.data[0].id}/history?interval=d1`
      ),
      server.get(
        `https://api.coincap.io/v2/assets/${response.data.data[1].id}/history?interval=d1`
      ),
      server.get(
        `https://api.coincap.io/v2/assets/${response.data.data[2].id}/history?interval=d1`
      ),
      server.get(
        `https://api.coincap.io/v2/assets/${response.data.data[3].id}/history?interval=d1`
      ),
      server.get(
        `https://api.coincap.io/v2/assets/${response.data.data[4].id}/history?interval=d1`
      ),
    ]);

    console.log("responses", responses[1].data.data.slice(0, 12));
    rows = await rows.map((index, value) => {
      return createData(
        (rows[value].name = (
          <div className="coinlogodiv">
            <img className="coinlogo" src={btc} alt="" />
            <p className="coinlogop">{response.data.data[value].name}</p>
            <Linegraph dataProp={responses[value].data.data.slice(0, 12)} />
          </div>
        )),
        parseFloat(response.data.data[value].priceUsd).toFixed(2),
        parseFloat(response.data.data[value].changePercent24Hr).toFixed(2),
        1,
        parseFloat(response.data.data[value].marketCapUsd).toFixed(2)
      );
    });

    return rows;
  };

  const [data, setData] = useState(rows);
  const navigate = useNavigate();

  useEffect(() => {
    updateData(data)
      .then((rows) => {
        console.log("I am here", rows);
        setData(rows);
      })
      .then(() => {
        localStorage.setItem("data", data);
      });
  }, []);

  return (
    <>
      <div className="cryptotable">
        <TableContainer className="tablecontainer" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="headingrow">
                <TableCell
                  style={{ textAlign: "left" }}
                  className="tableheadings"
                >
                  Name
                </TableCell>
                <TableCell className="tableheadings">Last Price</TableCell>
                <TableCell className="tableheadings">24h Change</TableCell>
                <TableCell className="tableheadings">Prediction</TableCell>
                <TableCell className="tableheadings">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/individualcrypto", { state: { index } });
                  }}
                >
                  <TableCell
                    className="tablerowcell"
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell className="tablerowcell">
                    {row.lastprice}
                  </TableCell>
                  <TableCell className="tablerowcell">{row.change}</TableCell>
                  <TableCell className="tablerowcell">
                    {row.Prediction}
                  </TableCell>
                  <TableCell className="tablerowcell">
                    {row.marketcap}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Cryptotable;
