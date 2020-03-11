import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import "./SendButton.scss";
import Theme from "../ThemeProvider/Theme";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
}));

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label htmlFor="outlined-button-file">
        <ThemeProvider theme={Theme}>
          <Button variant="outlined" component="span">
            FIND
          </Button>
        </ThemeProvider>
      </label>
    </div>
  );
}
