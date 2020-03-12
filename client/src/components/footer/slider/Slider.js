import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./Slider.scss";
import Theme from "../ThemeProvider/Theme";

const useStyles = makeStyles({
  root: {
    // color: black,
    width: 200
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([500, 1500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeRange(newValue);

  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={Theme}>
        <Typography id="range-slider" gutterBottom>
          Year range
        </Typography>
        <Slider
          min={0}
          max={2020}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </ThemeProvider>
    </div>
  );
}
