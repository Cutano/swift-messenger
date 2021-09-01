import React, {useEffect, useRef, useState} from "react";
import {Button, Card, CardActionArea, ListItemIcon, ListItemText} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import {Group, Send} from "@material-ui/icons";
import ChatAPI from "../Apis/ChatAPI";
import TextField from "@material-ui/core/TextField";
import MessageBubble from "./MessageBubble";
import ChatRoomMsg from "./ChatRoomMsg";

export default function ChatRoomFragment(props) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [disable, setDisable] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleNewMsg = (newMsg) => {
            setMessages((messages) => ([...messages, newMsg]));
            scrollToBottom();
        }

        ChatAPI.subscribeToChatRoomNewMsg(handleNewMsg);

        return function cleanup() {
            ChatAPI.unsubscribeFromChatRoomNewMsg();
        };
    }, []);

    function handleTextChange(e) {
        setText((text) => {
            text = e.target.value;
            if (text === null || text.trim() === "") setDisable(true);
            else setDisable(false)
            return text;
        });
    }

    function handleEnterPressed(e) {
        if (!disable && e.key === "Enter") handleSendBtnClicked();
    }

    function sendMessage() {
        ChatAPI.sendChatRoomMessage(text);
    }

    function handleSendBtnClicked() {
        sendMessage();
        setText("");
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            <Box sx={{zIndex: 2}}>
                <Card>
                    <CardActionArea>
                        <List>
                            <ListItem>
                                <ListItemIcon sx={{marginLeft: 1}}>
                                    <Group/>
                                </ListItemIcon>
                                <ListItemText primary="Instant Chat Room"/>
                            </ListItem>
                        </List>
                    </CardActionArea>
                </Card>
            </Box>
            <List sx={{overflow: 'auto', flexGrow: 1}}>
                {messages.map(msg => (
                    <ListItem key={msg.msgID}
                              sx={{justifyContent: msg.senderID !== props.userID ? "flex-start" : "flex-end"}}>
                        <ChatRoomMsg isFriend={msg.senderID !== props.userID} text={msg.text} name={msg.senderName}
                                     msgTime={msg.timeStamp} avatar={msg.avatar}/>
                    </ListItem>
                ))}
                <div style={{float: "left", clear: "both"}}
                     ref={messagesEndRef}>
                </div>
            </List>
            <Box>
                <Card sx={{display: "flex", flexDirection: "row"}}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Say Something"
                        fullWidth
                        onChange={handleTextChange}
                        onKeyPress={handleEnterPressed}
                        value={text}
                        sx={{flexGrow: 1, margin: 1}}
                    />
                    <Button disabled={disable} startIcon={<Send/>} variant="outlined" onClick={handleSendBtnClicked}
                            sx={{margin: 1}}>
                        SEND
                    </Button>
                </Card>
            </Box>
        </>
    );
}