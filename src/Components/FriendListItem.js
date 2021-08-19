import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {Badge, Card, CardActionArea, ListItem} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatAPI from "../Apis/ChatAPI";
import {formatTime} from "../Utilities/utilFunctions";

export default function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(false);
    const [unreadMsgCount, setUnreadMsgCount] = useState(props.unreadMsgCount);
    const [recentMsg, setRecentMsg] = useState(props.recentMsg ?? "");
    const [recentMsgTime, setRecentMsgTime] = useState(props.recentMsgTime ?? 1629266506186);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status);
        }

        function handleNewMsg(newMsg, dateNow) {
            setUnreadMsgCount((msgCount) => (msgCount + 1));
            setRecentMsg(newMsg);
            setRecentMsgTime(dateNow);
        }

        ChatAPI.subscribeToFriendStatus(props.friendID, handleStatusChange);
        ChatAPI.subscribeToFriendNewMsg(props.friendID, handleNewMsg);

        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friendID);
            ChatAPI.unsubscribeFromFriendNewMsg(props.friendID);
        };
    }, [props.friendID]);

    return (
        <Card elevation={props.selected ? 1:0} onClick={props.onClick} sx={{margin: 1, borderRadius: 2}}>
            <CardActionArea>
                <ListItem>
                    <ListItemIcon>
                        <Badge variant="dot" color="online" invisible={!isOnline}
                               anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                            <Badge badgeContent={unreadMsgCount} color="primary">
                                <Avatar src={props.avatar} sx={{width: 45, height: 45}}/>
                            </Badge>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary={props.name} secondary={recentMsg} primaryTypographyProps={{noWrap: true}}
                                  secondaryTypographyProps={{fontSize: 13, noWrap: true}}/>
                    <ListItemText secondary={formatTime(recentMsgTime)} align="right" primaryTypographyProps={{noWrap: true}}
                                  secondaryTypographyProps={{fontSize: 10, noWrap: true}}/>
                </ListItem>
            </CardActionArea>
        </Card>
    );
}
