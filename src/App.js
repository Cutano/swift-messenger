import * as React from 'react';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Link from '@material-ui/core/Link';

import Chat from './Components/Chat';
import MainAppBar from "./Components/MainAppBar";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © 姜鸿博, 刘林晖, 卫金建, 高喜颖 '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <>
        <MainAppBar/>
        <Chat/>
        {/*<Copyright/>*/}
    </>
  );
}
