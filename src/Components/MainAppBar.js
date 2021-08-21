import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {Logout} from "@material-ui/icons";
import ChatAPI from "../Apis/ChatAPI";

export default function MainAppBar() {
    const handleLogoutBtnClicked = () => {
        ChatAPI.setUserID(undefined);
        window.location.href = "/auth/login";
    }

    return (
        <AppBar position="sticky" sx={{height: 64, flex: "0 0 auto", overflow: "auto"}}>
            <Toolbar>
                <Typography variant="h6" component="div" noWrap={true} sx={{ flexGrow: 1, userSelect: "none" }}>
                    Swift Messenger
                </Typography>
                <Button
                    startIcon={<Logout/>}
                    edge="end"
                    color="inherit"
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={handleLogoutBtnClicked}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    )
}