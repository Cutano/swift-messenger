import React from "react";
import {
    Dialog,
    Avatar,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button, DialogActions
} from "@material-ui/core";
import {Person, Tag} from "@material-ui/icons";

export default function UserDetail(props) {

    return (
        <Dialog open={props.open}>
            <DialogTitle>User Detail</DialogTitle>
            <List>
                <ListItem>
                    <Avatar src={props.avatar} sx={{height: 100, width: 100, margin: "auto"}}/>
                </ListItem>
                <Divider sx={{margin: 2}}/>
                <ListItem sx={{width: 400, marginLeft: 1, marginRight: 1}}>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary={props.username} secondary="Username"/>
                </ListItem>
                <ListItem sx={{width: 400, marginLeft: 1, marginRight: 1}}>
                    <ListItemIcon>
                        <Tag/>
                    </ListItemIcon>
                    <ListItemText primary={props.userID} secondary="User ID"/>
                </ListItem>
            </List>
            <DialogActions>
                <Button autoFocus onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}