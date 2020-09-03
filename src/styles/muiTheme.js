import { createMuiTheme } from '@material-ui/core/styles';
import BlueGrey from '@material-ui/core/colors/blueGrey';
import Orange from '@material-ui/core/colors/orange';
import Red from '@material-ui/core/colors/red';
import Blue from '@material-ui/core/colors/blue';
import Green from '@material-ui/core/colors/green';

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: BlueGrey[300],
      main: BlueGrey[500],
      dark: BlueGrey[700]
    },
    secondary: {
      light: Orange[200],
      main: Orange[400],
      dark: Orange[600],
      contrastText: '#fff'
    },
    error: {
      light: Red[300],
      main: Red[500],
      dark: Red[700]
    },
    warning: {
      light: Orange[300],
      main: Orange[500],
      dark: Orange[700],
    },
    info: {
      light: Blue[300],
      main: Blue[500],
      dark: Blue[700]
    },
    success: {
      light: Green[300],
      main: Green[500],
      dark: Green[700],
    },
    background: {
      default: '#f0f2f5'
    }
  },
});

export { Theme };