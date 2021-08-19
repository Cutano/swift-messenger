import React, {useEffect} from "react";
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

export default function MessageFragment(props) {

    useEffect(() => {

        function handleNewMsg(newMsg, dateNow) {

        }

        ChatAPI.subscribeToConversationNewMsg(props.friendID, handleNewMsg);

        return function cleanup() {
            ChatAPI.unsubscribeFromConversationNewMsg(props.friendID);
        };
    }, [props.friendID]);

    return (
        <>
            <List sx={{overflow: 'auto', flexGrow: 1}}>
                <ListItem key="1" sx={{justifyContent: "flex-end"}}>
                    <MessageBubble isFriend={false} text="How do you do?" msgTime={1629266406186}/>
                </ListItem>
                <ListItem key="2">
                    <MessageBubble isFriend={true} text="Hey, I am Good! What about you ?" msgTime={1629267516286}/>
                </ListItem>
                <ListItem key="3" sx={{justifyContent: "flex-end"}}>
                    <MessageBubble isFriend={false} text="Cool. Let's catch up!" msgTime={1629267516386}/>
                </ListItem>
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