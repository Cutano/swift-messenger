import {wsBase} from "./UrlBase";
import axios from "axios";
import {addFriend, clearUnread, conversationHistoryMsg, friendList} from "./Posts";

const loginData = {
    userID: Number,
    time: Date
}

const msgData = {
    type: String,
    data: Object
}

export default class ChatAPI {
    static userID;
    static socket = new WebSocket(wsBase);
    static addNewFriendHandler;
    static friendStatusChangeHandlers = new Map();
    static friendNewMsgHandlers = new Map();
    static conversationNewMsgHandlers = new Map();
    static historyMsgHandler;
    static userStatusChangeHandler;

    static setUserID(id) {
        this.userID = id;
    }

    static connectToWebSocketServer() {
        // this.socket = new WebSocket(wsBase);
        // Connection opened
        this.socket.addEventListener('open', (event) => {
            this.socket.send('Hello Server!');
        });

        // Listen for messages
        this.socket.addEventListener('message', (event) => {
            const data = event.data;
            console.log(data);
            switch (data.type) {
                case "friendLogin":
                    if (this.friendStatusChangeHandlers.has(data.data.userID))
                        this.friendStatusChangeHandlers.get(data.data.userID)(true);
                    break;
                case "friendLogout":
                    if (this.friendStatusChangeHandlers.has(data.data.userID))
                        this.friendStatusChangeHandlers.get(data.data.userID)(false);
                    break;
                case "userLogin":
                    if (this.userStatusChangeHandler)
                        this.userStatusChangeHandler(true);
                    break;
                case "userLogout":
                    if (this.userStatusChangeHandler)
                        this.userStatusChangeHandler(false);
                    break;
                case "newMsg":
                    if (this.friendNewMsgHandlers.has(data.data.userID)) {
                        // Old friend
                        this.friendNewMsgHandlers.get(data.data.userID)(data.data.newMsg, data.data.date);
                    } else {
                        // New friend
                        if (this.addNewFriendHandler)
                            this.addNewFriendHandler()
                    }
                    break;
                // case  "historyMsg":
                //     if (this.historyMsgHandler)
                //         this.historyMsgHandler(data.data.msgs);
                //     break;
                default:
                    console.log("Unknown message type.");
                    break;
            }
        });

        this.socket.addEventListener('close', (event) => {
            console.log('Closed', event.data);
        });
    }

    static addNewFriend(friendID) {
        axios.post(addFriend, {userID: this.userID, friendID: friendID}).then(this.addNewFriendHandler);
    }

    static sendMessage(friendID, text) {
        const data = {
            receiverID: friendID,
            senderID: this.userID,
            timeStamp: Date.now(),
            message: text,
            hasRead: false
        };
        this.socket.send(JSON.stringify(data));
    }

    static getHistoryMsg(friendID, conversationHistoryMsgHandler) {
        axios.post(conversationHistoryMsg, {
            friendID: friendID,
            userID: this.userID
        }).then((res) => {
            conversationHistoryMsgHandler(res.data.data.messages)
        });
    }

    static clearUnreadMsg(friendID, handleClearUnread) {
        axios.post(clearUnread, {userID: this.userID, friendID}).then((res) => {
            handleClearUnread(res.data.result);
        });
    }

    static getFriendList(friendListHandler) {
        axios.post(friendList, {userID: this.userID}).then((res) => {
            res.data.data.friends.sort((fri1, fri2) => {
                if (parseInt(fri1.recentMsgTime) < parseInt(fri2.recentMsgTime)) return 1;
                else if(parseInt(fri1.recentMsgTime) > parseInt(fri2.recentMsgTime)) return -1;
                return 0;
            });
            friendListHandler(res.data.data.friends);
        });
    }

    static subscribeToAddNewFriend(handleAddNewFriend) {
        this.addNewFriendHandler = handleAddNewFriend;
    }

    static subscribeToUserStatus(handleStatusChange) {
        this.userStatusChangeHandler = handleStatusChange;
    }

    static subscribeToFriendStatus(friendID, handleStatusChange) {
        this.friendStatusChangeHandlers.set(friendID, handleStatusChange);
    }

    static subscribeToFriendNewMsg(friendID, handleNewMsg) {
        this.friendNewMsgHandlers.set(friendID, handleNewMsg);
    }

    static subscribeToFriendHistoryMsg(handleHistoryMsg) {
        this.historyMsgHandler = handleHistoryMsg;
    }

    static subscribeToConversationNewMsg(friendID, handleNewMsg) {
        this.conversationNewMsgHandlers.set(friendID, handleNewMsg);
    }

    static unsubscribeToAddNewFriend() {
        this.addNewFriendHandler = null;
    }

    static unsubscribeFromUserStatus() {
        this.userStatusChangeHandler = null;
    }

    static unsubscribeFromFriendStatus(friendID) {
        this.friendStatusChangeHandlers.delete(friendID);
    }

    static unsubscribeFromFriendNewMsg(friendID) {
        this.friendNewMsgHandlers.delete(friendID);
    }

    static unsubscribeToFriendHistoryMsg() {
        this.historyMsgHandler = null;
    }

    static unsubscribeFromConversationNewMsg(friendID) {
        this.conversationNewMsgHandlers.delete(friendID);
    }
}