import React from "react";
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

function createData(name, lastprice, change, Prediction, marketcap) {
  return { name, lastprice, change, Prediction, marketcap };
}

const rows = [
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
  const navigate = useNavigate();
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
              {rows.map((row, index) => (
                <TableRow
                  onClick={() => {
                    navigate("/individualcrypto");
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
