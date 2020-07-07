import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

export default function InfoPanel() {
  const classes = useStyles();

  const [globalData, setGlobalData] = useState({});

  const url = "https://api.thevirustracker.com/free-api?global=stats";
  // const url =
  //   "https://api.thevirustracker.com/free-api?countryTotal=ca";

  //https://api.thevirustracker.com/free-api?countryTotal=pk

  useEffect(() => {
    async function getData(url) {
      const response = await fetch(url);
      let data = await response.json(); // convert to json
      console.log(data);

      console.log(globalData, "globalData"); // no data.why?

      delete data.results[0].source;
      setGlobalData(data.results[0]);
      console.log(data.results[0], "data result[0]");
      console.log(globalData, "global-data");
      // no data.why? //doesnot like it outside asyn fn
    }

    getData(url);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData).map((key, ind) => {
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper className={classes.paper} elevation={10}>
                <h3 className={classes.title}>
                  {" "}
                  {key.replace(/_/g, " ").toUpperCase()}{" "}
                </h3>
                <h3> {globalData[key]} </h3>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
