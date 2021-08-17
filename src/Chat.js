import React from "react";
import {makeStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
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

import ChatterListItem from "./Components/ChatterListItem";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
        height: "80vh",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
});

const Chat = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Chat
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
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
                    <Grid item xs={12} style={{padding: "10px"}}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider/>
                    <List>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/1.jpg" name="Foo Boo"
                                         recentMsg="Bsadssdfdfd" newMsgCount={11} recentMsgTime="20:00" online={true}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/2.jpg" name="Drr Tu"
                                         recentMsg="Sfgfsdfgd" newMsgCount={3} recentMsgTime="17:45" online={true}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/3.jpg" name="Ujf Tuuu"
                                         recentMsg="sdfgd" newMsgCount={0} recentMsgTime="16:03" online={false}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/4.jpg" name="Foo Boo"
                                         recentMsg="Bdsdsdsgds" newMsgCount={0} recentMsgTime="9:00" online={true}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/5.jpg" name="Foo Boo"
                                         recentMsg="Rdgssdfgd" newMsgCount={100} recentMsgTime="Wen" online={false}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/6.jpg" name="Foo Boo"
                                         recentMsg="Gdfdfbfbfbfdbffbfbb" newMsgCount={0} recentMsgTime="Mon"
                                         online={false}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/7.jpg" name="Foo Boo"
                                         recentMsg="Nsdgdge sdgdgfd" newMsgCount={0} recentMsgTime="Aug 11"
                                         online={false}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/2.jpg" name="Foo Boo"
                                         recentMsg="Tdfhf fd sdb" newMsgCount={0} recentMsgTime="Aug 2" online={false}/>
                        <ChatterListItem avatarSrc="https://material-ui.com/static/images/avatar/6.jpg" name="Foo Boo"
                                         recentMsg="Tdfgfw fe" newMsgCount={0} recentMsgTime="Jul 25" online={false}/>

                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
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
        </div>
    );
};

export default Chat;
