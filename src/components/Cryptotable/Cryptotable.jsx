import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
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

//polygon = matic
//cardano = ada
//polkadot = dot
let cryptoList = ['bitcoin','ethereum','solana','polygon','cardano','polkadot']
function createData(url, name, lastprice, change, marketcap) {
  return { url, name, lastprice, change, marketcap };
}

let rows = [
  createData(
    "ada",
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Cardano</p>
      {
        <Linegraph
        />
      }
    </div>,
    "$0.39",
    "+1.74%",

    "13,763,420,500"
  ),
  createData(
    "btc",
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
    "$29,589.46",
    "+2.79%",
    "573,001,848,764"
  ),
  createData(
    "eth",
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
    "$1,992.31",
    "+6.38%",
    "239,814,419,688"
  ),
  createData(
    "dot",
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Polkadot</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    "$5.87",
    "+3.94%",
    "$6,932,103,369"
  ),
  createData(
    "matic",
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Matic</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    "$1.00",
    "+2.02%",
    "9,126,514,666"
  ),
  createData(
    "sol",
    <div className="coinlogodiv">
      <img className="coinlogo" src={btc} alt="" />
      <p className="coinlogop">Solana</p>
      <Linegraph
        dataProp={Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 100) + 1
        )}
      />
    </div>,
    "$22.93",
    "+5.78%",
    "9,041,087,645"
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

  

    let response = await Promise.all(
       cryptoList.map((id,counter)=>{
        return server.get(`https://api.coincap.io/v2/assets/${id}`,requestOptions)
      })
    )


   
    
    return response;
  };
 
  const updatefunction =()=>{
    updateData(data)
    .then((response) => {
      rows =  rows.map((index, value) => {
        return createData(
          response[value].data.data.id,
            <div className="coinlogodiv">
              <img className="coinlogo" src={btc} alt="" />
              <p className="coinlogop" >{response[value].data.data.name}</p>
             
              <Linegraph
      
          />
            </div>
        ,
          parseFloat(response[value].data.data.priceUsd).toFixed(2),
          parseFloat(response[value].data.data.changePercent24Hr).toFixed(2),
          parseFloat(response[value].data.data.marketCapUsd).toFixed(2)
        );
      });
      return rows
    })
    .then((row) => {
      setData(row)
      console.log(Date())
    })

  }
  const [data, setData] = useState(rows);
  const navigate = useNavigate();

   useEffect(() => {
    updatefunction()
   const interval = setInterval(() => {

    updatefunction()
   }, 30000) 
   return() => clearInterval(interval)
  },[]); 

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

                <TableCell className="tableheadings">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/individualcrypto/${row.url}`,{state:row.url} );
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
