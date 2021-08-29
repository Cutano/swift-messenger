import React, {useState} from "react";
import {Paper, Stack, Typography} from "@material-ui/core";
import {formatTime} from "../Utilities/utilFunctions";
import Avatar from "@material-ui/core/Avatar";

export default function ChatRoomMsg(props) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseEnter = () => {
        setIsMouseOver(true);
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    }

     return (
         <Stack
             direction={props.isFriend ? "row" : "row-reverse"}
             justifyContent="flex-start"
             alignItems="flex-start"
             spacing={1}>
             <Avatar src={props.avatar}/>
             <Paper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} elevation={isMouseOver ? 3 : 1}
                    sx={{p: 1, borderRadius: 2, backgroundColor: props.isFriend ? "background.paper" : "msgBubble.self", color: props.isFriend? "text.primary" : "msgText.self" }}>
                 <Typography fontSize={10} fontWeight="light" sx={{userSelect: "none"}}>
                     {props.name}
                 </Typography>
                 <Typography maxWidth="500px" minWidth="70px">
                     {props.text}
                 </Typography>
                 <Typography fontSize={8} align="right" sx={{opacity: "70%", userSelect: "none"}}>
                     {formatTime(props.msgTime)}
                 </Typography>
             </Paper>
         </Stack>
     );
}