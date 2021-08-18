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

    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        function friendListHandler(response) {
            setFriendList(response.data.data.friends ?? []);
        }
        ChatAPI.getFriendList(props.userID, friendListHandler);
    }, [props.userID]);

    const FriendListItems = () => (
        friendList.map(friend => (
            <FriendListItem avatarSrc={friend.friendAvatar} name={friend.friendName} friendID={friend.friendID} key={friendList.indexOf(friend)}/>
    )));

    return (
        <Box position="fixed" sx={{top: 64, width: "100%"}}>
            <Grid container component={Paper}>
                <Grid item xl={3} md={4} xs={5} sx={{bottom: 0}}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List sx={{overflow: 'scroll'}}>
                        <FriendListItems/>
                    </List>
                </Grid>
                <Grid item xl={9} md={8} xs={7} sx={{bottom: 0}}>
                    <List>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Hey man, What's up ?"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"/>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        primary="Hey, Iam Good! What about you ?"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"/>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Cool. i am good, let's catch up!"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="10:30"/>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Grid container style={{padding: "20px"}}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Type Something"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add">
                                <SendIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

