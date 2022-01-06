import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import colorCode from './colorCodes';

const theme = createTheme({
  palette: {
    primary: {
      main: colorCode.primary
    },
    secondary: {
      main: colorCode.blue
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
