import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MessageBubble from "./MessageBubble";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import ChatAPI from "../Apis/ChatAPI";
import {Fade, LinearProgress} from "@material-ui/core";

export default function MessageFragment(props) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    function clearScreen() {
        setMessages([]);
        setLoading(true);
    }

    useEffect(() => {
        function handleNewMsg(newMsg) {
            setMessages((messages) => {
                messages.push(newMsg);
                return messages
            });
        }

        function historyMsgHandler(res) {
            setLoading(false);
            setMessages(res.data.data.messages);
        }

        clearScreen();
        ChatAPI.getHistoryMsg(props.friendID, historyMsgHandler);
        ChatAPI.subscribeToConversationNewMsg(props.friendID, handleNewMsg);

        return function cleanup() {
            ChatAPI.unsubscribeFromConversationNewMsg(props.friendID);
        };
    }, [props.friendID]);

    return (
        <>
            <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <LinearProgress sx={{height: 6}}/>
            </Fade>
            <List sx={{overflow: 'auto', flexGrow: 1}}>
                {messages.map(msg => (
                    <ListItem key={msg.msgID}
                              sx={{justifyContent: msg.userID === props.friendID ? "flex-start" : "flex-end"}}>
                        <MessageBubble isFriend={msg.userID === props.friendID} text={msg.text}
                                       msgTime={msg.timeStamp}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Grid container style={{padding: "20px", alignItems: "flex-end"}}>
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
        </>
    );
}