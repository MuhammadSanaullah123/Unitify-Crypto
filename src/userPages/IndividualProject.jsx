import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
//components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
//mui
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
//contracts
//import { ethers } from "./ethers-5.6.esm.min.js";
//import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

const IndividualProject = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState(
    cookies.get("projects") ? cookies.get("projects") : ""
  );
  const [picname, setPicName] = useState("");
  const [preview, setPreview] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    /*  file: "",
    minimum: "", */
  });

  const handleInput = (file) => (e) => {
    if (file === "file") {
      const fileObject = e.target.files[0];
      setValues({
        ...values,
        [e.target.name]: fileObject,
      });
      setPicName(fileObject.name);
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onloadend = () => {
        setPreview(reader.result); // set the preview state with the base64 encoded data of the image
      };
    } else {
      const Value = e.target.value;
      setValues({
        ...values,
        [e.target.name]: Value,
      });
    }
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects, values];
      cookies.set("projects", newProjects, { path: "/" });
      return newProjects;
    });

    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  console.log(projects);
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
    const ethAmount = values.minimum;
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
          onChange={handleInput("text")}
        />
        <h1 className="individualprojecth4">Project Description</h1>
        <textarea
          className="textarea-field"
          name="description"
          placeholder="Description..."
          value={values.description}
          onChange={handleInput("text")}
        ></textarea>
        {/*  <h1 className="individualprojecth3">Minimum Donation:</h1>
        <input
          className="input-field"
          type="number"
          placeholder="Funds"
          name="minimum"
          value={values.minimum}
          onChange={handleInput("text")}
        /> */}
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
        {/* <button className="individualprojectb1" onClick={fund}>
          Fund
        </button>{" "}
        <button className="individualprojectb1" onClick={withdraw}>
          Withdraw
        </button>
        <button className="individualprojectb1" onClick={getBalance}>
          Balance
        </button> */}
        <button onClick={handleSubmit} className="individualprojectb1">
          Submit
        </button>
        {isSubmitting && <CircularProgress className="circularbar" />}
      </div>
      <Footer />
    </>
  );
};

export default IndividualProject;
