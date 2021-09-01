package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class FriendList {
    private String result;
    private FriendListData data;

    @JsonProperty("result")
    public String getResult() { return result; }
    @JsonProperty("result")
    public void setResult(String value) { this.result = value; }

    @JsonProperty("data")
    public FriendListData getData() { return data; }
    @JsonProperty("data")
    public void setData(FriendListData value) { this.data = value; }
}
