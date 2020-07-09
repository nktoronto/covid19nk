import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#3f51b5",
    textTransform: "uppercase", //could be slowing down?
  },
}));

export default function CountryPanel(props) {
  const classes = useStyles();

 // alert("starting CountryPanel"); // displayed 3 times

  let countryCode = props.countryCode;
  //  console.log(props, "props", props.countryCode) // displayed twice
  //alert('countrycode =', props.countryCode)  //does not display???

  let url =
    "https://api.thevirustracker.com/free-api?countryTotal=" + countryCode;

  // console.log(countryCode, "Countrycode");
  //  console.log(url, "url");

  const [globalData, setGlobalData] = useState({});
  // const [countryKode, setCountryKode] = useState('')
  const [countryName, setCountryName] = useState("");
  // only above 3 state constants are available at render time

  //setCountryKode(countryCode) // too many renders if uncommented
  // console.log(countryKode)

  useEffect(() => {
    getData(url);

    async function getData(url) {
      const response = await fetch(url);
      let data = await response.json(); // convert to json

      // console.log(data, "data");
      // console.log(data.countrydata, "data.countrydata" );
      // console.log(
      //   data.countrydata[0].info.code, // pk
      //   data.countrydata[0].info.title // pakistan
      //               );
      // const countrycode = data.countrydata[0].info.code;
      const countryname = data.countrydata[0].info.title;
      // const srcurl = data.countrydata[0].info.source;
      //  console.log(countrycode, countryname, srcurl, "constants");
      delete data.countrydata[0].info;
      // console.log(data.countrydata[0], "countrydata");
      //setCountryKode(countrycode)
      setCountryName(countryname);

      setGlobalData(data.countrydata[0]);
    }

    //   const url = "https://api.thevirustracker.com/free-api?global=stats";
    // const url = "https://api.thevirustracker.com/free-api?countryTotal=pk";
  }, []);

  return (
    <div className={classes.root}>
      <h3>
        Stats for: {countryCode} {countryName}
        {/* {countryname} */}
        {/* // countryCode is defined as var above, countryName is a state  */}
      </h3>

      <Grid container spacing={3}>
        {Object.keys(globalData).map((key, ind) => {
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper className={classes.paper} elevation={10}>
                <h3 className={classes.title}>
                  {key.replace(/_/g, " ").toUpperCase()}{" "}
                </h3>
                <h3> {globalData[key]} </h3>
                {/* //ERR if  .info not deleted */}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
