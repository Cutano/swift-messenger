import Mock from 'mockjs';
import {friendList} from "../Apis/Posts";

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
        }]
    }
});