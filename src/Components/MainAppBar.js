import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Brightness7, Brightness3, Logout} from "@material-ui/icons";
import ChatAPI from "../Apis/ChatAPI";

export default function MainAppBar(props) {
    const icon = !props.darkTheme ? <Brightness7 /> : <Brightness3 />;

    const handleLogoutBtnClicked = () => {
        ChatAPI.userLogout({
            type: "userLogout",
            data: {
                userID: ChatAPI.getUserID(),
                timeStamp: Date.now()
            }
        });
        ChatAPI.setUserID(undefined);
        window.location.href = "/";
    }

    return (
        <AppBar position="sticky" sx={{height: 64, flex: "0 0 auto", overflow: "auto"}}>
            <Toolbar>
                <Typography variant="h6" component="div" noWrap={true} sx={{flexGrow: 1, userSelect: "none"}}>
                    Swift Messenger
                </Typography>
                <IconButton color="inherit" onClick={props.onToggle} sx={{marginRight: 2}}>
                    {icon}
                </IconButton>
                <Button
                    startIcon={<Logout/>}
                    edge="end"
                    color="inherit"
                    variant="outlined"
                    sx={{mr: 2}}
                    onClick={handleLogoutBtnClicked}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    )
}