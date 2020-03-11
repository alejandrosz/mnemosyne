import React from "react";
import { makeStyles, useTheme, ThemeProvider } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import "./CheckboxesGroup.scss";
import Theme from "../ThemeProvider/Theme";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { rijks, met, moma, prado, louvre, british } = state;
  const error =
    [rijks, met, moma, prado, louvre, british].filter(v => v).length !== 2;

  return (
    <div className={classes.root}>
      <ThemeProvider theme={Theme}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pick Database</FormLabel>
          <FormGroup>
            <div className="two-columns">
              {" "}
              <div className="one-column">
                {" "}
                <FormControlLabel
                  className="check-label"
                  control={
                    <Checkbox
                      checked={rijks}
                      onChange={handleChange("rijks")}
                      value="rijks"
                      checked
                      disabled
                    />
                  }
                  label="Rijks"
                />
                <FormControlLabel
                  className="check-label"
                  control={
                    <Checkbox
                      checked={met}
                      onChange={handleChange("met")}
                      value="met"
                      checked
                      disabled
                    />
                  }
                  label="MET"
                />
              </div>
              <div className="one-column">
                <FormControlLabel
                  className="check-label"
                  control={
                    <Checkbox
                    checked={louvre}
                    onChange={handleChange("louvre")}
                    value="louvre"
                    disabled
                  />
                  }
                  label="Louvre"
                />{" "}
                <FormControlLabel
                  className="check-label"
                  control={
                    <Checkbox
                      checked={moma}
                      onChange={handleChange("moma")}
                      value="moma"
                      checked
                      disabled
                    />
                  }
                  label="MoMA"
                />
              </div>
            </div>
          </FormGroup>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
