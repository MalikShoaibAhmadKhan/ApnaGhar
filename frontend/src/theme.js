import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005f73',
    },
    secondary: {
      main: '#0a9396',
    },
    background: {
      default: '#e9d8a6',
      paper: '#ee9b00',
    },
    text: {
      primary: '#001219',
      secondary: '#005f73',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
