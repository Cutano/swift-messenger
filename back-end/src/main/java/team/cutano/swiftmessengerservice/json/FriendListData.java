package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;
import java.util.List;

public class FriendListData {
    private Long time;
    private List<Friend> friends;

    @JsonProperty("time")
    public Long getTime() { return time; }
    @JsonProperty("time")
    public void setTime(Long value) { this.time = value; }

    @JsonProperty("friends")
    public List<Friend> getFriends() { return friends; }
    @JsonProperty("friends")
    public void setFriends(List<Friend> value) { this.friends = value; }
}
