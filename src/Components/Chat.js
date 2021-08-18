import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

import FriendListItem from "./FriendListItem";
import ChatAPI from "../Apis/ChatAPI";
import UserBanner from "./UserBanner";
import MessageBubble from "./MessageBubble";
import MessageFragment from "./MessageFragment";
import {Add} from "@material-ui/icons";
import AddFriendDialog from "./AddFriendDialog";

const Friend = {
    sessionID: Number,
    friendID: Number,
    friendName: String,
    friendAvatar: String,
    recentMsg: String,
    recentMsgTime: Date,
    isOnline: Boolean,
    newMsgCount: Number
}

export default function Chat(props) {
    const [selectedFriendID, setSelectedFriendID] = useState(-1);
    const [friendList, setFriendList] = useState([]);
    const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);

    function friendListHandler(response) {
        setFriendList(response.data.data.friends ?? []);
    }

    const handleClearUnread = () => {
        // May have side effect
        ChatAPI.getFriendList(friendListHandler);
    }

    const handleAddFriendDialogCancel = () => {
        setAddFriendDialogOpen(false);
    }

    const handleAddFriendDialogDone = (friendID) => {
        ChatAPI.addNewFriend(friendID);
        setAddFriendDialogOpen(false);
    }

    const handleAddNewFriend = () => {
        ChatAPI.getFriendList(friendListHandler);
    }

    const handleSelectionChange = (e, friendID) => {
        setSelectedFriendID(friendID);
        ChatAPI.clearUnreadMsg(props.friendID, handleClearUnread);
    }

    const handleFabClick = () => {
        setAddFriendDialogOpen(true);
    }

    useEffect(() => {
        ChatAPI.setUserID(props.userID);
        ChatAPI.getFriendList(friendListHandler);
        ChatAPI.subscribeToAddNewFriend(handleAddNewFriend)

        return function cleanup() {
            ChatAPI.unsubscribeToAddNewFriend();
        }
    }, [props.userID]);

    return (
        <Grid container component={Paper}
              sx={{flex: "1 1 auto", display: "flex", overflow: "hidden", width: "100%", height: "100%"}}>
            <Grid item xl={3} md={4} xs={5}
                  sx={{bottom: 0, height: "100%", display: "flex", flexDirection: "column", minHeight: "min-content"}}>
                <Paper elevation={3} sx={{overflow: 'auto', display: "flex", flexDirection: "column", flexGrow: 1, position: "relative"}}>
                    <UserBanner name="Foo Boo"/>
                    <Divider/>
                    <List sx={{overflow: 'auto', flexGrow: 1}}>
                        {friendList.map(friend => (
                            <FriendListItem avatar={friend.friendAvatar} name={friend.friendName}
                                            recentMsg={friend.recentMsg}
                                            recentMsgTime={friend.recentMsgTime} unreadMsgCount={friend.unreadMsgCount}
                                            friendID={friend.friendID} selected={selectedFriendID === friend.friendID}
                                            key={friend.friendID}
                                            onClick={(e) => {
                                                handleSelectionChange(e, friend.friendID)
                                            }}/>
                        ))}
                    </List>
                    <Fab color="primary" sx={{position: "absolute", bottom: 20, right: 30}} onClick={handleFabClick}>
                        <Add/>
                    </Fab>
                </Paper>
            </Grid>
            <Grid item xl={9} md={8} xs={7}
                  sx={{bottom: 0, height: "100%", display: "flex", flexDirection: "column", minHeight: "min-content"}}>
                <MessageFragment friendID={selectedFriendID}/>
            </Grid>
            <AddFriendDialog handleCancel={handleAddFriendDialogCancel} handleDone={handleAddFriendDialogDone} open={addFriendDialogOpen}/>
        </Grid>
    );
};

