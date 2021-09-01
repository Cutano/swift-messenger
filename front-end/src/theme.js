import {blue, purple, red} from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    online: {
      main: '#67b955',
    },
    msgBubble: {
      self: '#51a7ff'
    },
    msgText: {
      self: '#ffffff'
    },
    friendItem: {
      bg: '#51a7ff'
    }
  },
});

export const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9978ee",
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    online: {
      main: '#67b955',
    },
    msgBubble: {
      self: '#9978ee'
    },
    msgText: {
      self: '#ffffff'
    },
    friendItem: {
      bg: '#9978ee'
    }
  },
});
