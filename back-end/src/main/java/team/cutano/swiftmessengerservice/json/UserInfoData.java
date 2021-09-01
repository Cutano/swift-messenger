package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class UserInfoData {
    private Long userID;
    private String username;
    private String userAvatar;

    @JsonProperty("userID")
    public Long getUserID() { return userID; }
    @JsonProperty("userID")
    public void setUserID(Long value) { this.userID = value; }

    @JsonProperty("username")
    public String getUsername() { return username; }
    @JsonProperty("username")
    public void setUsername(String value) { this.username = value; }

    @JsonProperty("userAvatar")
    public String getUserAvatar() { return userAvatar; }
    @JsonProperty("userAvatar")
    public void setUserAvatar(String value) { this.userAvatar = value; }
}
