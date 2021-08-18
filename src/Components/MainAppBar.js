import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Logout} from "@material-ui/icons";

export default function MainAppBar() {

    return (
        <AppBar position="sticky" sx={{height: 64, flex: "0 0 auto", overflow: "auto"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Swift Messenger
                </Typography>
                <Button
                    startIcon={<Logout/>}
                    edge="end"
                    color="inherit"
                    variant="outlined"
                    sx={{ mr: 2 }}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    )
}