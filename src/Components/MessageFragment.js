import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MessageBubble from "./MessageBubble";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import ChatAPI from "../Apis/ChatAPI";
import {Button, Fade, LinearProgress} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import Box from "@material-ui/core/Box";

export default function MessageFragment(props) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    function clearScreen() {
        setMessages([]);
        setLoading(true);
    }

    function handleTextChange(e) {
        setText(e.target.value);
    }

    function sendMessage() {
        ChatAPI.sendMessage(props.friendID, text);
    }

    function handleSendBtnClicked() {
        sendMessage();
        setText("");
    }

    useEffect(() => {
        function handleNewMsg(newMsg) {
            setMessages((messages) => ([...messages, newMsg]));
        }

        function historyMsgHandler(messages) {
            setLoading(false);
            setMessages(messages);
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
                              sx={{justifyContent: msg.senderID === props.friendID ? "flex-start" : "flex-end"}}>
                        <MessageBubble isFriend={msg.senderID === props.friendID} text={msg.text}
                                       msgTime={msg.timeStamp}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Say Something"
                    fullWidth
                    onChange={handleTextChange}
                    value={text}
                    sx={{flexGrow: 1, margin: 1}}
                />
                <Button startIcon={<Send/>} variant="outlined" onClick={handleSendBtnClicked} sx={{margin: 1}}>
                    SEND
                </Button>
            </Box>
        </>
    );
}