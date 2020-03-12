import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./TextField.scss"
import Theme from "../ThemeProvider/Theme"

const { window } = global;
const { innerWidth } = window;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: innerWidth/5,
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
 <div className="input-text-field">   <form className={classes.root} noValidate autoComplete="off">
 <ThemeProvider theme={Theme}> 
 <TextField onChange={props.onChange} onKeyPress={props.onKeyDown} id="standard-basic" label="Search" />
 </ThemeProvider>
</form></div>
  );
}