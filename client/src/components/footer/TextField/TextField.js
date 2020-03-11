import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./TextField.scss"
import Theme from "../ThemeProvider/Theme"


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <ThemeProvider theme={Theme}> 
      <TextField id="standard-basic" label="Search" />
      </ThemeProvider>
    </form>
  );
}