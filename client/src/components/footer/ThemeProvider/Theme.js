import { createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
// import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#7986cb",
      main: "#FFFFFF",
      dark: "#303f9f"
    },
    secondary: {
      light: "#7986cb",
      main: "#7986cb",
      dark: "#7986cb"
    },
    typography: {
      htmlFontSize: 1,
      fontSize: 1
    },
    h1:{
      fontsize:"5rem"
    }
  },
  status: {
    // danger: "orange"
  }
});

export default Theme;
