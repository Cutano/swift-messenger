import React, {useEffect, useRef, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MessageBubble from "./MessageBubble";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import ChatAPI from "../Apis/ChatAPI";
import {Avatar, Button, Card, CardActionArea, ListItemIcon, ListItemText, Paper, Skeleton} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import UserDetail from "./UserDetail";

export default function MessageFragment(props) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(true);
    const [userDetailOpen, setUserDetailOpen] = useState(false);

    const messagesEndRef = useRef(null);

    const handleDialogClose = () => {
        setUserDetailOpen(false);
    }

    function clearScreen() {
        setMessages([]);
        setLoading(true);
    }

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
        ChatAPI.sendMessage(props.friendID, text);
    }

    function handleSendBtnClicked() {
        sendMessage();
        setText("");
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        const handleNewMsg = (newMsg) => {
            setMessages((messages) => ([...messages, newMsg]));
            scrollToBottom();
        }

        const historyMsgHandler = (messages) => {
            setLoading(false);
            setMessages(messages);
            scrollToBottom();
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
            <Box sx={{zIndex: 2}}>
                <Card>
                    <CardActionArea onClick={(e) => {setUserDetailOpen(true)}}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar src={props.friendAvatar}/>
                                </ListItemIcon>
                                <ListItemText primary={props.friendName}/>
                            </ListItem>
                        </List>
                    </CardActionArea>
                </Card>
            </Box>
            <List sx={{overflow: 'auto', flexGrow: 1}}>
                {loading ? (
                    <>
                        <ListItem>
                            <Skeleton animation="wave" height={90} width={200}/>
                        </ListItem>
                        <ListItem sx={{justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" height={90} width={150}/>
                        </ListItem>
                        <ListItem>
                            <Skeleton animation="wave" height={140} width={200}/>
                        </ListItem>
                        <ListItem sx={{justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" height={90} width={100}/>
                        </ListItem>
                        <ListItem>
                            <Skeleton animation="wave" height={200} width={200}/>
                        </ListItem>
                        <ListItem sx={{justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" height={90} width={150}/>
                        </ListItem>
                        <ListItem sx={{justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" height={140} width={200}/>
                        </ListItem>
                    </>) :
                    messages.map(msg => (
                        <ListItem key={msg.msgID}
                                  sx={{justifyContent: msg.senderID === props.friendID ? "flex-start" : "flex-end"}}>
                            <MessageBubble isFriend={msg.senderID === props.friendID} text={msg.text}
                                           msgTime={msg.timeStamp}/>
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
            <UserDetail open={userDetailOpen} avatar={props.friendAvatar} userID={props.friendID} username={props.friendName} onClose={handleDialogClose}/>
        </>
    );
}