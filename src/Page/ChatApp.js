import * as React from 'react';
import Box from '@material-ui/core/Box';

import Chat from '../Components/Chat';
import MainAppBar from "../Components/MainAppBar";
import {useEffect, useState} from "react";
import ChatAPI from "../Apis/ChatAPI";

export default function ChatApp() {
    const [userID, setUserID] = useState();

    useEffect(() => {
        setUserID(ChatAPI.getUserID());

        return function cleanup() {
            setUserID(undefined);
        };
    }, []);

    return (
        <Box sx={{height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <MainAppBar/>
            <Chat userID={userID}/>
        </Box>
    );
}
