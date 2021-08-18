import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

export default function AddFriendDialog(props) {
    const [friendID, setFriendID] = useState("");

    function handleClose() {
        setFriendID("");
    }

    function handleIDChange(e) {
        setFriendID(e.target.value);
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the UserID of your friend in the box below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    fullWidth
                    variant="standard"
                    onChange={handleIDChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel}>Cancel</Button>
                <Button onClick={(e) => props.handleDone(friendID)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}