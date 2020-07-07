import React from 'react'
import './App.css';
import "fontsource-roboto";
import NumberFormat from "react-number-format";
import "./App.css";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Button,
  Icon,
  makeStyles,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  paper,
} from "@material-ui/core";
import NavBar from "./components/NavBar";
import InfoPanel from "./components/InfoPanel";
import CountryPanel from "./components/CountryPanel";


function App() {

  var countryCode = window.prompt("Enter Country Code");

  console.log(countryCode, "countrycode input in APP.JS");

  return (
    <div className="App">
      <NavBar />
      {countryCode === "gl" ? (
        <InfoPanel />
      ) : (
        <CountryPanel countryCode={countryCode} />
        )}
      
    </div>
  );
}

export default App;