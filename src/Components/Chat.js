import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";

import FriendListItem from "./FriendListItem";
import ChatAPI from "../Apis/ChatAPI";
import UserBanner from "./UserBanner";
import MessageFragment from "./MessageFragment";
import {Add} from "@material-ui/icons";
import AddFriendDialog from "./AddFriendDialog";
import {Fade, ListItem, Skeleton} from "@material-ui/core";

export default function Chat(props) {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    function friendListHandler(friends) {
        setFriendList(friends ?? []);
        setLoading(false);
    }

    const handleClearUnread = (result) => {
        // May have side effect
        // if (result === "success") {
        //     ChatAPI.getFriendList(friendListHandler);
        // }
    }

    const handleAddFriendDialogCancel = () => {
        setAddFriendDialogOpen(false);
    }

    const handleAddFriendDialogDone = (friendID) => {
        ChatAPI.addNewFriend(parseInt(friendID));
        setAddFriendDialogOpen(false);
    }

    const handleSelectionChange = (e, friend) => {
        setSelectedFriend(friend);
        ChatAPI.clearUnreadMsg(friend.friendID, handleClearUnread);
    }

    const handleFabClick = () => {
        setAddFriendDialogOpen(true);
    }

    const handleUserInfo = (data) => {
        setAvatar(data.userAvatar);
        setUserName(data.username);
    }

    useEffect(() => {
        const handleAddNewFriend = (friendID) => {
            ChatAPI.getFriendList(friendListHandler);
        }

        ChatAPI.setUserID(props.userID);
        ChatAPI.getUserInfo(handleUserInfo);
        ChatAPI.connectToWebSocketServer();
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
                <Paper elevation={3} sx={{
                    overflow: 'auto',
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    position: "relative",
                    zIndex: 3
                }}>
                    <UserBanner username={userName} avatar={avatar}/>
                    <Divider/>
                    <Fade in={true}>
                        <List sx={{overflow: 'auto', flexGrow: 1}}>
                            {loading ? (
                                <>
                                    {[1, 2, 3, 4, 5, 6, 7].map(item => (
                                        <ListItem key={item}>
                                            <Skeleton variant="rectangular" height={71} width={600}
                                                      sx={{borderRadius: 2}}/>
                                        </ListItem>
                                    ))}
                                </>
                            ) : (friendList.map(friend => (
                                <FriendListItem avatar={friend.friendAvatar} name={friend.friendName}
                                                recentMsg={friend.recentMsg}
                                                recentMsgTime={friend.recentMsgTime}
                                                unreadMsgCount={friend.unreadMsgCount}
                                                friendID={friend.friendID}
                                                selected={selectedFriend === null ? -1 : selectedFriend.friendID}
                                                key={friend.friendID}
                                                onClick={(e) => {
                                                    if (selectedFriend === null || friend.friendID !== selectedFriend.friendID) handleSelectionChange(e, friend);
                                                }}/>
                            )))}
                        </List>
                    </Fade>
                    <Fab color="primary" sx={{position: "absolute", bottom: 20, right: 30}} onClick={handleFabClick}>
                        <Add/>
                    </Fab>
                </Paper>
            </Grid>
            <Grid item xl={9} md={8} xs={7}
                  sx={{bottom: 0, height: "100%", display: "flex", flexDirection: "column", minHeight: "min-content"}}>
                {selectedFriend !== null &&
                <MessageFragment friendID={selectedFriend.friendID} friendName={selectedFriend.friendName}
                                 friendAvatar={selectedFriend.friendAvatar}/>}
            </Grid>
            <AddFriendDialog handleCancel={handleAddFriendDialogCancel} handleDone={handleAddFriendDialogDone}
                             open={addFriendDialogOpen}/>
        </Grid>
    );
};

