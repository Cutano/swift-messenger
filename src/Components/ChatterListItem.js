import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {Badge} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function ChatterListItem(props) {

    return (
        <ListItemButton selected={props.selected} onClick={props.onClick} key={props.key}>
            <ListItemIcon>
                <Badge variant="dot" color="online" invisible={!props.online}
                       anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                    <Badge badgeContent={props.newMsgCount} color="primary">
                        <Avatar src={props.avatarSrc} sx={{width: 45, height: 45}}/>
                    </Badge>
                </Badge>
            </ListItemIcon>
            <ListItemText primary={props.name} secondary={props.recentMsg}/>
            <ListItemText secondary={props.recentMsgTime} align="right" secondaryTypographyProps={{fontSize: 10}}/>
        </ListItemButton>
    );
}
