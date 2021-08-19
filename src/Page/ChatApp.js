import * as React from 'react';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Link from '@material-ui/core/Link';

import Chat from '../Components/Chat';
import MainAppBar from "../Components/MainAppBar";

export default function ChatApp() {
  return (
    <Box sx={{height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
        <MainAppBar/>
        <Chat/>
    </Box>
  );
}
