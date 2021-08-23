import React, {useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import {formatTime} from "../Utilities/utilFunctions";

export default function MessageBubble(props) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseEnter = () => {
        setIsMouseOver(true);
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    }

    return (
        <Paper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} elevation={isMouseOver ? 3 : 1}
               color={props.isFriend ? "msgBubbleFriend" : "msgBubbleSelf"} sx={{p: 1, borderRadius: 2}}>
            <Typography maxWidth="500px">
                {props.text}
            </Typography>
            <Typography fontSize={8} align="right" sx={{opacity: "70%", userSelect: "none"}}>
                {formatTime(props.msgTime)}
            </Typography>
        </Paper>
    );
}