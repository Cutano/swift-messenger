import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {Badge, Card, CardActionArea, ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatAPI from "../Apis/ChatAPI";
import {formatTime} from "../Utilities/utilFunctions";

export default function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(false);
    const [unreadMsgCount, setUnreadMsgCount] = useState(props.unreadMsgCount);
    const [recentMsg, setRecentMsg] = useState(props.recentMsg ?? "");
    const [recentMsgTime, setRecentMsgTime] = useState(props.recentMsgTime ?? 1629266506186);

    const handleOnClick = (e) => {
        setUnreadMsgCount(0);
        props.onClick(e);
    }

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status);
        }

        const handleNewMsg = data => {
            if (props.selected !== props.friendID)
                setUnreadMsgCount((msgCount) => (msgCount + 1));
            setRecentMsg(data.text);
            setRecentMsgTime(data.timeStamp);
        };

        ChatAPI.subscribeToFriendStatus(props.friendID, handleStatusChange);
        ChatAPI.subscribeToFriendNewMsg(props.friendID, handleNewMsg);

        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friendID);
            ChatAPI.unsubscribeFromFriendNewMsg(props.friendID);
        };
    }, [props.friendID, props.selected]);

    return (
        <Card elevation={props.selected === props.friendID ? 1:0} onClick={handleOnClick} sx={{margin: 1, borderRadius: 2, backgroundColor: props.selected === props.friendID ? "friendItem.bg" : "",
            color: props.selected === props.friendID ? "#ffffff" : "text.primary"}}>
            <CardActionArea>
                <ListItem sx={{minHeight: 71}}>
                    <ListItemIcon>
                        <Badge variant="dot" color="online" invisible={!isOnline}
                               anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                            <Badge badgeContent={unreadMsgCount} color="primary">
                                <Avatar src={props.avatar} sx={{width: 45, height: 45}}/>
                            </Badge>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary={props.name} secondary={recentMsg} primaryTypographyProps={{noWrap: true}}
                                  secondaryTypographyProps={{fontSize: 13, noWrap: true, sx: { color: props.selected === props.friendID ? "#eeeeee" : "text.secondary", maxWidth: 240}}}/>
                    <ListItemText secondary={formatTime(recentMsgTime)} align="right" primaryTypographyProps={{noWrap: true}}
                                  secondaryTypographyProps={{fontSize: 10, noWrap: true, sx: { color: props.selected === props.friendID ? "#eeeeee" : "text.secondary"}}}/>
                </ListItem>
            </CardActionArea>
        </Card>
    );
}
