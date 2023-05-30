import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Cookies from "universal-cookie";
//assets
import logo from "../../assets/logo.png";
//metamask
import { ethers } from "ethers";
import { Nav, Button, Container } from "react-bootstrap";
//mui
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#ffffff",
  border: `1px solid ${getComputedStyle(
    document.documentElement
  ).getPropertyValue(`--primary`)}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: `#000000`,
  fontFamily: "Inter",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [scroll, setScroll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    handleLogout();
  };
  const handleLogout = () => {
    cookies.remove("loggedinuser");
    navigate("/login");
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{ fontFamily: "Inter" }} onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem style={{ fontFamily: "Inter" }} onClick={handleMenuClose}>
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle className="navicons" sx={{ fontSize: "30px" }} />
        </IconButton>
        <p style={{ fontFamily: "Inter" }}>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <AccountBalanceWalletIcon
            className="navicons"
            sx={{ fontSize: "30px" }}
          />
        </IconButton>
        <p style={{ fontFamily: "Inter" }}>Wallet</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <ShoppingCartIcon className="navicons" sx={{ fontSize: "30px" }} />
        </IconButton>
        <p style={{ fontFamily: "Inter" }}>Cart</p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScroll(window.pageYOffset > 10)
      );
    }
  }, []);
  //----------------------------------------MetaMask Connect
  // MetaMask Login/Connect
  const [account, setAccount] = useState(null);
  const [data, setdata] = useState({
    address: "", // Stores address
    Balance: null, // Stores balance
  });
  const ownhandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        // Return the address of the wallet
        console.log(res);
      });
    } else {
      alert("install metamask extension!!");
    }
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [data.address, "latest"],
      })
      .then((balance) => {
        // Return string value to convert it into int balance
        console.log(balance);

        // Yarn add ethers for using ethers utils or
        // npm install ethers
        console.log(ethers.utils.formatEther(balance));
        // Format the string into main latest balance
      });
  };
  const web3Handler = async () => {
    /*  window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        // User has authorized the connection
        // You can now interact with their wallet
      })
      .catch((err) => {
        // User has rejected the connection request
        console.error(err);
      }); */
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    // loadContracts(signer);
  };

  //----------------------------------------MetaMask Connect
  return (
    <>
      <div
        style={{
          boxShadow: `${scroll ? "0px 3px 19px rgba(0, 0, 0, 0.25)" : ""}`,
        }}
        className="Navbar"
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/home">
                {" "}
                <img
                  style={{ width: "100px", height: "60px", color: "#00b4ff" }}
                  src={logo}
                  alt=""
                />
              </Link>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon className="navicons" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <div className="otherlinks">
                <Link
                  onClick={() => window.open("http://3.108.247.218")}
                  className="otherlinksa1"
                >
                  E-Commerce
                </Link>
                <Link
                  onClick={() => window.open("https://unitifynft.netlify.app/")}
                  className="otherlinksa1"
                >
                  NFTs
                </Link>
              </div>
              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle
                    className="navicons"
                    sx={{ fontSize: "30px", marginRight: "10px" }}
                  />
                </IconButton>

                <Nav>
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4"
                    >
                      <Button
                        className="navbarwalletaddressbtn"
                        variant="outline-light"
                      >
                        {account.slice(0, 5) + "..." + account.slice(38, 42)}
                      </Button>
                    </Nav.Link>
                  ) : (
                    /*   <Button onClick={web3Handler} variant="outline-light">
                      Connect Wallet
                    </Button> */
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      onClick={web3Handler}
                    >
                      <AccountBalanceWalletIcon
                        className="navicons"
                        sx={{ fontSize: "30px" }}
                      />
                    </IconButton>
                  )}
                </Nav>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <ShoppingCartIcon
                    className="navicons"
                    sx={{ fontSize: "30px" }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon className="navicons" sx={{ fontSize: "30px" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
    </>
  );
};

export default Navbar;
