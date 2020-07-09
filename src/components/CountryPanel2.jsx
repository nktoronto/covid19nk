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
        fontSize: 30,
        textAlign: "center",
        textTransform: "uppercase", //could be slowing down?
    },
}));
const useStylesTypography = makeStyles({
    root: {
        width: "100%",
        maxWidth: 100,
        color: "red"
    },
});

export default function CountryPanel(props) {
    const classes = useStyles();
    const classTypography = useStylesTypography();

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

            const countryname = data.countrydata[0].info.title;

            delete data.countrydata[0].info;

            setCountryName(countryname);

            setGlobalData(data.countrydata[0]);
        }

    }, []);

    return (
        <div className={classes.root}>
            <Typography
                variant="h3"
                gutterBottom
                style={{ color: "darkcyan", fontWeight: "bold" }}>
            <h3>
                Stats for: {countryCode} {countryName}

                </h3>
            </Typography>    

            <Grid container spacing={3}>
                {Object.keys(globalData).map((key, ind) => {
                    return (
                        <Grid item xs={12} sm={4} key={ind}>
                            <Paper className={classes.paper} elevation={10}>

                                
                              <div className={classTypography.root}>
                                <Typography
                                variant="h3"
                                gutterBottom
                                style={{ color: "blue", fontWeight: "bold" }}>
                                  <h3>
                                    {key.replace(/_/g, " ").toUpperCase()}
                                  </h3>
                            
                                <NumberFormat
                                    value={
                                    globalData[key]
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    renderText={(value) => <div>{value}</div>}
                                />
                                </Typography>

                                </div>
                            </Paper>
                    
                        </Grid>
                    )
                }
                    
                )};
            </Grid>
        </div>
    )
}
