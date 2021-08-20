import Mock from 'mockjs';
import {addFriend, clearUnread, conversationHistoryMsg, friendList} from "../Apis/Posts";

Mock.setup({
    timeout: '10-100'
})

Mock.mock(friendList, "post", {
    "result": "success",
    "data": {
        "time": "@date('T')",
        "friends|5-30": [{
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
    "result": "success",
    "data": {
        "time": "@date('T')",
        "messages|10-30": [{
            "msgID|+1": 10000000,
            "text": "@cparagraph",
            "hasRead": "@boolean",
            "timeStamp": "@date('T')",
            "senderID": "@integer(10000000,99999999)",
            "receiverID": "@integer(10000000,99999999)"
        }]
    }
});

Mock.mock(clearUnread, "post", {
    "result": "success"
});

Mock.mock(addFriend, "post", {
    "result": "success"
});
