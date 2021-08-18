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
    static statusChangeHandlers = new Map();
    static newMsgHandlers = new Map();
    static historyMsgHandler;

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
                    if (this.statusChangeHandlers.has(data.data.userID))
                        this.statusChangeHandlers.get(data.data.userID)(true);
                    break;
                case "friendLogout":
                    if (this.statusChangeHandlers.has(data.data.userID))
                        this.statusChangeHandlers.get(data.data.userID)(false);
                    break;
                case "newMsg":
                    if (this.newMsgHandlers.has(data.data.userID))
                        this.newMsgHandlers.get(data.data.userID)(data.data.newMsg, data.data.date);
                    break;
                case  "historyMsg":
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

    static subscribeToFriendStatus(friendID, handleStatusChange) {
        this.statusChangeHandlers.set(friendID, handleStatusChange);
    }

    static subscribeToFriendNewMsg(friendID, handleNewMsg) {
        this.newMsgHandlers.set(friendID, handleNewMsg);
    }

    static subscribeToFriendHistoryMsg(handleHistoryMsg) {
        this.historyMsgHandler = handleHistoryMsg;
    }

    static unsubscribeFromFriendStatus(friendID) {
        this.statusChangeHandlers.delete(friendID);
    }

    static unsubscribeFromFriendNewMsg(friendID) {
        this.newMsgHandlers.delete(friendID);
    }

    static unsubscribeToFriendHistoryMsg() {
        this.historyMsgHandler = null;
    }
}