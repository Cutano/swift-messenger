import Mock from 'mockjs';
import {addFriend, clearUnread, conversationHistoryMsg, friendList} from "../Apis/Posts";

Mock.setup({
    timeout: '10-100'
})

Mock.mock(friendList, "post", {
    "data": {
        "time": "@date('T')",
        "friends|5-30": [{
            "sessionID": "@integer(1,99999999)",
            "friendID": "@integer(10000000,99999999)",
            "friendName": "@cname",
            "friendAvatar": "@dataImage('250x250')",
            "recentMsg": "@csentence",
            "recentMsgTime": "@date('T')",
            "unreadMsgCount": "@integer(0,2)"
        }]
    }
});

Mock.mock(conversationHistoryMsg, "post", {
    "data": {
        "time": "@date('T')",
        "messages|10-30": [{
            "msgID|+1": 10000000,
            "text": "@cparagraph",
            "hasRead": "@boolean",
            "timeStamp": "@date('T')",
            "userID": "@integer(10000000,99999999)",
            "sessionID": "@integer(10000000,99999999)"
        }]
    }
});

Mock.mock(clearUnread, "post", {
    "result": "success"
});

Mock.mock(addFriend, "post", {
    "data": {
        "result": "success"
    }
});
