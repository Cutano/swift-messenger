import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {Badge} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatAPI from "../Apis/ChatAPI";

export default function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(false);
    const [newMsgCount, setNewMsgCount] = useState(0);
    const [recentMsg, setRecentMsg] = useState(props.recentMsg ?? "");
    const [recentMsgTime, setRecentMsgTime] = useState(props.recentMsgTime ?? 1629266506186);

    const formatTime = () => {
        const ref = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        const msgDate = new Date(recentMsgTime);
        const now = new Date(Date.now());

        if (now.getFullYear() === msgDate.getFullYear() && now.getMonth() === msgDate.getMonth() && now.getDate() === msgDate.getDate()) {
            return `${msgDate.getHours()}:${msgDate.getMinutes() < 10 ? '0' + msgDate.getMinutes() : msgDate.getMinutes()}`;
        } else return `${ref[msgDate.getMonth()]} ${msgDate.getDate()}`
    }

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status);
        }

        function handleNewMsg(newMsg, dateNow) {
            setNewMsgCount((msgCount) => (msgCount + 1));
            setRecentMsg(newMsg);
            setRecentMsgTime(dateNow);
        }

        ChatAPI.subscribeToFriendStatus(props.friendID, handleStatusChange);
        ChatAPI.subscribeToFriendNewMsg(props.friendID, handleNewMsg);
        // Specify how to clean up after this effect:
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friendID);
            ChatAPI.unsubscribeFromFriendNewMsg(props.friendID);
        };
    }, [props.friendID]);

    return (
        <ListItemButton selected={props.selected} onClick={props.onClick}>
            <ListItemIcon>
                <Badge variant="dot" color="online" invisible={!isOnline}
                       anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                    <Badge badgeContent={newMsgCount} color="primary">
                        <Avatar src={props.avatarSrc} sx={{width: 45, height: 45}}/>
                    </Badge>
                </Badge>
            </ListItemIcon>
            <ListItemText primary={props.name} secondary={recentMsg}/>
            <ListItemText secondary={formatTime()} align="right" secondaryTypographyProps={{fontSize: 10}}/>
        </ListItemButton>
    );
}
