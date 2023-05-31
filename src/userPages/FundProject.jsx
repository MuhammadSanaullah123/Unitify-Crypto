import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Cookies from "universal-cookie";
//components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

//mui
import UploadIcon from "@mui/icons-material/Upload";
import InfoIcon from "@mui/icons-material/Info";
//contracts

import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

const FundProject = () => {
  const cookies = new Cookies();
  const { id } = useParams();

  const [projects] = useState(cookies.get("projects"));
  const [picname, setPicName] = useState("");
  const [preview, setPreview] = useState("");
  const [values, setValues] = useState({
    name: projects[id].name,
    description: projects[id].description,
    /*  file: "",
    minimum: "", */
  });
  const [funds, setFunds] = useState("");
  const [balance, setBalance] = useState("");
  const [isWithdrawable] = useState(
    cookies.get("loggedinuser")[0].id === projects[id].id ? true : false
  );

  const handleFundsChange = (e) => {
    setFunds(e.target.value);
  };

  console.log(projects);
  console.log("id is ", id);
  async function withdraw() {
    console.log(`Withdrawing...`);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.withdraw();
        await listenForTransactionMine(transactionResponse, provider);
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  }

  async function fund() {
    const ethAmount = funds;
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.fund({
          value: ethers.utils.parseEther(ethAmount),
        });
        await listenForTransactionMine(transactionResponse, provider);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  }

  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`);
    return new Promise((resolve, reject) => {
      try {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
          console.log(
            `Completed with ${transactionReceipt.confirmations} confirmations. `
          );
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };
  console.log(values.file);
  return (
    <>
      <Navbar />
      <div className="IndividualProject">
        <span className="individualprojects1">
          <InfoIcon className="individualprojectpic" />
          <h1 className="individualprojecth1">Project Details</h1>
        </span>
        <h1 className="individualprojecth3">Project Name:</h1>
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
        />
        <h1 className="individualprojecth4">Project Description</h1>
        <textarea
          className="textarea-field"
          name="description"
          placeholder="Description..."
          value={values.description}
        ></textarea>
        <h1
          style={{
            display: `${isWithdrawable ? "none" : ""}`,
          }}
          className="individualprojecth3"
        >
          Funds Donate:
        </h1>
        <input
          className="input-field"
          type="number"
          placeholder="Funds"
          name="funds"
          value={funds}
          onChange={handleFundsChange}
          style={{
            display: `${isWithdrawable ? "none" : ""}`,
          }}
        />
        <h1 className="individualprojecth3">Balance:</h1>
        <input
          className="input-field"
          type="number"
          placeholder="Balance"
          name="balance"
          value={balance}
        />
        {/*       <input
          style={{ display: "none" }}
          ref={ref}
          name="file"
          type="file"
          onChange={handleInput("file")}
        />
        <button
          onClick={handleClick}
          className="individualprojectimgbtn"
          component="span"
        >
          <UploadIcon />
          <p className="individualprojectp1">Upload Image</p>
        </button>
        <p className="spacesboxp2">{picname}</p>
        {preview ? (
          <img className="individualprojectimg" src={preview} alt="" />
        ) : (
          ""
        )} */}
        <button
          style={{
            display: `${isWithdrawable ? "none" : ""}`,
          }}
          className="individualprojectb1"
          onClick={fund}
        >
          Fund
        </button>{" "}
        <button
          style={{
            display: `${!isWithdrawable ? "none" : ""}`,
          }}
          className="individualprojectb1"
          onClick={withdraw}
        >
          Withdraw
        </button>
        <button className="individualprojectb1" onClick={getBalance}>
          Balance
        </button>
        {/*  <button onClick={handleSubmit} className="individualprojectb1">
          Submit
        </button> */}
      </div>
      <Footer />
    </>
  );
};

export default FundProject;
