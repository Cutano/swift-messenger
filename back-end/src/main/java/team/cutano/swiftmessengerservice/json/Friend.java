package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class Friend {
    private Long friendID;
    private String friendName;
    private String friendAvatar;
    private String recentMsg;
    private Long recentMsgTime;
    private Long unreadMsgCount;

    @JsonProperty("friendID")
    public Long getFriendID() { return friendID; }
    @JsonProperty("friendID")
    public void setFriendID(Long value) { this.friendID = value; }

    @JsonProperty("friendName")
    public String getFriendName() { return friendName; }
    @JsonProperty("friendName")
    public void setFriendName(String value) { this.friendName = value; }

    @JsonProperty("friendAvatar")
    public String getFriendAvatar() { return friendAvatar; }
    @JsonProperty("friendAvatar")
    public void setFriendAvatar(String value) { this.friendAvatar = value; }

    @JsonProperty("recentMsg")
    public String getRecentMsg() { return recentMsg; }
    @JsonProperty("recentMsg")
    public void setRecentMsg(String value) { this.recentMsg = value; }

    @JsonProperty("recentMsgTime")
    public Long getRecentMsgTime() { return recentMsgTime; }
    @JsonProperty("recentMsgTime")
    public void setRecentMsgTime(Long value) { this.recentMsgTime = value; }

    @JsonProperty("unreadMsgCount")
    public Long getUnreadMsgCount() { return unreadMsgCount; }
    @JsonProperty("unreadMsgCount")
    public void setUnreadMsgCount(Long value) { this.unreadMsgCount = value; }
}
