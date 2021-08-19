import Mock from 'mockjs';
import {clearUnread, conversationHistoryMsg, friendList} from "../Apis/Posts";

Mock.setup({
    timeout: '10-100'
})

Mock.mock(friendList, "post", {
    "data": {
        "time": "@datetime",
        "friends|5-30": [{
            "sessionID": "@integer(1,99999999)",
            "friendID": "@integer(10000000,99999999)",
            "friendName": "@cname",
            "friendAvatar": "@dataImage('250x250')",
            "recentMsg": "@csentence",
            "recentMsgTime": "@datetime",
            "unreadMsgCount": "@integer(0,2)"
        }]
    }
});

Mock.mock(conversationHistoryMsg, "post", {
    "data": {
        "time": "@datetime",
        "messages|10-30": [{
            "msgID|+1": 10000000,
            "text": "@cparagraph",
            "hasRead": "@boolean",
            "timeStamp": "@datetime",
            "userID": "@integer(10000000,99999999)",
            "sessionID": "@integer(10000000,99999999)"
        }]
    }
});

Mock.mock(clearUnread, "post", {
    "data": {
        "result": "success"
    }
});
