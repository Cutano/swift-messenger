import {wsBase} from "./UrlBase";
import axios from "axios";
import {friendList} from "./Posts";

const loginData = {
    userID: Number,
    time: Date
}

const msgData = {
    type: String,
    data: Object
}

export default class ChatAPI {
    static socket = new WebSocket(wsBase);
    static friendStatusChangeHandlers = new Map();
    static friendNewMsgHandlers = new Map();
    static conversationNewMsgHandlers = new Map();
    static historyMsgHandler;
    static userStatusChangeHandler;

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
                    if (this.friendNewMsgHandlers.has(data.data.userID))
                        this.friendNewMsgHandlers.get(data.data.userID)(data.data.newMsg, data.data.date);
                    break;
                case  "historyMsg":
                    if (this.historyMsgHandler)
                        this.historyMsgHandler(data.data.msgs);
                    break;
                default:
                    console.log("Unknown message type.");
                    break;
            }
        });

        this.socket.addEventListener('close', (event) => {
            console.log('Closed', event.data);
        });
    }

    static getFriendList(userID, friendListHandler) {
        axios.post(friendList, {userID: userID}).then(friendListHandler);
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