import React, {useEffect, useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {Badge} from "@material-ui/core";
import ChatAPI from "../Apis/ChatAPI";

export default function UserBanner(props) {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status);
        }

        ChatAPI.subscribeToUserStatus(handleStatusChange);

        return function cleanup() {
            ChatAPI.unsubscribeFromUserStatus();
        };
    }, [props.userID]);

    return (
        <List>
            <ListItem button key={props.userID}>
                <ListItemIcon>
                    <Badge variant="dot" color="online" invisible={!isOnline}
                           anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                        <Avatar
                            sx={{width: 50, height: 50}}
                            alt={props.name}
                            src={props.avatar}
                        />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary={props.name}/>
            </ListItem>
        </List>
    );
}