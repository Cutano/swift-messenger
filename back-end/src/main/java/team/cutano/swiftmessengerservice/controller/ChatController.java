package team.cutano.swiftmessengerservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;
import team.cutano.swiftmessengerservice.json.*;
import team.cutano.swiftmessengerservice.mapper.ChatMapper;
import team.cutano.swiftmessengerservice.pojo.Message;

import javax.annotation.Resource;
import java.util.*;

@RestController
@RequestMapping("/v1.0/chat")
public class ChatController {
    @Resource
    private ChatMapper chatMapper;

    @PostMapping("/user-info")
    public String userInfo(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        HashMap<String, Object> map = chatMapper.userInfo(userID);

        UserInfo userInfo = new UserInfo();
        UserInfoData userInfoData = new UserInfoData();
        userInfoData.setUserID(((Integer) map.get("userID")).longValue());
        userInfoData.setUserAvatar((String) map.get("userAvatar"));
        userInfoData.setUsername((String) map.get("username"));
        userInfo.setResult("success");
        userInfo.setData(userInfoData);
        try {
            return Converter.UserInfoToJsonString(userInfo);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"result\": \"error\"}";
        }
    }

    @PostMapping("/friend-list")
    public String friendList(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        List<HashMap<String, Object>> maps = chatMapper.friendList(userID);
        List<Friend> friends = new ArrayList<>();

        for (HashMap<String, Object> map : maps) {
            Friend friend = new Friend();
            friend.setFriendID(((Integer) map.get("friendID")).longValue());
            friend.setFriendName((String) map.get("friendName"));
            friend.setFriendAvatar((String) map.get("friendAvatar"));
            friend.setRecentMsg((String) map.get("recentMsg"));
            friend.setUnreadMsgCount((Long) map.get("unreadMsgCount"));
            if (map.get("recentMsgTimeStamp") == null) {
                friend.setRecentMsgTime(null);
            } else {
                friend.setRecentMsgTime(Long.valueOf((String) map.get("recentMsgTimeStamp")));
            }

            friends.add(friend);
        }

        FriendList friendList = new FriendList();
        FriendListData friendListData = new FriendListData();
        friendListData.setFriends(friends);
        friendListData.setTime(System.currentTimeMillis());
        friendList.setResult("success");
        friendList.setData(friendListData);
        try {
            return Converter.FriendListToJsonString(friendList);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"result\": \"error\"}";
        }
    }

    @PostMapping("/add-friend")
    public String addFriend(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        Integer friendID = (Integer) body.get("friendID");
        if (userID.equals(friendID)) return "{\"result\": \"error\"}";

        List<HashMap<String, Object>> maps = chatMapper.friendList(userID);
        for (HashMap<String, Object> map : maps) {
            if (friendID.equals((Integer) map.get("friendID"))) {
                return "{\"result\": \"error\"}";
            }
        }

        HashMap<String, Object> map = chatMapper.userInfo(friendID);
        if (map == null || map.get("username") == null) return "{\"result\": \"error\"}";

        Integer res = chatMapper.addFriend(userID, friendID);
        if (res == null || res == 0) return "{\"result\": \"error\"}";
        else {
            return "{\"result\": \"success\"}";
        }
    }

    @PostMapping("/conv-his-msg")
    public String conversationHistoryMsg(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        Integer friendID = (Integer) body.get("friendID");
        List<Message> msgDataList = chatMapper.conversationHistoryMsg(userID, friendID);
        List<team.cutano.swiftmessengerservice.json.Message> msgs = new ArrayList<>();

        for (Message msgData : msgDataList) {
            team.cutano.swiftmessengerservice.json.Message msg = new team.cutano.swiftmessengerservice.json.Message();
            msg.setMsgID(msgData.getMsgID().longValue());
            msg.setSenderID(msgData.getSenderID().longValue());
            msg.setReceiverID(msgData.getReceiverID().longValue());
            msg.setTimeStamp(Long.valueOf(msgData.getTimeStamp()));
            msg.setHasRead(msgData.getHasRead());
            msg.setText(msgData.getText());
            msgs.add(msg);
        }

        ConversationHistoryMsg conversationHistoryMsg = new ConversationHistoryMsg();
        ConversationHistoryMsgData conversationHistoryMsgData = new ConversationHistoryMsgData();
        conversationHistoryMsgData.setTime(System.currentTimeMillis());
        conversationHistoryMsgData.setMessages(msgs);
        conversationHistoryMsg.setResult("success");
        conversationHistoryMsg.setData(conversationHistoryMsgData);
        try {
            return Converter.ConversationHistoryMsgToJsonString(conversationHistoryMsg);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"result\": \"error\"}";
        }
    }

    @PostMapping("/cls-unread")
    public String clearUnread(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        Integer friendID = (Integer) body.get("friendID");
        Integer res = chatMapper.clearUnread(userID, friendID);
        if (res == null || res == 0) return "{\"result\": \"error\"}";
        else return "{\"result\": \"success\"}";
    }
}
