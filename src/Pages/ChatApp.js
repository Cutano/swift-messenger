import * as React from 'react';
import Box from '@material-ui/core/Box';

import Chat from '../Components/Chat';
import MainAppBar from "../Components/MainAppBar";
import {useEffect, useState} from "react";

export default function ChatApp() {
    const [userID, setUserID] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = parseInt(urlParams.get('userid'));
        if (uid || typeof (uid) === "number") setUserID(uid);
        else window.location.href = "/auth/login";

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
