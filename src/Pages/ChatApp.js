import * as React from 'react';
import Box from '@material-ui/core/Box';

import Chat from '../Components/Chat';
import MainAppBar from "../Components/MainAppBar";
import {useEffect, useState} from "react";
import ChatAPI from "../Apis/ChatAPI";

export default function ChatApp() {
    const [userID, setUserID] = useState();
    const [verified, setVerified] = useState(false);

    const handleLoginResult = (data) => {
        if (data.result === "success") {
            setVerified(true);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = parseInt(urlParams.get('userid'));
        const pwd = urlParams.get('cipher');
        if (uid && typeof (uid) === "number" && pwd) {
            setUserID(uid);
            ChatAPI.userLogin({userID: uid, password: pwd}, handleLoginResult);
        }
        else window.location.href = "/auth/login";

        return function cleanup() {
            setUserID(undefined);
        };
    }, []);

    return (
        <Box sx={{height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <MainAppBar/>
            {verified && <Chat userID={userID}/>}
        </Box>
    );
}
